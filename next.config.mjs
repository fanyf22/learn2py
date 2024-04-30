import Nextra from 'nextra'
import sandbox_plugin from './src/lib/sandbox.mjs'

const withNextra = Nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  mdxOptions: {
    remarkPlugins: [sandbox_plugin],
    rehypePlugins: [],
  },
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
