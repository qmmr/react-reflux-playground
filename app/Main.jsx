import React from 'react'
import Reflux from 'reflux'

import TodoActions from './TodoActions'
import todoListStore from './TodoListStore'

import TodoItem from './TodoItem.jsx'

export default React.createClass({

	displayName: 'Main',

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
		const ANIMATION_DELAY = 0.25
		var { tasks } = this.state

		return tasks.map((todo, idx) => <TodoItem key={ todo.id } delay={ idx * ANIMATION_DELAY } todo={ todo } />)
	},

	render() {
		return (
			<main className='panel panel-default'>
				<div className='panel-heading'>
					<h3 className='panel-title'>Todo list:</h3>
				</div>
				<div className='panel-body'>
					<ul className='todo-list list-group'>
						{ this.getTodoItems() }
					</ul>
				</div>
			</main>
		)
	}
})
