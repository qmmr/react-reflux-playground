import React from 'react'
import Reflux from 'reflux'
import Router from 'react-router'

import Actions from './Actions'
import Store from './Store'

export default React.createClass({

	displayName: 'App',

	mixins: [ Reflux.connect(Store) ],

	handleValueChange(e) {
		let { which, target: { value } } = e

		if (which === 13 && value) { // hit enter
			Actions.addItem(value)
			e.target.value = ''
		} else if (which === 27) { // hit escape does not work on Chrome
			e.target.value = ''
		}
	},

	render() {
		return (
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<div className='intro'>
						<div className='intro__logo'></div>
						<h3>Todo App build with React.js and Reflux</h3>
					</div>
					<div className='input-group new-item'>
						<span className='input-group-addon'>I need to:</span>
						<input className='form-control' ref='newItem' type='text' autoFocus
								placeholder='do something amazing today!' onKeyUp={ this.handleValueChange } />
					</div>

					<Router.RouteHandler { ...this.state } />
				</div>
			</div>
		)
	}
})
