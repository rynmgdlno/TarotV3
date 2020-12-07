import React from 'react'

import ColorResult from '../color-result/color-result';

import './result-pane.styles.scss'

const ResultPane = ({ data, pushColor }) => {
    return (
        <div className='result-container'>
            {data.map((color) => (
                <div key={color.id} className='color-result-container'>
                    <ColorResult id={color.id} red={color.red} green={color.green} blue={color.blue} hex={color.hex} pushColor={pushColor}/>
                </div>
            ))}
        </div>
    )
}

export default ResultPane