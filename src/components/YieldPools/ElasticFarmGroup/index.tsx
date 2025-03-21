import { Currency, CurrencyAmount, Token } from '@kyberswap/ks-sdk-core'
import { computePoolAddress } from '@kyberswap/ks-sdk-elastic'
import { Trans, t } from '@lingui/macro'
import { useState } from 'react'
import { ArrowDown, ArrowUp, Info } from 'react-feather'
import { useSearchParams } from 'react-router-dom'
import { useMedia } from 'react-use'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

import { ReactComponent as QuestionSquareIcon } from 'assets/svg/question_icon_square.svg'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import HoverDropdown from 'components/HoverDropdown'
import InfoHelper from 'components/InfoHelper'
import { MouseoverTooltip, MouseoverTooltipDesktopOnly, TextDashed } from 'components/Tooltip'
import { FARM_TAB, SORT_DIRECTION, ZERO_ADDRESS } from 'constants/index'
import { NETWORKS_INFO } from 'constants/networks'
import { useActiveWeb3React } from 'hooks'
import { useProAmmNFTPositionManagerReadingContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { Dots } from 'pages/MyPool/styleds'
import { useWalletModalToggle } from 'state/application/hooks'
import { useDepositedNftsByFarm, useElasticFarms, useFarmAction, useUserInfoByFarm } from 'state/farms/elastic/hooks'
import { FarmingPool } from 'state/farms/elastic/types'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useIsTransactionPending } from 'state/transactions/hooks'
import { useViewMode } from 'state/user/hooks'
import { VIEW_MODE } from 'state/user/reducer'
import { 
  // ExternalLink, 
  MEDIA_WIDTHS } from 'theme'
import { formatDollarAmount } from 'utils/numbers'

import { ClickableText, ProMMFarmTableHeader } from '../styleds'
import Row, { Pool } from './Row'
import {
  ConnectWalletButton, //ForceWithdrawButton,
  HarvestAllButton,
  WithdrawButton,
} from './buttons'
import { FarmList } from './styleds'

const FarmContent = styled.div`
  background: ${({ theme }) => theme.background};
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
    margin-left: -1rem;
    margin-right: -1rem;
    border: none;
    padding: 0;
    border-radius: 0;
  `}
`

type Props = {
  address: string
  onOpenModal: (
    modalType: 'forcedWithdraw' | 'harvest' | 'deposit' | 'withdraw' | 'stake' | 'unstake',
    pool?: FarmingPool,
  ) => void
  pools: FarmingPool[]
  onShowStepGuide: () => void
  tokenPrices: { [key: string]: number }
}

enum SORT_FIELD {
  PID = 'pid',
  STAKED_TVL = 'staked_tvl',
  APR = 'apr',
  END_TIME = 'end_time',
  MY_DEPOSIT = 'my_deposit',
  MY_REWARD = 'my_reward',
}

const ElasticFarmGroup: React.FC<Props> = ({ address, onOpenModal, pools, onShowStepGuide, tokenPrices }) => {
  const theme = useTheme()
  const { account, chainId } = useActiveWeb3React()
  const above1000 = useMedia('(min-width: 1000px)')

  const depositedPositions = useDepositedNftsByFarm(address)
  const userInfo = useUserInfoByFarm(address)

  const [searchParams, setSearchParams] = useSearchParams()
  const sortField = searchParams.get('orderBy') || SORT_FIELD.MY_DEPOSIT
  const sortDirection = searchParams.get('orderDirection') || SORT_DIRECTION.DESC

  const { poolFeeLast24h } = useElasticFarms()

  const depositedUsd =
    depositedPositions.reduce(
      (acc, cur) =>
        acc +
        Number(cur.amount0.toExact()) * (tokenPrices[cur.amount0.currency.wrapped.address] || 0) +
        Number(cur.amount1.toExact()) * (tokenPrices[cur.amount1.currency.wrapped.address] || 0),
      0,
    ) || 0

  const userDepositedTokenAmounts =
    depositedPositions.reduce<{
      [address: string]: CurrencyAmount<Token>
    }>((result, pos) => {
      const address0 = pos.amount0.currency.address
      const address1 = pos.amount1.currency.address

      if (!result[address0]) result[address0] = pos.amount0
      else result[address0] = result[address0].add(pos.amount0)

      if (!result[address1]) result[address1] = pos.amount1
      else result[address1] = result[address1].add(pos.amount1)

      return result
    }, {}) || {}

  const rewardPendings = Object.values(userInfo?.rewardPendings || {}).flat()
  const rewardUSD =
    rewardPendings.reduce(
      (acc, cur) => acc + Number(cur.toExact()) * (tokenPrices[cur.currency.wrapped.address] || 0),
      0,
    ) || 0

  const rewardAmounts =
    rewardPendings.reduce<{
      [address: string]: CurrencyAmount<Currency>
    }>((result, amount) => {
      const address = amount.currency.wrapped.address

      if (!result[address]) result[address] = amount
      else result[address] = result[address].add(amount)
      return result
    }, {}) || {}

  const sortedPools = pools
    .map(pool => {
      const tvl = pool.stakedTvl
        ? pool.stakedTvl
        : tokenPrices[pool.token0.wrapped.address] * Number(pool.tvlToken0.toExact()) +
          tokenPrices[pool.token1.wrapped.address] * Number(pool.tvlToken1.toExact())

      const totalRewardValue = pool.totalRewards.reduce(
        (total, rw) => total + Number(rw.toExact()) * tokenPrices[rw.currency.wrapped.address],
        0,
      )

      const farmDuration = (pool.endTime - pool.startTime) / 86400
      const farmAPR = pool.apr ? pool.apr : (365 * 100 * (totalRewardValue || 0)) / farmDuration / pool.poolTvl

      let poolAPR = pool.poolAPR || 0
      if (!poolAPR && pool.feesUSD && poolFeeLast24h[pool.poolAddress]) {
        const pool24hFee = pool.feesUSD - poolFeeLast24h[pool.poolAddress]
        poolAPR = (pool24hFee * 100 * 365) / pool.poolTvl
      }

      const joinedPositions = userInfo?.joinedPositions[pool.pid] || []
      const poolDepositedPositions =
        depositedPositions.filter(pos => {
          return (
            pool.poolAddress.toLowerCase() ===
            computePoolAddress({
              factoryAddress: NETWORKS_INFO[chainId].elastic.coreFactory,
              tokenA: pos.pool.token0,
              tokenB: pos.pool.token1,
              fee: pos.pool.fee,
              initCodeHashManualOverride: NETWORKS_INFO[chainId].elastic.initCodeHash,
            }).toLowerCase()
          )
        }) || []

      const depositedUsd = poolDepositedPositions.reduce(
        (usd, pos) =>
          usd +
          Number(pos.amount1.toExact()) * (tokenPrices[pos.pool.token1.address.toLowerCase()] || 0) +
          Number(pos.amount0.toExact()) * (tokenPrices[pos.pool.token0.address.toLowerCase()] || 0),
        0,
      )

      const stakedUsd = joinedPositions.reduce(
        (usd, pos) =>
          usd +
          Number(pos.amount1.toExact()) * (tokenPrices[pos.pool.token1.address.toLowerCase()] || 0) +
          Number(pos.amount0.toExact()) * (tokenPrices[pos.pool.token0.address.toLowerCase()] || 0),
        0,
      )

      const rewardPendings =
        userInfo?.rewardPendings[pool.pid] || pool.rewardTokens.map(token => CurrencyAmount.fromRawAmount(token, 0))

      const rewardUSD = rewardPendings.reduce(
        (acc, cur) => acc + +cur.toExact() * tokenPrices[cur.currency.wrapped.address],
        0,
      )

      return {
        tvl,
        poolAPR,
        farmAPR,
        depositedUsd,
        stakedUsd,
        rewardUSD,
        ...pool,
      }
    })
    .sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD.PID:
          return sortDirection === SORT_DIRECTION.DESC ? +b.pid - +a.pid : +a.pid - +b.pid
        case SORT_FIELD.STAKED_TVL:
          return sortDirection === SORT_DIRECTION.DESC ? b.tvl - a.tvl : a.tvl - b.tvl
        case SORT_FIELD.APR:
          return sortDirection === SORT_DIRECTION.DESC
            ? b.farmAPR + b.poolAPR - a.farmAPR - a.poolAPR
            : a.farmAPR + a.poolAPR - b.farmAPR - b.poolAPR
        case SORT_FIELD.END_TIME:
          return sortDirection === SORT_DIRECTION.DESC ? b.endTime - a.endTime : a.endTime - b.endTime
        case SORT_FIELD.MY_DEPOSIT:
          return sortDirection === SORT_DIRECTION.DESC
            ? b.depositedUsd === a.depositedUsd
              ? b.farmAPR + b.poolAPR - a.farmAPR - a.poolAPR
              : b.depositedUsd - a.depositedUsd
            : a.depositedUsd - b.depositedUsd
        case SORT_FIELD.MY_REWARD:
          return sortDirection === SORT_DIRECTION.DESC ? b.rewardUSD - a.rewardUSD : a.rewardUSD - b.rewardUSD
        default:
          return sortDirection === SORT_DIRECTION.DESC ? +b.pid - +a.pid : +a.pid - +b.pid
      }
    })

  const toggleWalletModal = useWalletModalToggle()
  const posManager = useProAmmNFTPositionManagerReadingContract()

  const res = useSingleCallResult(posManager, 'isApprovedForAll', [account || ZERO_ADDRESS, address])
  const isApprovedForAll = res?.result?.[0]

  const { approve } = useFarmAction(address)
  const [approvalTx, setApprovalTx] = useState('')

  const isApprovalTxPending = useIsTransactionPending(approvalTx)

  const handleApprove = async () => {
    if (!isApprovedForAll) {
      const tx = await approve()
      tx && setApprovalTx(tx)
    }
  }

  const tab = searchParams.get('type') || 'active'

  const upToExtraSmall = useMedia(`(max-width: ${MEDIA_WIDTHS.upToExtraSmall}px)`)
  const upToMedium = useMedia(`(max-width: ${MEDIA_WIDTHS.upToMedium}px)`)

  const [viewMode] = useViewMode()

  if (!pools) return null

  const canHarvest = Object.values(userInfo?.rewardPendings || {}).some(rw => rw.some(item => item.greaterThan('0')))
  const canWithdraw = !!depositedPositions.length

  const renderApproveButton = () => {
    if (isApprovedForAll || tab === 'ended') {
      return null
    }

    if (approvalTx && isApprovalTxPending) {
      return (
        <ButtonPrimary
          style={{
            whiteSpace: 'nowrap',
            height: '38px',
            padding: '0 12px',
            width: 'fit-content',
          }}
          onClick={handleApprove}
          disabled
        >
          <Info width="16px" />
          <Text fontSize="14px" marginLeft="8px">
            <Dots>
              <Trans>Approving</Trans>
            </Dots>
          </Text>
        </ButtonPrimary>
      )
    }

    return (
      <MouseoverTooltipDesktopOnly
        text={
          <Text color={theme.subText} as="span">
            <Trans>
              Authorize the farming contract so it can access your liquidity positions (i.e. your NFT tokens). Then
              deposit your liquidity positions using the{' '}
              <Text as="span" color={theme.text}>
                Deposit
              </Text>{' '}
              button
            </Trans>
          </Text>
        }
        width="400px"
        placement="top"
      >
        <ButtonPrimary
          style={{
            whiteSpace: 'nowrap',
            height: '38px',
            padding: '0 12px',
          }}
          onClick={handleApprove}
        >
          <Info width="16px" />
          <Text fontSize="14px" marginLeft="8px">
            {approvalTx && isApprovalTxPending ? (
              <Dots>
                <Trans>Approving</Trans>
              </Dots>
            ) : above1000 ? (
              <Trans>Approve Farming Contract</Trans>
            ) : (
              <Trans>Approve</Trans>
            )}
          </Text>
        </ButtonPrimary>
      </MouseoverTooltipDesktopOnly>
    )
  }

  const renderFarmGroupHeader = () => {
    return (
      <Flex
        justifyContent="space-between"
        flexDirection={upToMedium ? 'column' : 'row'}
        alignItems={upToMedium ? 'flex-start' : 'center'}
        padding={upToExtraSmall ? '1rem' : '1.25rem 24px'}
        paddingBottom="0"
        sx={{ gap: '24px' }}
      >
        <Text fontSize="16px" fontWeight="500" display="flex" alignItems="center" sx={{ gap: '6px' }}>
          <Trans>Dynamic Farms</Trans>

          <Text
            color={theme.subText}
            display="flex"
            alignItems="center"
            role="button"
            sx={{ cursor: 'pointer' }}
            onClick={onShowStepGuide}
          >
            <QuestionSquareIcon />
          </Text>
        </Text>

        {!isApprovedForAll && res?.loading ? (
          <Dots />
        ) : !account ? (
          <Flex width="fit-content">
            <ConnectWalletButton onClick={toggleWalletModal} />
          </Flex>
        ) : (
          renderApproveButton()
        )}

        {isApprovedForAll && !!account && summaryRewardAndDepositInfo()}
      </Flex>
    )
  }

  const handleSort = (field: SORT_FIELD) => {
    const direction =
      sortField !== field
        ? SORT_DIRECTION.DESC
        : sortDirection === SORT_DIRECTION.DESC
        ? SORT_DIRECTION.ASC
        : SORT_DIRECTION.DESC

    searchParams.set('orderDirection', direction)
    searchParams.set('orderBy', field)
    setSearchParams(searchParams)
  }

  const renderTableHeaderOnDesktop = () => {
    return (
      <ProMMFarmTableHeader>
        <Flex grid-area="token_pairs" alignItems="center" justifyContent="flex-start">
          <ClickableText>
            <Trans>Pool</Trans>
            {sortField === SORT_FIELD.PID &&
              (sortDirection === SORT_DIRECTION.DESC ? (
                <ArrowDown size={12} />
              ) : sortDirection === SORT_DIRECTION.ASC ? (
                <ArrowUp size={12} />
              ) : null)}
          </ClickableText>
        </Flex>

        <Flex grid-area="liq" alignItems="center" justifyContent="flex-start">
          <ClickableText
            onClick={() => {
              handleSort(SORT_FIELD.STAKED_TVL)
            }}
          >
            <Trans>Staked TVL</Trans>
            {sortField === SORT_FIELD.STAKED_TVL &&
              (sortDirection === SORT_DIRECTION.DESC ? (
                <ArrowDown size={12} />
              ) : sortDirection === SORT_DIRECTION.ASC ? (
                <ArrowUp size={12} />
              ) : null)}
          </ClickableText>
        </Flex>

        <Flex grid-area="apy" alignItems="center" justifyContent="flex-start">
          <ClickableText
            onClick={() => {
              handleSort(SORT_FIELD.APR)
            }}
          >
            <Trans>AVG APR</Trans>

            {sortField === SORT_FIELD.APR &&
              (sortDirection === SORT_DIRECTION.DESC ? (
                <ArrowDown size={12} />
              ) : sortDirection === SORT_DIRECTION.ASC ? (
                <ArrowUp size={12} />
              ) : null)}
          </ClickableText>
          <InfoHelper
            text={t`Average estimated return based on yearly trading fees from the pool & additional bonus rewards if you participate in the farm.`}
          />
        </Flex>

        <Flex grid-area="end" alignItems="center" justifyContent="flex-start">
          <ClickableText
            onClick={() => {
              handleSort(SORT_FIELD.END_TIME)
            }}
          >
            <Trans>Ending In</Trans>
            {sortField === SORT_FIELD.END_TIME &&
              (sortDirection === SORT_DIRECTION.DESC ? (
                <ArrowDown size={12} />
              ) : sortDirection === SORT_DIRECTION.ASC ? (
                <ArrowUp size={12} />
              ) : null)}
          </ClickableText>
          <InfoHelper text={t`Once a farm has ended, you will continue to receive returns through LP Fees.`} />
        </Flex>

        <Flex
          grid-area="staked_balance"
          alignItems="center"
          justifyContent="flex-start"
          onClick={() => {
            handleSort(SORT_FIELD.MY_DEPOSIT)
          }}
        >
          <HoverDropdown
            padding="8px 0"
            hideIcon
            content={
              <ClickableText>
                <Flex flex={1}>My Deposit | Target Volume</Flex>{' '}
                {sortField === SORT_FIELD.MY_DEPOSIT &&
                  (sortDirection === SORT_DIRECTION.DESC ? (
                    <ArrowDown size={12} />
                  ) : sortDirection === SORT_DIRECTION.ASC ? (
                    <ArrowUp size={12} />
                  ) : null)}
                <Info size={12} style={{ marginLeft: '4px' }} />
              </ClickableText>
            }
            dropdownContent={
              <Text color={theme.subText} fontSize="12px" maxWidth="400px" lineHeight={1.5}>
                <Trans>
                  Some farms have a target trading volume (represented by the progress bar) to determine the amount of
                  reward you will earn. The more trading volume your liquidity positions support, the more rewards per
                  second you will make.
                  <br />
                  <br />
                  Once you have fully unlocked the target volume, you will start earning the maximum rewards per second.
                  Adjusting the staked amount will recalculate the target volume.
                  <br />
                  {/* Learn more{' '}
                  <ExternalLink href="https://docs.kyberswap.com/guides/farming-mechanisms">here.</ExternalLink> */}
                </Trans>
              </Text>
            }
          />
        </Flex>

        <Flex
          grid-area="reward"
          alignItems="center"
          justifyContent="flex-end"
          onClick={() => {
            handleSort(SORT_FIELD.MY_REWARD)
          }}
        >
          <ClickableText>
            <Trans>My Rewards</Trans>
            {sortField === SORT_FIELD.MY_REWARD &&
              (sortDirection === SORT_DIRECTION.DESC ? (
                <ArrowDown size={12} />
              ) : sortDirection === SORT_DIRECTION.ASC ? (
                <ArrowUp size={12} />
              ) : null)}
          </ClickableText>
        </Flex>

        <Flex grid-area="action" alignItems="center" justifyContent="flex-end">
          <ClickableText>
            <Trans>Actions</Trans>
          </ClickableText>
        </Flex>
      </ProMMFarmTableHeader>
    )
  }

  const summaryRewardAndDepositInfo = () => {
    return (
      <Flex
        alignItems="center"
        sx={{ gap: '1rem' }}
        flexDirection={upToMedium ? 'column' : 'row'}
        width={upToMedium ? '100%' : undefined}
      >
        <Flex
          alignItems="center"
          sx={{ gap: '8px' }}
          width={upToMedium ? '100%' : undefined}
          justifyContent={upToExtraSmall ? 'space-between' : 'flex-end'}
        >
          <Flex
            flexDirection={upToExtraSmall ? 'column' : 'row'}
            sx={{ gap: '4px' }}
            alignItems={upToExtraSmall ? 'flex-start' : 'center'}
          >
            <MouseoverTooltip
              text={t`Total value of liquidity positions (i.e. NFT tokens) you've deposited into the farming contract.`}
            >
              <TextDashed fontSize="12px" fontWeight="500" color={theme.subText}>
                <Trans>Deposited Liquidity</Trans>
              </TextDashed>
            </MouseoverTooltip>

            <HoverDropdown
              style={{ padding: '0', color: theme.text }}
              content={
                account ? (
                  <Text as="span" fontSize="20px" fontWeight="500">
                    {formatDollarAmount(depositedUsd)}
                  </Text>
                ) : (
                  '--'
                )
              }
              hideIcon={!account || !depositedUsd}
              dropdownContent={
                Object.values(userDepositedTokenAmounts).some(amount => amount.greaterThan(0)) ? (
                  <AutoColumn>
                    {Object.values(userDepositedTokenAmounts).map(
                      amount =>
                        amount.greaterThan(0) && (
                          <Flex alignItems="center" key={amount.currency.address}>
                            <CurrencyLogo currency={amount.currency} size="16px" />
                            <Text fontSize="12px" marginLeft="4px" fontWeight="500">
                              {amount.toSignificant(8)} {amount.currency.symbol}
                            </Text>
                          </Flex>
                        ),
                    )}
                  </AutoColumn>
                ) : (
                  ''
                )
              }
            />
          </Flex>

          <WithdrawButton
            disabled={!account || !canWithdraw || !isApprovedForAll}
            onClick={() => onOpenModal('withdraw')}
          />
        </Flex>

        <Flex
          alignItems="center"
          sx={{ gap: '8px' }}
          width={upToMedium ? '100%' : undefined}
          justifyContent={upToExtraSmall ? 'space-between' : 'flex-end'}
        >
          <Flex
            flexDirection={upToExtraSmall ? 'column' : 'row'}
            sx={{ gap: '4px' }}
            alignItems={upToExtraSmall ? 'flex-start' : 'center'}
          >
            {' '}
            <Text fontSize="14px" color={theme.subText} fontWeight="500">
              <Trans>Rewards</Trans>
            </Text>
            <HoverDropdown
              style={{ padding: '0' }}
              content={
                <Text as="span" fontSize="20px" fontWeight="500" color={theme.text}>
                  {account && !!rewardUSD ? formatDollarAmount(rewardUSD) : '$0.00'}
                </Text>
              }
              hideIcon={!account || !rewardUSD}
              dropdownContent={
                Object.values(rewardAmounts).length ? (
                  <AutoColumn>
                    {Object.values(rewardAmounts).map(
                      amount =>
                        amount.greaterThan(0) && (
                          <Flex alignItems="center" key={amount.currency.wrapped.address}>
                            <CurrencyLogo currency={amount.currency} size="16px" />
                            <Text fontSize="12px" marginLeft="4px" fontWeight="500">
                              {amount.toSignificant(8)} {amount.currency.symbol}
                            </Text>
                          </Flex>
                        ),
                    )}
                  </AutoColumn>
                ) : (
                  ''
                )
              }
            />
          </Flex>
          <HarvestAllButton onClick={() => onOpenModal('harvest')} disabled={!account || !canHarvest} />
        </Flex>
      </Flex>
    )
  }

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const activeFarms = sortedPools.filter(pool => pool.endTime >= currentTimestamp)
  const endedFarms = sortedPools.filter(pool => pool.endTime < currentTimestamp)

  const upcomingFarms = sortedPools.filter(pool => pool.startTime > currentTimestamp)
  const runningFarms = activeFarms.filter(pool => pool.startTime <= currentTimestamp)

  const renderFarmList = (farms: Pool[]) => {
    return farms.map(pool => {
      return (
        <Row
          isApprovedForAll={isApprovedForAll}
          pool={pool}
          key={pool.id}
          onOpenModal={onOpenModal}
          fairlaunchAddress={address}
          onHarvest={() => {
            onOpenModal('harvest', pool)
          }}
          tokenPrices={tokenPrices}
        />
      )
    })
  }

  return (
    <FarmContent data-testid="farm-block">
      {renderFarmGroupHeader()}

      {tab === FARM_TAB.MY_FARMS ? (
        <>
          {!!activeFarms.length && (
            <>
              <Text
                fontSize="16px"
                fontWeight="500"
                color={theme.subText}
                marginTop="24px"
                paddingX={upToExtraSmall ? '1rem' : '24px'}
              >
                <Trans>Active</Trans>
              </Text>
              <FarmList gridMode={viewMode === VIEW_MODE.GRID || !above1000}>
                {above1000 && viewMode === VIEW_MODE.LIST && renderTableHeaderOnDesktop()}
                {renderFarmList(activeFarms)}
              </FarmList>
            </>
          )}

          {!!endedFarms.length && (
            <>
              <Text
                fontSize="16px"
                fontWeight="500"
                color={theme.subText}
                marginTop="24px"
                paddingX={upToExtraSmall ? '1rem' : '24px'}
              >
                <Trans>Ended</Trans>
              </Text>
              <FarmList gridMode={viewMode === VIEW_MODE.GRID || !above1000}>
                {above1000 && viewMode === VIEW_MODE.LIST && renderTableHeaderOnDesktop()}
                {renderFarmList(endedFarms)}
              </FarmList>
            </>
          )}
        </>
      ) : (
        <>
          {!!upcomingFarms.length && !!runningFarms.length && (
            <Text
              fontSize="16px"
              fontWeight="500"
              color={theme.subText}
              marginTop="24px"
              paddingX={upToExtraSmall ? '1rem' : '24px'}
            >
              <Trans>Active Farms</Trans>
            </Text>
          )}

          <FarmList gridMode={viewMode === VIEW_MODE.GRID || !above1000}>
            {above1000 && viewMode === VIEW_MODE.LIST && renderTableHeaderOnDesktop()}
            {renderFarmList(tab === FARM_TAB.ACTIVE ? runningFarms : endedFarms)}
          </FarmList>

          {!!upcomingFarms.length && (
            <>
              <Text
                fontSize="16px"
                fontWeight="500"
                color={theme.warning}
                marginTop="24px"
                paddingX={upToExtraSmall ? '1rem' : '24px'}
              >
                <Trans>Upcoming Farms</Trans>
              </Text>

              <FarmList gridMode={viewMode === VIEW_MODE.GRID || !above1000}>
                {above1000 && viewMode === VIEW_MODE.LIST && renderTableHeaderOnDesktop()}
                {renderFarmList(upcomingFarms)}
              </FarmList>
            </>
          )}
        </>
      )}
    </FarmContent>
  )
}

export default ElasticFarmGroup
