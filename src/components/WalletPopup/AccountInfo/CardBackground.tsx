import styled, { css } from "styled-components"

// import { ReactComponent as KyberLogo } from "assets/svg/kyber_logo.svg"

const absoluteStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const BackgroundWrapper = styled.div`
  ${absoluteStyle}

  /* box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.15), inset -1px -1px 1px rgba(0, 0, 0, 0.08);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */
  background: #0C0C0E;
  /* mix-blend-mode: overlay; */
  border-radius: 12px;
  overflow: hidden;
`

const Palm1 = styled.div`
  position: relative;
  height: 3.6rem;
  width: 2.6rem;
  background-image: url(/walletpalm1.png);
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(100%);
`

const Palm2 = styled.div`
  position: relative;
  height: 6rem;
  width: 4.6rem;
  margin-right: 5px;
  background-image: url(/walletpalm2.png);
  background-repeat: no-repeat;
  background-size: cover;
  filter: brightness(100%);
`

const LogoWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 16px;
  top: 50%;
  gap: 0.7rem;
  align-items: end;
  transform: translateY(-50%);
`
type Props = {
  noLogo: boolean
}
const CardBackground: React.FC<Props> = ({ noLogo }) => {
  return (
    <BackgroundWrapper>
      {!noLogo && (
        <LogoWrapper>
          {/* <KyberLogo width="94px" height="auto" /> */}
          <Palm1 />
          <Palm2 />
        </LogoWrapper>
      )}
    </BackgroundWrapper>
  )
}

export default CardBackground
