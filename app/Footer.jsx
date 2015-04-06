import React from 'react'

export default React.createClass({

	displayName: 'TodoAppFooter',

	getDefaultProps() {
		return {
			todos: []
		}
	},

	getItemsCount() {
		return this.props.todos.length
	},

	getCompletedCount() {
		return this.props.todos.filter(item => item.complete === true).length
	},

	render() {
		return (
			<div className='panel-footer'>
				<ul className='nav nav-pills'>
					<li className='active'>
						<a href='#all'>all:&nbsp;<span className='badge'>{ this.getItemsCount() }</span></a>
					</li>
					<li className=''>
						<a href='#completed'>completed:&nbsp;<span className='badge'>{ this.getCompletedCount() }</span></a>
					</li>
				</ul>
			</div>
		)
	}

})
