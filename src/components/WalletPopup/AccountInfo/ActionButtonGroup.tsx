import { Trans } from "@lingui/macro"
import { Flex, Text } from "rebass"
import styled from "styled-components"
import { ReactComponent as DollarIcon } from "assets/svg/dollar.svg"
import { ReactComponent as Send } from "assets/svg/send.svg"
// import { ButtonLight } from "components/Button"
import SendIcon from "components/Icons/SendIcon"
import { ClickHandlerProps } from "components/WalletPopup/AccountInfo"
import useTheme from "hooks/useTheme"

const ActionButton = styled.button`
  flex: 0 1 115px;
  width: 115px;
  height: 55px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary};
  }
`

type Props = {
  className?: string
} & ClickHandlerProps
const ActionButtonGroup: React.FC<Props> = ({ onClickBuy, onClickReceive, onClickSend, className }) => {
  const theme = useTheme()
  return (
    <Flex
      className={className}
      sx={{
        justifyContent: "space-between",
        gap: "4px"
      }}
    >
      <ActionButton onClick={onClickBuy}>
        <DollarIcon color={theme.text} />
        <Text as="span" marginLeft="7px">
          <Trans>Buy</Trans>
        </Text>
      </ActionButton>
      <ActionButton onClick={onClickReceive}>
        <SendIcon style={{}} />
        <Text as="span" marginLeft="7px">
          <Trans>Receive</Trans>
        </Text>
      </ActionButton>
      <ActionButton onClick={onClickSend}>
        <Send />
        <Text as="span" marginLeft="7px">
          <Trans>Send</Trans>
        </Text>
      </ActionButton>
    </Flex>
  )
}

export default styled(ActionButtonGroup)``
