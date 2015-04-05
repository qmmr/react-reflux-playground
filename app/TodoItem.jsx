import React from 'react'
import classnames from 'classnames'
import TodoActions from './TodoActions'

export default React.createClass({

	getDefaultProps() {
		return {
			todo: {}
		};
	},

	removeItem(e) {
		console.log('Marcin :: id', this.props.todo.id)
		TodoActions.removeItem(this.props.todo.id)
	},

	render() {
		var { todo, todo: { complete } } = this.props
		var todoClasses = classnames('list-group-item', { 'complete': complete })

		return (
			<li className={ todoClasses } data-id={ todo.id } key={ todo.id }>
				<div className='checkbox'>
					<label>
						<input type='checkbox' value='todoItem' />
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
