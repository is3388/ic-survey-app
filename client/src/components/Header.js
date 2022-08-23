import React from 'react'

function Header () {
    return (
        <nav>
            <div className='nav-wrapper'>
                <div className="row">
                    <div className="col s12" style={{background: '#e76b50'}}>
                        <a href='/#' className='left brand-logo'>Email Survey</a>
                            <ul className='right'>
                                <li>
                                    <a href='/#'>Login With Google</a>
                                </li>
                            </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header