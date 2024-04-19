import React, { Component } from 'react';
import D3Chart from './D3Chart';

export default class ChartWrapper extends Component {
	componentDidMount() {
		this.setState({
			chart: new D3Chart(this.refs.chart)
		})
	}

	shouldComponentUpdate() {
		return false
	}

	componentWillReceiveProps(nextProps) {
		this.state.chart.update(nextProps.date)
	}
	
	render() {
		return <div ref="chart"></div>
	}
}