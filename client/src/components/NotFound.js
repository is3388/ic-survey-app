import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <div className='content-center'>
                <div>
                    <h1 className='content-center font-bold'>
                        Oops!
                    </h1>
                    <p className='content-center not-found'>
                        404 - Page Not Found
                    </p>
                    <Link className='btn btn-lg red content-center' to='/'>
                    <i className="material-icons left">home</i>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound