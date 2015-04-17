import React from 'react'
import classnames from 'classnames'
import TodoActions from './TodoActions'

var todoAnimations = {
	ENTER: { scale: 0, opacity: 0, ease: window.Elastic.easeOut.config(1, 0.75) },
	OUT: { scale: 0, opacity: 0, ease: window.Sine.easeIn },
	COMPLETED: { backgroundColor: '#eee', ease: window.Sine.easeIn },
	UNCOMPLETED: { backgroundColor: '#fff', ease: window.Sine.easeOut }
}

export default React.createClass({

	displayName: 'TodoItem',

	propTypes: {
		todo: React.PropTypes.object
	},

	getInitialState() {
		return { todo: {} }
	},

	getDefaultProps() {
		return { todo: {} }
	},

	componentWillMount() {
		this.setState({ todo: this.props.todo })
	},

	componentDidMount() {
		if (this.state.todo.new) {
			window.TweenMax.from(this.getDOMNode(), .5, todoAnimations.ENTER, .25)
			this.state.todo.new = false
		}
	},

	removeItem() {
		todoAnimations.OUT.onComplete = () => TodoActions.removeItem(this.state.todo.id)

		window.TweenMax.to(this.getDOMNode(), .25, todoAnimations.OUT, .25)
	},

	toggleComplete() {
		let { id, complete } = this.state.todo

		if (complete) {
			todoAnimations.UNCOMPLETED.onComplete = () => TodoActions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, todoAnimations.UNCOMPLETED)
		} else {
			todoAnimations.COMPLETED.onComplete = () => TodoActions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, todoAnimations.COMPLETED)
		}
	},

	updateEditInput(e) {
		let { todo } = this.state
		todo.text = e.currentTarget.value
		this.setState({ todo })
		if (e.which === 13) { //enter
			this._saveAndCloseEdit()
		}
	},

	editItem() {
		this.refs.todoItem.getDOMNode().classList.remove('edit')
		TodoActions.updateItem(this.state.todo)
	},

	doubleClickHandler(e) {
		e.currentTarget.classList.add('edit')
	},

	render() {
		var { todo: { id, text, complete } } = this.state
		var todoClasses = classnames('list-group-item', 'todo-item-container', { complete })

		return (
			<li ref='todoItem' className={ todoClasses } data-id={ id } onDoubleClick={ this.doubleClickHandler }>
				<div className='todo-item'>
					<div className='checkbox'>
						<label>
							<input type='checkbox' onChange={ this.toggleComplete } checked={ complete } value='todoItem' />
						</label>
					</div>
					<span className='text'>{ text }</span>
					<button className='btn-xs close' onClick={ this.removeItem }>
						<span className=''>&times;</span>
					</button>
				</div>
				<div className='edit-todo-item input-group'>
					<input type='text' className='form-control' onKeyUp={ this.updateEditInput } defaultValue={ text }/>
					<span className='input-group-btn'>
						<button className='btn btn-default' type='button' onClick={ this.editItem }>Save</button>
					</span>
				</div>
			</li>
		)
	},

	_saveAndCloseEdit() {
		console.log('Save and close edit', this.state.todo)
	}
})
