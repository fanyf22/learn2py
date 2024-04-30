import { visit } from 'unist-util-visit'

export default function sandbox_plugin() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      let { lang, meta, value } = node

      if (lang == 'python' && meta == 'sandbox') {
        delete node.lang
        delete node.meta
        delete node.value

        /** @type {string} **/
        const firstline = value.split('\n', 1)[0]

        if (firstline.startsWith('# ')) {
          var title = firstline.slice(2)
          value = value.slice(firstline.length + 1)
        } else {
          var title = ''
        }

        node.type = 'mdxJsxFlowElement'
        node.name = 'SandBox'
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'title',
            value: title,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'value',
            value: encodeURIComponent(`${value}\n`),
          },
        ]
      }
    })

    visit(tree, 'inlineCode', (node) => {
      if (node.value.endsWith('{}')) {
        node.value = node.value.slice(0, node.value.length - 2)
      } else if (!/.*\{:\w*}/.test(node.value)) {
        node.value = `${node.value}{:python}`
      }
    })
  }
}
