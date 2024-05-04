import { useEffect, useState } from 'react'
import { useTheme } from 'nextra-theme-docs'
import { Card, Button } from 'antd'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/ext-language_tools'

/**
 * @param {string} title
 * @param {string} value
 * @returns {JSX.Element}
 * @constructor
 */
export default function SandBox({ title = '测试代码', value = '' }) {
  value = decodeURIComponent(value)

  const { resolvedTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(resolvedTheme == 'dark')
  }, [resolvedTheme])

  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [input, setInput] = useState(value)

  async function runCode() {
    setOutput('')
    setError('')
    let real_output = ''
    const pyodide = await loadPyodide()
    pyodide.setStdin({
      stdin: () => prompt(),
    })
    pyodide.setStdout({
      raw(code) {
        real_output += String.fromCharCode(code)
      },
    })
    pyodide.setStderr({
      raw(code) {
        real_output += String.fromCharCode(code)
      },
    })
    pyodide
      .runPythonAsync(input)
      .catch((error) => setError(error.toString()))
      .then(() => {
        pyodide
          .runPythonAsync(
            `
        import sys
        sys.stdout.flush()
        sys.stderr.flush()
        `
          )
          .then(() => setOutput(real_output))
          .catch((error) => setError(error.toString()))
      })
  }

  const runCodeButton = (
    <Button type="default" onClick={runCode}>
      运行代码
    </Button>
  )

  const codeEditor = (
    <AceEditor
      onChange={setInput}
      fontSize="1em"
      width="100%"
      mode="python"
      theme={isDarkMode ? 'monokai' : 'github'}
      lineHeight="1.6em"
      minLines={12}
      maxLines={24}
      defaultValue={value}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  )

  const font = '"Consolas", "Courier New", monospace'

  const outputDisplay = (
    <div className="mt-4 rounded-xl border-[1px] border-blue-100 bg-blue-50 p-4 text-base text-blue-500">
      {output.split('\n').map((text, i) => (
        <p key={i} className="sandbox-output" style={{ fontFamily: font }}>
          {text}
        </p>
      ))}
    </div>
  )

  const errorDisplay = (
    <div className="mt-4 rounded-xl border-[1px] border-red-100 bg-red-50 p-4 text-base text-red-500">
      {error.split('\n').map((text, i) => (
        <p key={i} className="sandbox-output" style={{ fontFamily: font }}>
          {text}
        </p>
      ))}
    </div>
  )

  return (
    <>
      <br />
      <Card title={title} extra={runCodeButton}>
        <div className="flex flex-col">
          {codeEditor}
          {output ? outputDisplay : null}
          {error ? errorDisplay : null}
        </div>
      </Card>
    </>
  )
}
