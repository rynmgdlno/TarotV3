import React from 'react'

import './editor.styles.scss'
import '@reach/slider/styles.css'

const Editor = ({ id, red, green, blue, sliderChange, updateActiveColor }) => {
  return (
    <div className='editor'>
      <div className='editor-pane'>
        <div className='slider'>
          {/* <p className='slider-label'>R:</p> */}
          <input className='slider-input si-red' colorid={id} type='text' name='red' value={red} onChange={sliderChange} />
          <input className='editor-slider es-red' colorid={id} name='red' type='range' value={red} min='0' max='255' onChange={sliderChange} />
        </div>
        <div className='slider'>
          {/* <p className='slider-label'>G:</p> */}
          <input className='slider-input si-green' colorid={id} type='text' name='green' value={green} onChange={sliderChange} />
          <input className='editor-slider es-green' colorid={id} name='green' type='range' value={green} min='0' max='255' onChange={sliderChange} />
        </div>
        <div className='slider'>
          {/* <p className='slider-label'>B:</p> */}
          <input className='slider-input si-blue' colorid={id} type='text' name='blue' value={blue} onChange={sliderChange} />
          <input className='editor-slider es-blue' colorid={id} name='blue' type='range' value={blue} min='0' max='255' onChange={sliderChange} />
        </div>
      </div>
    </div>
  )
}

export default Editor;
