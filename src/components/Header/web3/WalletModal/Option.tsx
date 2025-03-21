import { ActivationStatus, useActivationState } from "connection/activate"
import { Connection } from "connection/types"
import { darken } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { useActiveWeb3React } from "hooks"
import { useCloseModal } from "state/application/hooks"
import { ApplicationModal } from "state/application/types"
import { useIsAcceptedTerm } from "state/user/hooks"

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bt1};
  padding: 10px;
  border-radius: 40px;
  & > img,
  span {
    height: 2rem;
    width: 2rem;
    border-radius: 40px;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${({ theme }) => theme.text};
  font-weight: 400;
  line-height: 1rem;
  font-size: 0.9rem;
`

const OptionCardClickable = styled.div<{
  connected: boolean
  installLink?: string
  isDisabled?: boolean
  overridden?: boolean
}>`
  height: 7rem;
  width: 10rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.buttonBlack};
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;

  cursor: ${({ isDisabled, installLink, overridden }) =>
    !isDisabled && !installLink && !overridden ? "pointer" : "not-allowed"};

  ${({ isDisabled, connected, theme }) =>
    !isDisabled && connected
      ? `
      background-color: ${theme.primary};
      & ${HeaderText} {
        color: ${theme.darkText} !important;
      }
    `
      : ""}

  &:hover {
    text-decoration: none;
    ${({ installLink, isDisabled, overridden }) =>
      installLink || isDisabled || overridden
        ? ""
        : css`
            background-color: ${({ theme }) => darken(0.1, theme.tableHeader)};
            color: ${({ theme }) => theme.text} !important;
          `}
  }

  ${({ isDisabled, installLink, overridden, theme }) =>
    isDisabled || installLink || overridden
      ? `
      filter: grayscale(100%);
      & ${HeaderText} {
        color: ${theme.border};
      }
    `
      : ""}
`

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  align-items: center;
  height: 100%;
`

// const StyledLink = styled(ExternalLink)`
//   width: 100%;
//   &:hover {
//     text-decoration: none;
//   }
// `

const Option = ({ connection }: { connection: Connection }) => {
  const { activationState, tryActivation } = useActivationState()
  const [isAcceptedTerm] = useIsAcceptedTerm()

  const { chainId } = useActiveWeb3React()

  const { name, icon } = connection.getProviderInfo()

  const isSomeOptionPending = activationState.status === ActivationStatus.PENDING
  const isCurrentOptionPending = isSomeOptionPending && activationState.connection === connection

  const closeWalletModal = useCloseModal(ApplicationModal.WALLET)

  const content = (
    <OptionCardClickable
      role="button"
      id={`connect-${connection.getProviderInfo().name}`}
      onClick={() =>
        isAcceptedTerm &&
        tryActivation(
          connection,
          () => {
            closeWalletModal()
          },
          chainId
        )
      }
      connected={isCurrentOptionPending}
      isDisabled={!isAcceptedTerm}
    >
      <IconWrapper>
        <img src={icon} alt={"Icon"} />
      </IconWrapper>
      <OptionCardLeft>
        <HeaderText>{name}</HeaderText>
      </OptionCardLeft>
    </OptionCardClickable>
  )

  if (!isAcceptedTerm) return content

  // if (readyState === WalletReadyState.NotDetected) {
  //   return (
  //     <MouseoverTooltip
  //       placement="bottom"
  //       text={
  //         <Trans>
  //           You will need to install {wallet.name} extension/dapp before you can connect with it on KyberSwap. Get it{' '}
  //           <ExternalLink href={wallet.installLink || ''}>here↗</ExternalLink>
  //         </Trans>
  //       }
  //     >
  //       {content}
  //     </MouseoverTooltip>
  //   )
  // }
  //
  // if (isOverridden) {
  //   return (
  //     <MouseoverTooltip
  //       width="fit-content"
  //       maxWidth="500px"
  //       text={
  //         walletKey === 'COIN98' ? (
  //           <Trans>
  //             You need to enable <b>&quot;Override Wallet&quot;</b> in Coin98 settings.
  //           </Trans>
  //         ) : (
  //           <C98OverrideGuide walletKey={walletKey} isOpened={false} />
  //         )
  //       }
  //       placement="bottom"
  //     >
  //       {content}
  //     </MouseoverTooltip>
  //   )
  // }

  return content
}

export default React.memo(Option)
