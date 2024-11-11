// ConnectedTabs.jsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ConnectedButtonTab from './ConnectedButtonTab'
import ConnectedCodeTab from './ConnectedCodeTab'
import ConnectedPreview from './ConnectedPreview'
import ConnectedPreviewButton from './ConnectedPreviewButton'
import ConnectedSaveButton from './ConnectedSaveButton'
import HtmlIcon from '../../../assets/html.svg'
import CssIcon from '../../../assets/css.svg'
import JsIcon from '../../../assets/js.svg'

export default function ConnectedTabs() {
  const tabs = [
    { id: 1, lang: 'html', buttonContent: 'HTML', imgURL: HtmlIcon },
    { id: 2, lang: 'css', buttonContent: 'CSS', imgURL: CssIcon },
    { id: 3, lang: 'javascript', buttonContent: 'JavaScript', imgURL: JsIcon },
  ]
  const [currentTab, setCurrentTab] = useState(tabs[0].id)
  const previewVisible = useSelector((state) => state.project.previewVisible)

  return (
    <div className="flex h-full">
      <div className="w-48 p-4 bg-gray-700 flex flex-col items-start space-y-4">
        {/* Boutons de langage de code */}
        {tabs.map((tab) => (
          <ConnectedButtonTab
            key={tab.id}
            id={tab.id}
            toggleTab={setCurrentTab}
            imgURL={tab.imgURL}
            buttonContent={tab.buttonContent}
            isActive={tab.id === currentTab}
          />
        ))}
        <hr className="w-full my-2 border-gray-500" />
        {/* Bouton de prévisualisation */}
        <ConnectedPreviewButton />
        <hr className="w-full my-2 border-gray-500" />
        {/* Bouton de sauvegarde */}
        <ConnectedSaveButton />
      </div>
      <div className="flex-grow">
        {previewVisible ? (
          <ConnectedPreview />
        ) : (
          <ConnectedCodeTab
            lang={tabs.find((tab) => tab.id === currentTab).lang}
          />
        )}
      </div>
    </div>
  )
}
