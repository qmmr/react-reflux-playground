import React from 'react'
import Router from 'react-router'

import Actions from './Actions'

import Item from './Item.jsx'
import Footer from './Footer.jsx'

export default React.createClass({

	displayName: 'Main',

	propTypes: {
		tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},

	mixins: [ Router.State ],

	handleValueChange(e) {
		var text = e.target.value

		if (e.which === 13 && text) { // hit enter
			Actions.addItem(text)
			e.target.value = ''
		} else if (e.which === 27) { // hit escape
			e.target.value = ''
		}
	},

	getItems() {
		return this._filterTasks().map(task => <Item key={ task.id } task={ task } />)
	},

	componentDidMount() {
		let { children } = this.refs.list.getDOMNode()
		window.TweenMax.staggerFrom(children, .5, { scale: 0, opacity: 0, ease: window.Elastic.easeOut.config(1, 0.75) }, 0.25)
	},

	render() {
		return (
			<main className='panel panel-primary'>
				<div className='panel-heading'>
					<h3 className='panel-title'>Tasks:</h3>
				</div>
				<div className='panel-body'>
					<ul ref='list' className='list-group tasks-list'>
						{ this.getItems() }
					</ul>
				</div>
				<Footer { ...this.props } />
			</main>
		)
	},

	_filterTasks() {
		var path = this.context.router.getCurrentPath()
		var tasks

		switch (path) {
			case '/complete':
				tasks = this.props.tasks.filter(task => task.complete === true)
				break
			case '/active':
				tasks = this.props.tasks.filter(task => task.complete === false)
				break
			default:
				tasks = this.props.tasks
				break
		}

		return tasks
	}

})
