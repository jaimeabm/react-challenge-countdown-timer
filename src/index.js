import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import 'normalize.css/normalize.css'
import '../css/main.css';

//WARNING: JavaScript counts months from 0 to 11.

var countdownDate = new Date(2020, 11, 31, 0, 0, 0, 0).getTime()
window.React = React
render(
    <App countdownDate={countdownDate}/>,
    document.getElementById('react-container')
)
