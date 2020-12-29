import React, { useState } from 'react'
import Color from 'color';

import Editor from '../editor/editor'
import ArrowIcon from '../icons/icon-components/arrow.icon'

import './color-comp.styles.scss'
import './indicator-animate.css'
import './animate-editor.css'

const ColorComp = ({
  id,
  red,
  green,
  blue,
  hex,
  activeColor,
  updateActiveColor,
  editorHasOpened,
  sliderChange,
  composerPaneToggle,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  swipeDelta
}) => {
  const [visibilityClass, setVisibilityClass] = useState('')
  const BGcolorValue = Color.rgb(parseInt(red), parseInt(green), parseInt(blue))
  const BGColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  const foreColor = BGcolorValue.isLight() ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'
  const hexStyle = { color: foreColor }
  const indicatorStyle = { backgroundColor: foreColor }

  const onAnimationEnd = (e) => {
    if (e.animationName === 'editor-animate-return') {
      setVisibilityClass('animation-end')
    } else {
      setVisibilityClass('')
    }
  }

  return (
    <div className='color-comp' style={BGColor}>
      <div className={
        id === 0 ? 'arrow-left' : 
        id === 4 ? 'arrow-right' :
        'arrow-hidden'
      }>
        <ArrowIcon />
      </div>
      <div
        className='invisible-button'
        onClick={
          !swipeDelta ? () =>
            updateActiveColor(id) : null
        }
        onTouchStart={e => handleTouchStart(e)}
        onTouchMove={e => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <div className={
          !editorHasOpened.includes(id) ? 'indicator-initial editor-indicator-container' :
            activeColor === id ? 'indicator-animate editor-indicator-container' :
              'indicator-animate-return editor-indicator-container'
        }>
          <p className='hex-indicator' style={hexStyle}>#{hex.toUpperCase()}</p>
          <div className='editorIndicator' style={indicatorStyle} />
        </div></div>
      <div onAnimationEnd={onAnimationEnd} className={
        !editorHasOpened.includes(id) ? 'editor-container-initial' :
          activeColor === id ? 'editor-container editor-animate' :
            `editor-container editor-animate-return ${visibilityClass}`
      }>
        <Editor id={id} red={red} green={green} blue={blue} sliderChange={sliderChange} updateActiveColor={updateActiveColor} />

      </div>

    </div>
  )
}


export default ColorComp;