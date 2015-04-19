import React from 'react'
import Router from 'react-router'

import App from './App.jsx'
import Main from './Main.jsx'

require('./css/bootstrap-lumen.css')
require('./css/main.css')

var Route = Router.Route

var routes = (
	<Route name='app' path='/' handler={ App }>
		<Route name='all' path='/' handler={ Main } />
		<Route name='complete' path='/complete' handler={ Main } />
		<Route name='active' path='/active' handler={ Main } />
		<Router.DefaultRoute handler={ Main } />
	</Route>
)

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.querySelector('#container'))
})
