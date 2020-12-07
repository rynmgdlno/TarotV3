import React, { useState } from 'react'
import Color from 'color';

import Editor from '../editor/editor'
import CustomButton from '../custom-button/custom-button'
import EditorIcon from '../icons/icon-components/editor.icon';

import './color-comp.styles.scss'
import './indicator-animate.css'
import './animate-editor.css'

const ColorComp = ({ id, red, green, blue, hex, activeColor, updateActiveColor, editorHasOpened, sliderChange, composerPaneToggle }) => {

  const BGcolorValue = Color.rgb(parseInt(red), parseInt(green), parseInt(blue))
  const BGColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  const foreColor = BGcolorValue.isLight() ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'
  const hexStyle = { color: foreColor }
  const indicatorStyle = { backgroundColor: foreColor }
  const iconFillStyle = { fill: foreColor }

  const [visibilityClass, setVisibilityClass] = useState('')

  const onAnimationEnd = (e) => {
    if (e.animationName === 'editor-animate-return') {
      setVisibilityClass('animation-end')
    } else {
      setVisibilityClass('')
    }
  }

  return (
    <div className='color-comp' style={BGColor} onClick={() => {
      updateActiveColor(id)
      composerPaneToggle(id) 
    }}>
      <div onAnimationEnd={onAnimationEnd} className={
        !editorHasOpened.includes(id) ? 'editor-container-initial' :
          activeColor === id ? 'editor-container editor-animate' :
            `editor-container editor-animate-return ${visibilityClass}`
      }>
        <Editor id={id} red={red} green={green} blue={blue} sliderChange={sliderChange} updateActiveColor={updateActiveColor} />
      </div>
      <div className={
        !editorHasOpened.includes(id) ? 'indicator-initial editor-indicator-container' :
          activeColor === id ? 'indicator-animate editor-indicator-container' :
            'indicator-animate-return editor-indicator-container'
      }>
        <p className='hex-indicator' style={hexStyle}>#{hex.toUpperCase()}</p>
        <div className='editorIndicator' style={indicatorStyle} />
      </div>
      {/* <CustomButton
        onClick={() => {
          updateActiveColor(id)
          composerPaneToggle(id) 
        }}
        className='editor-button'
        style={iconFillStyle}><EditorIcon /></CustomButton> */}

    </div>
  )
}


export default ColorComp;