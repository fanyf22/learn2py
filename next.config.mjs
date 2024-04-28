import Nextra from 'nextra'

const withNextra = Nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

export default withNextra({
  reactStrictMode: true,
  transpilePackages: [
    'rc-util',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand',
    'leva',
    'antd',
    'rc-pagination',
    'rc-picker',
  ],
})
