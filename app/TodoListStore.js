import Reflux from 'reflux'
import shortid from 'shortid'

import TodoActions from './TodoActions'

export default Reflux.createStore({

	listenables: TodoActions,

	init() {
		this.list = [
			{ id: shortid.generate(), text: 'Buy milk' },
			{ id: shortid.generate(), text: 'Wash the dishes' }
		]
	},

	onAddItem(text) {
		// console.log('Marcin :: onAddItem', text, this.list)

		this.list.push({ id: shortid.generate(), text })
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
