import React from 'react'
import classnames from 'classnames'
import Actions from './Actions'

var taskAnimations = {
	ENTER: { scale: 0, opacity: 0, ease: window.Elastic.easeOut.config(1, 0.75) },
	OUT: { scale: 0, opacity: 0, ease: window.Sine.easeIn },
	COMPLETED: { backgroundColor: '#eee', ease: window.Sine.easeIn },
	UNCOMPLETED: { backgroundColor: '#fff', ease: window.Sine.easeOut }
}

export default React.createClass({

	displayName: 'Item',

	propTypes: {
		task: React.PropTypes.object
	},

	getInitialState() {
		return { task: {} }
	},

	getDefaultProps() {
		return { task: {} }
	},

	componentWillMount() {
		this.setState({ task: this.props.task })
	},

	componentDidMount() {
		if (this.state.task.new) {
			window.TweenMax.from(this.getDOMNode(), .5, taskAnimations.ENTER, .25)
			this.state.task.new = false
		}
	},

	removeItem() {
		taskAnimations.OUT.onComplete = () => Actions.removeItem(this.state.task.id)

		window.TweenMax.to(this.getDOMNode(), .25, taskAnimations.OUT, .25)
	},

	toggleComplete() {
		let { id, complete } = this.state.task

		if (complete) {
			taskAnimations.UNCOMPLETED.onComplete = () => Actions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, taskAnimations.UNCOMPLETED)
		} else {
			taskAnimations.COMPLETED.onComplete = () => Actions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, taskAnimations.COMPLETED)
		}
	},

	updateEditInput(e) {
		let { task } = this.state
		task.text = e.currentTarget.value
		this.setState({ task })
		if (e.which === 13) { //enter
			this.editItem()
		}
	},

	editItem() {
		this.refs.todoItem.getDOMNode().classList.remove('item--edit')
		Actions.updateItem(this.state.task)
	},

	doubleClickHandler(e) {
		e.currentTarget.classList.add('item--edit')
	},

	render() {
		var { task: { id, text, complete } } = this.state
		var todoClasses = classnames('list-group-item', 'item', { complete })

		return (
			<li ref='todoItem' className={ todoClasses } data-id={ id } onDoubleClick={ this.doubleClickHandler }>
				<div className='item__view'>
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
<<<<<<< HEAD
				<div className='edit-todo-item input-group'>
					<input type='text' className='form-control' autoFocus onKeyUp={ this.updateEditInput } defaultValue={ text }/>
=======
				<div className='item__edit input-group'>
					<input type='text' className='form-control' onKeyUp={ this.updateEditInput } defaultValue={ text }/>
>>>>>>> cd9f7b2... Add postcss with cssnext and other plugins, disable stylus
					<span className='input-group-btn'>
						<button className='btn btn-default' type='button' onClick={ this.editItem }>Save</button>
					</span>
				</div>
			</li>
		)
	}

})
