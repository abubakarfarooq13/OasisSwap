import { Trans } from '@lingui/macro'
// import { useMedia } from 'react-use'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'

// import ChainSecurity from 'assets/svg/chainsecurity.svg'
import { Telegram } from 'components/Icons'
import Discord from 'components/Icons/Discord'
import PoweredByIconDark from 'components/Icons/PoweredByIconDark'
import TwitterIcon from 'components/Icons/TwitterIcon'
// import InfoHelper from 'components/InfoHelper'
import { KYBER_NETWORK_DISCORD_URL, KYBER_NETWORK_TWITTER_URL } from 'constants/index'
import useTheme from 'hooks/useTheme'
import { ExternalLink, ExternalLinkNoLineHeight } from 'theme'

const FooterWrapper = styled.div`
  background: ${({ theme }) => theme.footerbackground};
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    margin-bottom: 4rem;
  `};
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 100%;
  padding: 16px;
  flex-direction: column-reverse;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    padding: 16px 16px;
  }

  @media only screen and (min-width: 1000px) {
    padding: 16px 32px;
  }

  @media only screen and (min-width: 1366px) {
    padding: 16px 32px;
  }

  @media only screen and (min-width: 1500px) {
    padding: 16px 32px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.subText + '33'};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 16px;
    gap: 12px;
  `};
`

// const Separator = styled.div`
//   width: 1px;
//   background: ${({ theme }) => theme.border};
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: none
//   `}
// `

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.subText};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: row;
    gap: 1px;
    font-size: 0.6rem;
    // max-width: 4rem;
  `};
`

export const FooterSocialLink = () => {
  const theme = useTheme()
  return (
    <Flex alignItems="center" justifyContent="center" sx={{ gap: '24px' }}>
      <ExternalLinkNoLineHeight href="#">
        <Telegram size={16} color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={KYBER_NETWORK_TWITTER_URL}>
        <TwitterIcon color={theme.subText} />
      </ExternalLinkNoLineHeight>
      <ExternalLinkNoLineHeight href={KYBER_NETWORK_DISCORD_URL}>
        <Discord width={16} height={12} color={theme.subText} />
      </ExternalLinkNoLineHeight>
    </Flex>
  )
}

function Footer() {
  // const above768 = useMedia('(min-width: 768px)')

  return (
    <FooterWrapper>
      <FooterContent>
        <InfoWrapper>
          <Item>
            <Text>
              <Trans>Web v1.73.0</Trans>
            </Text>
            <ExternalLink href="#" style={{ display: 'flex' }}>
              <PoweredByIconDark width={'1rem'} height={'1rem'}/>
            </ExternalLink>
          </Item>
          <Item>
            <Text>
              <Trans>Vault Relayer v1.4.0</Trans>
            </Text>
            <ExternalLink href="#" style={{ display: 'flex' }}>
              <PoweredByIconDark  width={'1rem'} height={'1rem'}/>
            </ExternalLink>
          </Item>
          <Item>
            <Text>
              <Trans>Settlement Contract v1.4.0</Trans>
            </Text>
            <ExternalLink href="#" style={{ display: 'flex' }}>
              <PoweredByIconDark  width={'1rem'} height={'1rem'}/>
            </ExternalLink>
          </Item>
          {/* <Separator />

          <Item>
            <Text marginRight="6px" display="flex">
              <Trans>Audited By</Trans>
              {!above768 && <InfoHelper size={14} text={t`Covers smart-contracts`} placement="top" />}
            </Text>
            <ExternalLink href="https://chainsecurity.com/security-audit/kyberswap-elastic" style={{ display: 'flex' }}>
              <img src={ChainSecurity} alt="" width="98px" />
            </ExternalLink>
            {above768 && <InfoHelper size={14} text={t`Covers smart-contracts`} placement="top" />}
          </Item> */}
        </InfoWrapper>
        {/* <FooterSocialLink /> */}
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer
