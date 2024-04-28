import { useTheme } from 'nextra-theme-docs'
import Image from 'next/image'
import { name } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * @param {React.CSSProperties<Image>} props
 * @returns {JSX.Element}
 * @constructor
 */
export function Logo({ ...props }) {
  const { resolvedTheme } = useTheme()
  const [src, setSRC] = useState('/logo.svg')

  useEffect(() => {
    setSRC(resolvedTheme == 'light' ? '/logo.svg' : '/logo_dark.svg')
  }, [resolvedTheme])

  return <Image src={src} alt={name} width={208} height={33} {...props} />
}
