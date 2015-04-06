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
		this.list.push({ id: shortid.generate(), text, complete: false })
		this.emitChange()
	},

	onRemoveItem(id) {
		this.list = this.list.filter((todo) => todo.id !== id)
		this.emitChange()
	},

	onToggleCompleteItem(id) {
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
