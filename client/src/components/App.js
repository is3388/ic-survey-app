import React, { useEffect } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from './Header'
import { fetchUser } from '../actions'
import { useDispatch } from 'react-redux'
 
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survey New</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
         // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/surveys' component={Dashboard} />
                    <Route path='/surveys/new' component={SurveyNew} />
                    
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App