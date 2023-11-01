import styled from 'styled-components'

const MessageContainer = styled.div`
  padding: 0.6rem 0.4rem;

  padding-left: ${(props) => (props.$fromSelf ? '1.6rem' : '0.4rem')};
  padding-right: ${(props) => (!props.$fromSelf ? '1.6rem' : '0.4rem')};

  border: 1px solid
    ${(props) =>
      props.$fromSelf
        ? props.theme.COLORS.FUCHSIA_400
        : props.theme.COLORS.ZINC_400};
  border-radius: 8px;

  background: ${(props) =>
    props.$fromSelf
      ? props.theme.COLORS.FUCHSIA_100
      : props.theme.COLORS.ZINC_100};

  display: inline-flex;

  flex-direction: column;
  gap: 0.4rem;
  align-self: ${(props) => (props.$fromSelf ? 'end' : 'start')};
  align-items: ${(props) => (props.$fromSelf ? 'end' : 'start')};

  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  > p {
    color: ${(props) => props.theme.COLORS.ZINC_700};
  }

  > span {
    font-size: 0.6rem;
    color: ${(props) => props.theme.COLORS.ZINC_600};
  }
`

export const MessageWrapper = ({
  messageText,
  messageTime,
  fromSelf,
  ...props
}) => {
  return (
    <MessageContainer $fromSelf={fromSelf} {...props}>
      <p>{messageText}</p>
      <span>{messageTime}</span>
    </MessageContainer>
  )
}
