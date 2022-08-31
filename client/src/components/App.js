import React, { useEffect } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Header from './Header'
import Landing from './Landing'
import { fetchUser } from '../actions'
import { useDispatch } from 'react-redux'
import Dashboard from './Dashboard'

const SurveyNew = () => <h2>Survey New</h2>

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
                    <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/surveys' component={Dashboard} />
                    <Route path='/surveys/new' component={SurveyNew} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App