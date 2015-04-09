import React from 'react'
import Router from 'react-router'

var Link = Router.Link

export default React.createClass({

	displayName: 'TodoAppFooter',

	getDefaultProps() {
		return {
			tasks: []
		}
	},

	getItemsCount() {
		return this.props.tasks.length
	},

	getCompletedCount() {
		return this.props.tasks.filter(item => item.complete === true).length
	},

	getActiveCount() {
		return this.getItemsCount() - this.getCompletedCount()
	},

	render() {
		return (
			<div className='panel-footer'>
				<ul className='nav nav-pills'>
					<li className=''>
						<Link activeClassName='active' to='all'>All:&nbsp;<span className='badge'>{ this.getItemsCount() }</span></Link>
					</li>
					<li className=''>
						<Link activeClassName='active' to='completed'>Completed:&nbsp;<span className='badge'>{ this.getCompletedCount() }</span></Link>
					</li>
					<li className=''>
						<Link activeClassName='active' to='active'>Active:&nbsp;<span className='badge'>{ this.getActiveCount() }</span></Link>
					</li>
				</ul>
			</div>
		)
	}

})
