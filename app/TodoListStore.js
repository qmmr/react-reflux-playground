import Reflux from 'reflux'
import shortid from 'shortid'

import TodoActions from './TodoActions'

export default Reflux.createStore({

	listenables: TodoActions,

	init() {
		this.list = [
			{ id: shortid.generate(), text: 'Buy milk', complete: false },
			{ id: shortid.generate(), text: 'Wash the dishes', complete: true }
		]
	},

	onAddItem(text) {
		// console.log('Marcin :: onAddItem', text, this.list)

		this.list.push({ id: shortid.generate(), text, complete: false })
		// console.log('Marcin :: push', this.list)

		this.emitChange()
	},

	onRemoveItem(id) {
		console.log('Marcin :: onRemoveItem', id)
		this.list = this.list.filter((todo) => todo.id !== id)
		this.emitChange()
	},

	onToggleCompleteItem(id) {
		console.log('Marcin :: onToggleCompleteItem', id)
		this.list = this.list.map(todo => {
			if (todo.id === id) {
				todo.complete = !todo.complete
			}

			return todo
		})
		this.emitChange()
	},

	emitChange() {
		this.trigger({ tasks: this.list })
	},

	getInitialState() {
		// this.list = []

		return { tasks: this.list }
	}

})
