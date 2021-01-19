import React from 'react';
import {Link} from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button'

import './splash.scss';

const Splash = () => {
    return (
        <div className="splash">
            <h2 className='splash-title'>Welcome to <span className='title'>Tarot</span>, the keyword based color pallette generator.</h2>
            <Link to='/tarot'><CustomButton className='custom-button splash-button'><p>Start Tarot</p></CustomButton></Link>
            {/* <Link to='/help'><CustomButton className='custom-button splash-button' disabled={true}><p>Take a quick tour</p></CustomButton></Link> */}
        </div>
    )
}

export default Splash;