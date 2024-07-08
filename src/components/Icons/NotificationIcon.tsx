const NotificationIcon = ({ size, color }: { size?: number | string; color?: string }) => {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" stroke={color || 'currentcolor'} xmlns="http://www.w3.org/2000/svg">
     <path 
     d="M10.0169 2.4248C7.25853 2.4248 5.01686 4.66647 5.01686 7.4248V9.83314C5.01686 10.3415 4.8002 11.1165 4.54186 11.5498L3.58353 13.1415C2.99186 14.1248 3.4002 15.2165 4.48353 15.5831C8.0752 16.7831 11.9502 16.7831 15.5419 15.5831C16.5502 15.2498 16.9919 14.0581 16.4419 13.1415L15.4835 11.5498C15.2335 11.1165 15.0169 10.3415 15.0169 9.83314V7.4248C15.0169 4.6748 12.7669 2.4248 10.0169 2.4248Z"  
     strokeWidth={1.5} 
     strokeMiterlimit="10" 
     strokeLinecap="round"/>
{/* <path d="M14.1669 7.5C15.5476 7.5 16.6669 6.38071 16.6669 5C16.6669 3.61929 15.5476 2.5 14.1669 2.5C12.7862 2.5 11.6669 3.61929 11.6669 5C11.6669 6.38071 12.7862 7.5 14.1669 7.5Z" fill="#FF0000" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> */}
<path d="M11.5581 2.66621C11.2997 2.59121 11.0331 2.53288 10.7581 2.49954C9.95806 2.39954 9.1914 2.45788 8.47473 2.66621C8.7164 2.04954 9.3164 1.61621 10.0164 1.61621C10.7164 1.61621 11.3164 2.04954 11.5581 2.66621Z"  strokeWidth={1.5} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.517 15.8838C12.517 17.2588 11.392 18.3838 10.017 18.3838C9.33363 18.3838 8.7003 18.1005 8.2503 17.6505C7.8003 17.2005 7.51697 16.5671 7.51697 15.8838" strokeWidth="1.5" strokeMiterlimit="10"/>
    </svg>
  )
}

export default NotificationIcon
