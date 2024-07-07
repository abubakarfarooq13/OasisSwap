function Swap({ size, color, rotate }: { size?: number; color?: string; rotate?: number }) {
  // style={{ transform: 'rotate(90deg)' }}
  return (
    <svg
      width={size || 24}
      height={size || 24}
      transform={rotate ? `rotate(${rotate})` : 'none'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
     <path
        stroke={color || 'currentcolor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M9.01 20.5l-5.02-5.01M9.01 3.5v17M14.99 3.5l5.02 5.01M14.99 20.5v-17"
      /></svg>

  )
}

export default Swap
