import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/Logo.png'
import { InputWithRef } from '../../components/InputWithRef'
import { FormContainer, FormGrid, PageContainer } from './styles'

import { EnvelopeSimple, Eye, EyeClosed, User } from 'phosphor-react'

import { toast } from 'react-toastify'

import { routes } from '../../common/routes'
import { useAuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { axiosErrorHandler } from '../../utils/axiosErrorHandler'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const passwordConfirmInputRef = useRef()

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()

    const name = nameInputRef.current.value
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    const passwordConfirm = passwordConfirmInputRef.current.value

    if (password !== passwordConfirm) {
      toast.error('Password and confirm password does not matches.')
      return
    }

    if (!name || !email || !password || !passwordConfirm) {
      toast.error('Please fill all form inputs.')
      return
    }

    api
      .post(routes.users, {
        username: name,
        email,
        password,
      })
      .then(() => {
        login({ email, password })
        navigate('/')
      })
      .catch(axiosErrorHandler)
      .finally(() => {
        nameInputRef.current.value = ''
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        passwordConfirmInputRef.current.value = ''
      })
  }

  const PasswordIcon = (showPasswordState, setShowPasswordState) => {
    return (
      <div
        onClick={() => setShowPasswordState(!showPasswordState)}
        style={{ cursor: 'pointer' }}
      >
        {showPasswordState ? <Eye size={20} /> : <EyeClosed size={20} />}
      </div>
    )
  }

  return (
    <PageContainer>
      <FormContainer>
        <h1>Register</h1>
        <img src={Logo} alt="Chat App" />

        <FormGrid onSubmit={handleRegister}>
          <InputWithRef
            ref={nameInputRef}
            type="text"
            placeholder="name"
            icon={User}
          />
          <InputWithRef
            ref={emailInputRef}
            type="email"
            placeholder="email"
            icon={EnvelopeSimple}
          />
          <InputWithRef
            ref={passwordInputRef}
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            icon={() => PasswordIcon(showPassword, setShowPassword)}
          />

          <InputWithRef
            ref={passwordConfirmInputRef}
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="confirm password"
            icon={() =>
              PasswordIcon(showPasswordConfirm, setShowPasswordConfirm)
            }
          />

          <button type="submit">Register</button>
        </FormGrid>
        <span>
          <p>
            Already have an account ? <Link to="/">Log in</Link>
          </p>
        </span>
      </FormContainer>
    </PageContainer>
  )
}
