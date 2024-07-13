import { CSSProperties } from "styled-components"

export default function SendIcon({ size = 21, style = {} }: { size?: number; style?: CSSProperties }) {
  return (
    <svg style={style} width={size} height={size} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.26523 9.73242L10.3986 11.8658L12.5319 9.73242"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3993 3.33398V11.809"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.165 10.1514C17.165 13.8347 14.665 16.818 10.4983 16.818C6.33163 16.818 3.83163 13.8347 3.83163 10.1514"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
