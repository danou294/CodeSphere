// ConnectedCodeTab.jsx (Design identique à CodeTab d'origine)
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Editor from '@monaco-editor/react'
import { updateCode } from '../../../projectStore' // Utilisation de l'action updateCode

export default function ConnectedCodeTab({ lang }) {
  const dispatch = useDispatch()
  const code = useSelector((state) => state.project[lang])

  function handleEditorChange(value) {
    dispatch(updateCode({ lang, value }))
  }

  return (
    <Editor
      value={code}
      language={lang}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: true },
        contextmenu: false,
        automaticLayout: true,
      }}
      onChange={handleEditorChange}
      className="h-full w-full"
    />
  )
}
