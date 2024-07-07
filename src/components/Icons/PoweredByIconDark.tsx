const PoweredByIconDark = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <svg width={width || 20} height={height || 10} viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9.66667L9.66667 1M9.66667 1V9.32M9.66667 1H1.34667" stroke="#A1A1A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
</path>
</svg>
  )
}

export default PoweredByIconDark
