import React from 'react'
import classnames from 'classnames'
import TodoActions from './TodoActions'

export default React.createClass({

	getDefaultProps() {
		return {
			todo: {}
		}
	},

	componentDidMount() {
		let { delay } = this.props
		// TweenMax.from(this.getDOMNode(), 0.5, { 'opacity': '0', ease: Quad.easeInOut, delay })

	},

	removeItem() {
		TodoActions.removeItem(this.props.todo.id)
	},

	toggleComplete() {
		TodoActions.toggleCompleteItem(this.props.todo.id)
	},

	render() {
		var { todo, todo: { complete } } = this.props
		var todoClasses = classnames('list-group-item', { 'complete': complete })

		return (
			<li className={ todoClasses } data-id={ todo.id } key={ todo.id }>
				<div className='checkbox'>
					<label>
						<input type='checkbox' onChange={ this.toggleComplete } checked={ todo.complete } value='todoItem' />
					</label>
				</div>
				{ todo.text }
				<button className='btn-xs btn-danger btn-remove' onClick={ this.removeItem }>
					<span className='glyphicon glyphicon-remove'></span>
				</button>
			</li>
		)
	}
})
