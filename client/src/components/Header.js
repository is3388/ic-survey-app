import React from 'react'
import { useSelector } from 'react-redux'

function Header () {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    const renderContent = () => {
        switch (auth) {
            case null:
                return 
            case false:
                return (<li><a href='/auth/google'>Login With Google</a></li>)
            default:
                return (<li><a href='/#'>Logout</a></li>)
        }
    }
    return (
        <nav>
            <div className='nav-wrapper'>
                <div className="row">
                    <div className="col s12" style={{background: '#e76b50'}}>
                        <a href='/#' className='left brand-logo'>Email Survey</a>
                            <ul className='right'>
                                {renderContent()}
                            </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header