import React from 'react'
import Router from 'react-router'

import App from './App.jsx'
import Main from './Main.jsx'

var Route = Router.Route
var DefaultRoute = Router.DefaultRoute

var routes = (
	<Route name='app' path='/' handler={ App }>
		<Route name='all' path='/' handler={ Main } />
		<Route name='completed' path='/completed' handler={ Main } />
		<Route name='active' path='/active' handler={ Main } />
		<DefaultRoute handler={ Main } />
	</Route>
)

Router.run(routes, function(Handler) {
	React.render(<Handler />, document.querySelector('#container'))
})
