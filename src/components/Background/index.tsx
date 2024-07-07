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
`
const BackgroundMainTwo = styled.div`
  display: flex;
  align-items: end;
  position: relative;
  justify-content: space-between;
  gap: 2rem;
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
