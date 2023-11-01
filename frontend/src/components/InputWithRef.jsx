import { forwardRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${(props) => props.theme.COLORS.ZINC_500};
  padding-bottom: 0.2rem;
  background: transparent;

  padding: 0.4rem 0;
  padding-right: 0.4rem;

  > svg {
    color: ${(props) => props.theme.COLORS.ZINC_500};
  }

  &:focus-within {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.FUCHSIA_700};
  }
`

const InputContainer = styled.input`
  flex: 1;

  border: 0;
  background: transparent;
  outline: none;
`

const BaseInput = ({ icon: Icon, ...props }, ref) => {
  return (
    <Container>
      <InputContainer ref={ref} {...props} />
      {Icon && <Icon size={20} />}
    </Container>
  )
}

export const InputWithRef = forwardRef(BaseInput)
