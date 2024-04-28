import { ConfigProvider, theme } from 'antd'
import { useEffect, useState } from 'react'
import { useTheme } from 'nextra-theme-docs'

/**
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export default function Theme({ children }) {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const { resolvedTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(resolvedTheme == 'dark')
  }, [resolvedTheme])

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}>
      {children}
    </ConfigProvider>
  )
}
