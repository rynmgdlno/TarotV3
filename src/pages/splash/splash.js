import React from 'react';
import {Link} from 'react-router-dom';

import './splash.css';

const Splash = () => {
    return (
        <div className="splash">
            <h2 className="medFont">Welcome to <span className="bigFont">Tarot.</span> The keyword based color pallette generator.</h2>
            <Link to='/signin'><h2 className="bigFont">Sign in</h2></Link>
            <h2 className="medFont">Or tap below to get started!</h2>
            <Link to='/tarot'><h1 className="bigFont splashTitle">TAROT</h1></Link>
        </div>
    )
}

export default Splash;