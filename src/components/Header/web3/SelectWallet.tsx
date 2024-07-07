import { Trans } from '@lingui/macro'
import { getConnection } from 'connection'
import { darken, lighten } from 'polished'
import { useEffect, useMemo } from 'react'
import { Activity } from 'react-feather'
import { useMedia } from 'react-use'
import styled from 'styled-components'

import { ReactComponent as WarningInfo } from 'assets/svg/wallet_warning_icon.svg'
import { ButtonLight } from 'components/Button'
import CoinbaseSubscribeBtn from 'components/CoinbaseSubscribeBtn'
import WalletModal from 'components/Header/web3/WalletModal'
import Loader from 'components/Loader'
import { RowBetween } from 'components/Row'
import { MouseoverTooltip } from 'components/Tooltip'
import { TutorialIds } from 'components/Tutorial/TutorialSwap/constant'
import { useActiveWeb3React, useWeb3React } from 'hooks'
import useENSName from 'hooks/useENSName'
import useLogin from 'hooks/useLogin'
import useMixpanel, { MIXPANEL_TYPE } from 'hooks/useMixpanel'
import useTheme from 'hooks/useTheme'
import { useNetworkModalToggle, useWalletModalToggle } from 'state/application/hooks'
import { useAppDispatch } from 'state/hooks'
import { useSignedAccountInfo } from 'state/profile/hooks'
import { isTransactionRecent, newTransactionsFirst, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/type'
import { updateRecentConnectionMeta } from 'state/user/actions'
import { MEDIA_WIDTHS } from 'theme'
import { shortenAddress } from 'utils'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled.button`
  ${({ theme }) => theme.flexRowNoWrap}
  width: fit-content;
  align-items: center;
  padding: 10px 12px;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.primary : theme.background)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary : theme.background)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.subText)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) =>
      pending ? darken(0.05, theme.primary) : lighten(0.05, theme.background)};
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.25rem 0 0.5rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

const AccountElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 999px;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
  pointer-events: auto;
  height: 42px;
`

function Web3StatusInner() {
  const { chainId, account, walletKey, isWrongNetwork } = useActiveWeb3React()
  const { mixpanelHandler } = useMixpanel()
  const uptoMedium = useMedia(`(max-width: ${MEDIA_WIDTHS.upToMedium}px)`)
  const { signIn } = useLogin()
  const { ENSName } = useENSName(account ?? undefined)
  const theme = useTheme()
  const { connector } = useWeb3React()
  const connection = getConnection(connector)
  const dispatch = useAppDispatch()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs: TransactionDetails[] = allTransactions
      ? (Object.values(allTransactions)?.flat().filter(Boolean) as TransactionDetails[])
      : []
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pendingLength = sortedRecentTransactions.filter(tx => !tx.receipt).length

  useEffect(() => {
    if (account || ENSName) {
      const { rdns } = connection.getProviderInfo()
      dispatch(
        updateRecentConnectionMeta({ type: connection.type, address: account, ENSName: ENSName ?? undefined, rdns }),
      )
    }
  }, [ENSName, account, connection, dispatch])

  const hasPendingTransactions = !!pendingLength
  const toggleWalletModal = useWalletModalToggle()
  const toggleNetworkModal = useNetworkModalToggle()
  const { isSignInDifferentWallet } = useSignedAccountInfo()

  if (isWrongNetwork) {
    return (
      <Web3StatusError onClick={toggleNetworkModal}>
        <NetworkIcon />
        <Text>
          <Trans>Wrong Network</Trans>
        </Text>
      </Web3StatusError>
    )
  }
  if (account) {
    return (
      <Web3StatusConnected
        id={TutorialIds.BUTTON_ADDRESS_WALLET}
        data-testid="web3-status-connected"
        onClick={() => {
          toggleWalletModal()
          mixpanelHandler(MIXPANEL_TYPE.WUI_WALLET_CLICK)
        }}
        pending={hasPendingTransactions}
      >
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>
              <Trans>{pendingLength} Pending</Trans>
            </Text>{' '}
            <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {isSignInDifferentWallet ? (
              <MouseoverTooltip
                placement="bottom"
                text={
                  <Text style={{ fontSize: '12px', textAlign: 'left', whiteSpace: 'normal' }}>
                    <Trans>
                      You are not signed in with this wallet address. If you wish, you can{' '}
                      <span
                        style={{ cursor: 'pointer', fontSize: '12px', color: theme.primary }}
                        onClick={e => {
                          e.stopPropagation()
                          signIn({ account })
                        }}
                      >
                        sign-in
                      </span>{' '}
                      to link your wallet to a profile. This will allow us to offer you a better experience.
                    </Trans>
                  </Text>
                }
              >
                <WarningInfo width={20} height={20} />
              </MouseoverTooltip>
            ) : (
              walletKey && (
                <IconWrapper size={16}>
                  <img src={connection.getProviderInfo().icon} alt="" />
                </IconWrapper>
              )
            )}
            <Text>{ENSName || shortenAddress(chainId, account, uptoMedium ? 2 : undefined)}</Text>
            <CoinbaseSubscribeBtn onlyShowIfNotSubscribe />
          </>
        )}
      </Web3StatusConnected>
    )
  }
  return (
    <ButtonLight
      onClick={toggleWalletModal}
      padding="10px 12px"
      id={TutorialIds.BUTTON_CONNECT_WALLET}
      data-testid="button-connect-wallet"
    >
      <Trans>Connect wallet</Trans>
    </ButtonLight>
  )
}

export default function SelectWallet() {
  return (
    <AccountElement>
      <Web3StatusInner />
      <WalletModal />
    </AccountElement>
  )
}
