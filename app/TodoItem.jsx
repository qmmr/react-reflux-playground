import React from 'react'

export default React.createClass({
	getDefaultProps() {
		return {
			todo: {}
		};
	},

	removeItem(e) {
		console.log('Marcin :: id', this.props.todo.id)
	},

	render() {
		var { todo } = this.props

		return (
			<li className='list-group-item' data-id={ todo.id } key={ todo.id }>
				<div className='checkbox'>
					<label>
						<input type='checkbox' value='todoItem' />
					</label>
				</div>
				{ todo.text }
				<button onClick={ this.removeItem }>
					<span className='glyphicon glyphicon-remove'></span>
				</button>
			</li>
		)
	}
})
