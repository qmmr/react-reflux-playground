import React from 'react'
import Reflux from 'reflux'

var TodoActions = Reflux.createActions([
	'addItem',
	'removeItem',
	'toggleItem'
])

var todoListStore = Reflux.createStore({

	listenables: TodoActions,

	init() {
		this.list = [
			{ text: 'Buy milk' },
			{ text: 'Wash the dishes' }
		]
	},

	onAddItem(text) {
		// console.log('Marcin :: onAddItem', text, this.list)

		this.list.push({ text })
		// console.log('Marcin :: push', this.list)

		this.trigger({ tasks: this.list })
	},

	onRemoveItem(item) {
		console.log('Marcin :: onRemoveItem', item)
	},

	onToggleItem(item) {
		console.log('Marcin :: onToggleItem', item)
	},

	getInitialState() {
		// this.list = []

		return { tasks: this.list }
	}

})

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

		return tasks.map((todo, idx) => {
			return <li className='list-group-item' key={ idx }>
				<div className='checkbox'>
					<label>
						<input type='checkbox' value='todoItem' />
					</label>
				</div>
				{ todo.text }
			</li>
		})
	},

	render() {
		return (
			<div className='row'>
				<div className='jumbotron'>
					<div className='input-group'>
						<span className='input-group-addon' id='basic-addon2'>I need to:</span>
						<input ref='todo' type='text' placeholder='create an awesome todo task...' autoFocus onKeyUp={ this.handleValueChange } className='form-control' />
					</div>
				</div>
				<div className='col-sm-12'>
					<h1>Todo list:</h1>
					<ul className='list-group'>
						{ this.getTodoItems() }
					</ul>
				</div>
			</div>
		)
	}
})
