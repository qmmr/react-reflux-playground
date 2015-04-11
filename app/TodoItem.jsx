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

	getDefaultProps() {
		return {
			todo: {}
		}
	},

	componentDidMount() {
		if (this.props.todo.new) {
			window.TweenMax.from(this.getDOMNode(), .5, todoAnimations.ENTER, .25)
			this.props.todo.new = false
		}
	},

	removeItem() {
		todoAnimations.OUT.onComplete = () => TodoActions.removeItem(this.props.todo.id)

		window.TweenMax.to(this.getDOMNode(), .25, todoAnimations.OUT, .25)
	},

	toggleComplete() {
		let { id, complete } = this.props.todo

		if (complete) {
			todoAnimations.UNCOMPLETED.onComplete = () => TodoActions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, todoAnimations.UNCOMPLETED)
		} else {
			todoAnimations.COMPLETED.onComplete = () => TodoActions.toggleCompleteItem(id)
			window.TweenMax.to(this.getDOMNode(), .15, todoAnimations.COMPLETED)
		}
	},

	render() {
		var { todo, todo: { complete } } = this.props
		var todoClasses = classnames('list-group-item', { 'complete': complete })

		return (
			<li className={ todoClasses } data-id={ todo.id }>
				<div className='checkbox'>
					<label>
						<input type='checkbox' onChange={ this.toggleComplete } checked={ todo.complete } value='todoItem' />
					</label>
				</div>
				{ todo.text }
				<button className='btn-xs close' onClick={ this.removeItem }>
					<span className=''>&times;</span>
				</button>
			</li>
		)
	}
})
