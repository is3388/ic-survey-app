import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

function Header () {
    const auth = useSelector(state => state.auth)
    console.log(auth)

    const renderContent = () => {
        switch (auth) {
            case null:
                return 
            case false:
                return (
                        <li><a href='/auth/google'>Login With Google</a></li>
                        )
            default:
                return (
                        <>
                        <li><Payments /></li>
                        <li><a href='/auth/api/logout'>Logout</a></li>
                        </>
                        )
            /*default:
                return <li><a onClick={()=>dispatch(logoutUser())}>Log Out</a></li>*/
        }
    }

    return (
        <nav>
            <div className='nav-wrapper'>
                <div className="row">
                    <div className="col s12 primary-color">
                        <Link to={auth ? '/surveys' : '/'} className='left brand-logo' style={{paddingLeft:'1rem'}}>Email Survey</Link>
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