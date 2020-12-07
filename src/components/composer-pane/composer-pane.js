import React, { useState } from 'react'
import ColorComp from '../color-comp/color-comp.js'

import './composer-pane.styles.scss'
import './composer-pane-animate.css'

const newEditorHistoryArray = []

const ComposerPane = ({data, sliderChange}) => {
  const [activeColor, setActiveColor] = useState('')
  const [editorHasOpened, setEditorHasOpened] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [composerInitialClass, setComposerInitialClass] = useState('composer-container')

  const updateActiveColor = (id) => {
    const newActiveEditor = data.find((color) => color.id === id)
    newActiveEditor.id === activeColor ? setActiveColor(null) : setActiveColor(newActiveEditor.id)
    if (!editorHasOpened.includes(id)) {
      newEditorHistoryArray.push(id)
      setEditorHasOpened(newEditorHistoryArray)
    }
    setComposerInitialClass('composer-pane-animate-return')
    // console.log(id)
  }

  const composerPaneToggle = (id) => {
    isActive && activeColor === id ? setIsActive(false) : setIsActive(true)
  }

  return (
    <div className={isActive ? 'composer-pane-animate' : `${composerInitialClass}`}>
      {data.map((color) => (
        <div key={color.id} className='composer-fix'>
          <div className="color-comp-container">
            <ColorComp
              id={color.id}
              red={color.red}
              green={color.green}
              blue={color.blue}
              hex={color.hex}
              updateActiveColor={updateActiveColor}
              activeColor={activeColor}
              editorHasOpened={editorHasOpened}
              setEditorHasOpened={setEditorHasOpened}
              sliderChange={sliderChange}
              composerPaneToggle={composerPaneToggle}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ComposerPane