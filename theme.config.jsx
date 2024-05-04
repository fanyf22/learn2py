import { Logo } from '@/components/logo'
import { name, description, author, repository } from '@/lib/global'
import Theme from '@/components/theme'
import styles from '@/styles/styles.module.css'

export default {
  docsRepositoryBase: `${repository}/tree/main`,
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={description} />
      <title>{`${name} - ${description}`}</title>,
      <script
        type="module"
        src="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js"
      />
    </>
  ),
  main: ({ children }) => <Theme>{children}</Theme>,
  logo: <Logo className={styles.masked_logo} />,
  project: { link: repository },
  toc: { title: '目录', backToTop: true },
  editLink: { content: '在 GitHub 上编辑此页' },
  feedback: { content: '有任何疑问？在这里反馈', labels: 'feedback' },
  sidebar: { autoCollapse: true, defaultMenuCollapseLevel: 1 },
  footer: {
    content: (
      <span>
        Apache {new Date().getFullYear()} ©{author}.
      </span>
    ),
  },
  gitTimestamp: ({ timestamp }) => `最后更新于 ${timestamp.toLocaleDateString()}`,
}
