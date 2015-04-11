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

	componentDidMount() {
		let { children } = this.refs.todoList.getDOMNode()
		TweenMax.staggerFrom(children, .5, { scale: 0, opacity: 0, ease: Elastic.easeOut.config(1, 0.75) }, 0.25)
	},

	render() {
		return (
			<main className='panel panel-default'>
				<div className='panel-heading'>
					<h3 className='panel-title'>Todo list:</h3>
				</div>
				<div className='panel-body'>
					<ul ref='todoList' className='todo-list list-group'>
						{ this.getTodoItems() }
					</ul>
				</div>
			</main>
		)
	}
})
