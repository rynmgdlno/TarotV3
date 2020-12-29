import React from 'react';
import {Link} from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button'

import './splash.scss';

const Splash = () => {
    return (
        <div className="splash">
            <h1>Welcome to Tarot, the keyword based color pallette generator.</h1>
            <Link to='/tarot'><CustomButton className='custom-button splash-button'><p>Start Tarot</p></CustomButton></Link>
            <Link to='/help'><CustomButton className='custom-button splash-button'><p>Take a quick tour</p></CustomButton></Link>
        </div>
    )
}

export default Splash;