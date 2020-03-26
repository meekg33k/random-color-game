import React, { Component } from 'react';

export default class ColorMarker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animate: false
		};
		this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleAnimationEnd = () => {
		this.setState({ animate: false });
	}

	handleClick = () => {
		const { color, gameMode, handleMarkerClick } = this.props;
		if (gameMode) {
			this.setState({ animate: true });
			handleMarkerClick(color);
		}
	}

	render() {
		const { color } = this.props;
		const { animate } = this.state;

		return (
			<div className={animate ? 'color-marker animate' : 'color-marker'}
				onClick={this.handleClick}
				onAnimationEnd={this.handleAnimationEnd}
				style={{ backgroundColor: color }}>
			</div>
		)
	}
}