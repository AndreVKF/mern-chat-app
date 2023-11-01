import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/Logo.png'
import { InputWithRef } from '../../components/InputWithRef'
import { FormContainer, FormGrid, PageContainer } from './styles'

import { EnvelopeSimple, Eye, EyeClosed } from 'phosphor-react'
import { useAuthContext } from '../../contexts/AuthContext'

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value

    try {
      login({ email, password })
      navigate('/')
    } catch {}
  }

  const PasswordIcon = () => {
    return (
      <div
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
      </div>
    )
  }

  return (
    <PageContainer>
      <FormContainer>
        <h1>Welcome</h1>
        <img src={Logo} alt="Chat App" />

        <FormGrid onSubmit={handleLoginSubmit}>
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
            icon={PasswordIcon}
          />

          <button type="submit">Welcome</button>
        </FormGrid>
        <span>
          <p>
            Don&apos;t have an account ? <Link to="/register">Register</Link>
          </p>
        </span>
      </FormContainer>
    </PageContainer>
  )
}
