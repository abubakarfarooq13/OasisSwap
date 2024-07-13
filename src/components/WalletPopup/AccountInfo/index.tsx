import { Trans } from "@lingui/macro"
import { ChevronRight, Eye, EyeOff, Star } from "react-feather"
import { Flex, Text } from "rebass"
import styled, { css } from "styled-components"
import CoinbaseSubscribeBtn from "components/CoinbaseSubscribeBtn"
import Loader from "components/Loader"
import ActionButtonGroup from "components/WalletPopup/AccountInfo/ActionButtonGroup"
import CardBackground from "components/WalletPopup/AccountInfo/CardBackground"
import MinimalActionButtonGroup from "components/WalletPopup/AccountInfo/MinimalActionButtonGroup"
import { useRewards } from "hooks/useRewards"
import useTheme from "hooks/useTheme"
import { formatNumberWithPrecisionRange } from "utils"
import { View } from "../type"

const ContentWrapper = styled.div`
  position: relative;
  height: 8rem;
  width: 100%;
`

const RewardWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 4rem;
  padding: 20px 16px;
  display: flex;
  /* gap: 10px; */
  flex-direction: column;
  /* justify-content: space-between; */
`

const BalanceTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.subText};
`

const BalanceValue = styled.span`
  font-size: 36px;
  font-weight: 500;
  line-height: 4.4rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.subText};
`

type WrapperProps = {
  $minimal: boolean
}
const Wrapper = styled.div.attrs<WrapperProps>(props => ({
  "data-minimal": props.$minimal
}))<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: all 100ms;
  /* background: ${({ theme }) => theme.buttonBlack}; */

  ${ActionButtonGroup} {
    display: flex;
  }
  ${MinimalActionButtonGroup} {
    display: none;
  }

  ${({ $minimal }) =>
    $minimal &&
    css`
      & {
        ${MinimalActionButtonGroup} {
          display: flex;
          align-self: flex-end;
        }
        ${ActionButtonGroup} {
          display: none;
        }
        ${Content} {
          padding: 12px;
        }
        ${BalanceValue} {
          font-size: 20px;
        }
      }
    `}
`

type Props = {
  totalBalanceInUsd: number | null | string
  isMinimal: boolean
  toggleShowBalance: () => void
  showBalance: boolean
  setView: React.Dispatch<React.SetStateAction<string>>
} & ClickHandlerProps

export type ClickHandlerProps = {
  disabledSend: boolean
  onClickBuy: () => void
  onClickReceive: () => void
  onClickSend: () => void
}

export default function AccountInfo({
  totalBalanceInUsd,
  disabledSend,
  onClickBuy,
  onClickReceive,
  onClickSend,
  isMinimal,
  showBalance,
  toggleShowBalance,
  setView
}: Props) {
  const theme = useTheme()
  const {
    totalReward: { usd }
  } = useRewards()

  return (
    <Wrapper $minimal={isMinimal}>
      <div style={{ marginLeft: "28px", marginTop: "-1rem" }}>
        <CoinbaseSubscribeBtn />
      </div>
      <ContentWrapper>
        <CardBackground noLogo={isMinimal} />
        <Content>
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <Flex width="fit-content" sx={{ gap: "4px", cursor: "pointer" }} onClick={toggleShowBalance}>
                <BalanceTitle>
                  <Trans>Input amount</Trans>
                </BalanceTitle>
                {showBalance ? <EyeOff size={22} color={theme.subText} /> : <Eye size={22} color={theme.subText} />}
              </Flex>

              <BalanceValue>
                {typeof totalBalanceInUsd === "number" ? (
                  showBalance ? (
                    `$${formatNumberWithPrecisionRange(totalBalanceInUsd, 0, 8)}`
                  ) : (
                    "******"
                  )
                ) : typeof totalBalanceInUsd === "string" ? (
                  totalBalanceInUsd
                ) : (
                  <Loader size="30px" />
                )}
              </BalanceValue>
            </Flex>

            {/* <MinimalActionButtonGroup
              disabledSend={disabledSend}
              onClickBuy={onClickBuy}
              onClickReceive={onClickReceive}
              onClickSend={onClickSend}
            /> */}
          </Flex>
        </Content>
      </ContentWrapper>
      <RewardWrapper>
        <Flex flexDirection="row" alignContent="center">
          <CardBackground noLogo />
          <Content style={{ padding: "10px 12px", justifyContent: "center" }}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex sx={{ gap: "8px" }}>
                <Star size={21} color={theme.subText} fill={theme.subText} />
                <Text color={theme.subText} fontSize={16} fontWeight={400} lineHeight="24px">
                  <Trans>Total Available Rewards</Trans>
                </Text>
              </Flex>
              <Flex
                sx={{ gap: "4px", cursor: "pointer" }}
                alignItems="center"
                onClick={() => setView(View().REWARD_CENTER)}
              >
                <Text color={theme.text} fontSize={16} fontWeight={400} lineHeight="16px">
                  ${formatNumberWithPrecisionRange(usd, 0, 8)}
                </Text>
                <ChevronRight size={25} color={theme.subText} />
              </Flex>
            </Flex>
          </Content>
        </Flex>
      </RewardWrapper>
      <ActionButtonGroup
        disabledSend={disabledSend}
        onClickBuy={onClickBuy}
        onClickReceive={onClickReceive}
        onClickSend={onClickSend}
      />
    </Wrapper>
  )
}
