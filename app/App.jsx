import React from 'react'
import Reflux from 'reflux'

import TodoActions from './TodoActions'
import todoListStore from './TodoListStore'

import TodoItem from './TodoItem.jsx'
import Footer from './Footer.jsx'

import Router from 'react-router'
var RouteHandler = Router.RouteHandler

export default React.createClass({

	displayName: 'App',

	mixins: [ Reflux.connect(todoListStore) ],

	handleValueChange(e) {
		var text = e.target.value
		// console.log('Marcin :: todo.text', text)
		if (e.which === 13 && text) { // hit enter
			TodoActions.addItem(text)
			e.target.value = ''
		} else if (e.which === 27) { // hit escape
			e.target.value = ''
		}
	},

	getTodoItems() {
		var { tasks } = this.state

		return tasks.map((todo) => <TodoItem key={ todo.id } todo={ todo } />)
	},

	render() {
		return (
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<div className='todo-input-container input-group'>
						<span className='input-group-addon' id='basic-addon2'>I need to:</span>
						<input ref='todo' type='text' placeholder='create an awesome todo task...' autoFocus onKeyUp={ this.handleValueChange } className='form-control' />
					</div>

					<RouteHandler { ...this.state } />

					<Footer { ...this.state } />
				</div>
			</div>
		)
	}
})
