import React from 'react'
import styled from 'styled-components'

const BackgroundMain = styled.div`
  display: flex;
  align-items: end;
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: -3.5rem;
  z-index: -1;
  justify-content: space-around;
  @media screen and (max-width: 430px) {
    width: 100%;
    height: 100%;
  }
`
const BackgroundMainTwo = styled.div`
  display: flex;
  align-items: end;
  position: relative;
  justify-content: space-between;
  gap: 2rem;
  @media screen and (max-width: 430px) {
    /* width: 100%;
    height: 100%; */
    gap: 0.5rem;
  }
  @media screen and (max-width: 340px) {
    gap: 0;
  }
`
const PalmOne = styled.div`
  position: relative;
  width: 100px;
  height: 140px;
  bottom: 0;
  opacity: 70%;
  z-index: -1;
  background-image: url(/Palm1.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 340px) {
    width: 110px;
    height: 140px;
  }
`
const PalmTwo = styled.div`
  position: relative;
  width: 80px;
  height: 100px;
  bottom: 0;
  opacity: 70%;
  z-index: -1;
  background-image: url(/Palm2.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 430px) {
    /* width: 50px;
    height: 80px; */
    display: none;
  }
`
const PalmThree = styled.div`
  position: relative;
  width: 100px;
  height: 145px;
  bottom: 0;
  opacity: 70%;
  z-index: -1;
  background-image: url(/Palm3.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 430px) {
    display: none;
  }
  /* @media screen and (min-width: 340px) {
    display: none;
  } */
`
const PalmFour = styled.div`
  position: relative;
  width: 280px;
  height: 350px;
  bottom: 0;
  opacity: 70%;
  z-index: -1;
  background-image: url(/Palm4.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 430px) {
    width: 150px;
    height: 200px;
    flex: 1;
  }
  @media screen and (max-width: 340px) {
    width: 150px;
    height: 200px;
  }
`
const PalmFive = styled.div`
  position: relative;
  width: 130px;
  height: 170px;
  bottom: 0;
  opacity: 70%;
  z-index: -1;
  background-image: url(/Palm5.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 430px) {
    width: 100px;
    height: 130px;
  }
  @media screen and (max-width: 340px) {
    width: 80px;
    height: 100px;
  }
`
const Background = () => {
  return (
    <BackgroundMain>
      <PalmOne></PalmOne>
      <PalmTwo></PalmTwo>
      <PalmThree></PalmThree>
      <BackgroundMainTwo>
        <PalmFour></PalmFour>
        <PalmFive></PalmFive>
      </BackgroundMainTwo>
    </BackgroundMain>
  )
}

export default Background
