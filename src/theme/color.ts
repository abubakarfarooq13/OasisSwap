const white = '#FFFFFF'
const black = '#000000'

export function colors() {
  return {
    // base
    white,
    black,

    // text
    text: '#ffffff',
    darkText: '#222222',
    textReverse: '#222222',
    subText: '#A1A1A1',
    disableText: '#373737',

    // backgrounds
    background: 'rgba(60, 155, 55, 0.1)',
    tabActive: '#313131',
    tabBackground: '#0F0F0F',

    tableHeader: '#313131',
    buttonBlack: '#0C0C0E',
    buttonGray: '#292929',

    text2: '#C3C5CB',
    text3: '#6C7284',
    text4: '#565A69',
    text5: '#c9d2d7',
    text6: '#D8D8D8',

    // backgrounds
    bg1: '#212429',
    bg2: '#222c31',
    bg3: '#40444F',
    bg4: '#565A69',
    bg5: '#31CB9E',
    bg6: '#1d7a5f',
    bg7: 'rgba(60, 155, 55, 0.5)',
    bg8: '#111A12',
    bg9: '#111B13',
    bgSuccess: 'linear-gradient(90deg, rgba(29, 122, 95, 0.5) 0%, rgba(29, 122, 95, 0) 100%)',
    bgError: 'linear-gradient(90deg, rgba(255, 83, 123, 0.4) 0%, rgba(255, 83, 123, 0) 100%)',
    bgWarning: 'linear-gradient(90deg, rgba(255, 153, 1, 0.5) 0%, rgba(255, 153, 1, 0) 100%)',
    bgModal: 'rgba(0,0,0,.425)',

    radialGradient: 'radial-gradient(#095143, #06291d)',
    // buttons
    bt1: '#202020',
    //primary colors
    primary: '#3C9B37',

    // border colors
    border: '#505050',

    //shadows
    shadow: 'rgba(0, 0, 0, 0.2)',
    shadow1: '#000',

    // other
    red: '#FF537B',
    red1: '#FF6871',
    red2: '#F82D3A',
    warning: '#FF9901',

    apr: '#0faaa2',
    lightGreen: '#98E5CE',
    darkerGreen: '#1D7A5F',
    darkGreen: '#1D7A5F',
    green: '#31CB9E',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',

    blue: '#08A1E7',
    blue1: '#31cb9e',
    darkBlue: '#1183b7',
  } as const
}

export type Colors = ReturnType<typeof colors>
