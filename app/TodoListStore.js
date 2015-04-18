import Reflux from 'reflux'
import shortid from 'shortid'

import TodoActions from './TodoActions'

export default Reflux.createStore({

	listenables: TodoActions,

	init() {
		this.list = [
			{ id: shortid.generate(), new: false, text: 'Buy milk', complete: false },
			{ id: shortid.generate(), new: false, text: 'Wash the dishes', complete: true },
			{ id: shortid.generate(), new: false, text: 'Find new place to rent', complete: true },
			{ id: shortid.generate(), new: false, text: 'Learn more about Reflux', complete: false }
		]
	},

	onAddItem(text) {
		this.list.push({ id: shortid.generate(), new: true, text, complete: false })
		this.emitChange()
	},

	onUpdateItem({ id, text }) {
		this.list.forEach(todo => {
			if (todo.id === id) {
				todo.text = text
			}
		})
		this.emitChange()
	},

	onRemoveItem(id) {
		this.list = this.list.filter(todo => todo.id !== id)
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
		return { tasks: this.list }
	}

})
