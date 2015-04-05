import React from 'react'
import Reflux from 'reflux'

import TodoActions from './TodoActions'
import todoListStore from './TodoListStore'
import TodoItem from './TodoItem.jsx'

export default React.createClass({

	mixins: [
		Reflux.connect(todoListStore)
		// Reflux.listenTo(todoListStore, [ 'onAddItem' ])
	],

	onAddItem(todos) {
		console.log('Marcin :: onAddItem', todos)
	},

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

		return tasks.map((todo) => <TodoItem todo={ todo } />)
	},

	render() {
		return (
			<div className='row'>
				<div className='col-sm-8 col-sm-offset-2'>
					<div className='input-group'>
						<span className='input-group-addon' id='basic-addon2'>I need to:</span>
						<input ref='todo' type='text' placeholder='create an awesome todo task...' autoFocus onKeyUp={ this.handleValueChange } className='form-control' />
					</div>
					<h1>Todo list:</h1>
					<ul className='list-group'>
						{ this.getTodoItems() }
					</ul>
				</div>
			</div>
		)
	}
})
