import React from 'react'
import Reflux from 'reflux'
import Router from 'react-router'

import TodoActions from './TodoActions'
import todoListStore from './TodoListStore'
import TodoItem from './TodoItem.jsx'

var RouteHandler = Router.RouteHandler

export default React.createClass({

	displayName: 'App',

	mixins: [ Reflux.connect(todoListStore) ],

	handleValueChange(e) {
		let { which, target: { value } } = e

		if (which === 13 && value) { // hit enter
			TodoActions.addItem(value)
			e.target.value = ''
		} else if (which === 27) { // hit escape does not work on Chrome
			e.target.value = ''
		}
	},

	getTodoItems() {
		return this.state.tasks.map(todo => <TodoItem key={ todo.id } todo={ todo } />)
	},

	render() {
		return (
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<div className='intro'>
						<div className='webpack-logo'></div>
						<h3>Todo App build with React.js and Reflux</h3>
					</div>
					<div className='todo-input-container input-group'>
						<span className='input-group-addon' id='basic-addon2'>I need to:</span>
						<input ref='todo' type='text' placeholder='create an awesome todo task...' autoFocus onKeyUp={ this.handleValueChange } className='form-control' />
					</div>

					<RouteHandler { ...this.state } />
				</div>
			</div>
		)
	}
})
