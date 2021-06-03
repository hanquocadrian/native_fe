import React from 'react'
import { Link } from 'react-router-dom';

import './Error.css';

export default function Error() {
    return (
        <div className="error-page-admin">
            <div className="mainbox">
                <div className="err">4</div><span style={{ position:'relative', bottom: '-110px', display: 'block' }}><i className="far fa-question-circle fa-spin" /></span><div className="err2">4</div>
                <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to="/admin/home">home</Link> and try from there.</p></div>
            </div>        
        </div>

    )
}
