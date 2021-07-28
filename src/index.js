import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { App } from './components/App'

/**
 * This is what is displayed in the header bar
 */
const appName = 'MC-COD'

const rootElement = document.getElementById('root')

ReactDOM.render(<App appName={appName} />, rootElement)

serviceWorker.unregister()
