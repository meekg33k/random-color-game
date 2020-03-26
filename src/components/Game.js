import React, { Component } from 'react';
import {
	DEFAULT_BACKGROUND_COLOR,
	MIN_DIFFICULTY_LEVEL,
	MAX_DIFFICULTY_LEVEL,
	generateRandomColors,
	range,
	generateRandomNumberBelow,
	WIN_STATUS_MESSAGE,
	FAIL_STATUS_MESSAGE
} from '../Utils';
import { ColorDisplayBox } from './ColorDisplayBox'
import ColorMarker from './ColorMarker';


/**
 * Handles the entire game logic and pieces
 * up the components that make the game
 */
export default class Game extends Component {
	constructor(props) {
		super(props);
		const { difficultyLevel } = this.props;
		this.state = {
			colors: generateRandomColors(difficultyLevel),
			buttonText: 'Start Game',
			isGameRunning: false,
			numberOfGames: 0,
			numberOfWins: 0,
			selectedColor: DEFAULT_BACKGROUND_COLOR,
			statusMessage: '',
		}
		this.gameColorsSequence = [];
		this.userColorsSequence = [];
		this.handleColorMarkerClick = this.handleColorMarkerClick.bind(this);
		this.handleChangeDifficultyLevel = this.handleChangeDifficultyLevel.bind(this);
		this.handleStartGame = this.handleStartGame.bind(this);
	}

	handleColorMarkerClick = (color) => {
		const { awaitingUserInput } = this.state;

		if (awaitingUserInput) {
			this.userColorsSequence.push(color);
			if (this.userColorsSequence.length === this.gameColorsSequence.length) {
				this.processGameResults();
			}
		}
	}

	handleChangeDifficultyLevel = (event) => {
		const difficultyLevel = event.target.value;
		this.setState({ difficultyLevel });
		const colors = generateRandomColors(difficultyLevel);
		this.setState({ buttonText: 'Start Game', colors });
	}

	handleStartGame = () => {
		this.userColorsSequence = [];
		this.gameColorsSequence = [];

		this.setState({
			isGameRunning: true,
			statusMessage: '',
		}, () => {
			this.randomizeColorSequence();
		});
	}

	processGameResults = () => {
		for (let i = 0; i < this.userColorsSequence.length; i++) {
			if (this.userColorsSequence[i] !== this.gameColorsSequence[i]) {
				this.endGame(false);
				return;
			}
		}
		this.endGame(true);
	}

	randomizeColorSequence = () => {
		const { colors } = this.state;
		let colorsToBeShown = [...colors]

		const id = setInterval(() => {
			if (this.gameColorsSequence.length === colors.length) {
				clearInterval(id);
				this.readyForUserInput();
			}
			else {
				const indexOfNextColor = generateRandomNumberBelow(colorsToBeShown.length);
				const nextColor = colorsToBeShown[indexOfNextColor];
				colorsToBeShown = colorsToBeShown.filter(color => color !== nextColor);
				this.gameColorsSequence.push(nextColor);
				this.setState({ selectedColor: nextColor });
			}

		}, 1000);
	}

	readyForUserInput = () => {
		this.setState({
			awaitingUserInput: true,
			selectedColor: DEFAULT_BACKGROUND_COLOR
		})
	}

	endGame = (userWon) => {
		const { numberOfGames, numberOfWins } = this.state;
		let scoreState = {
			awaitingUserInput: false,
			numberOfGames: numberOfGames + 1,
			buttonText: 'Play Again',
		};

		if (userWon) {
			scoreState = {
				...scoreState,
				numberOfWins: numberOfWins + 1,
				statusMessage: WIN_STATUS_MESSAGE
			}
		}
		else {
			scoreState = {
				...scoreState,
				statusMessage: FAIL_STATUS_MESSAGE
			}
		}
		this.setState({
			isGameRunning: false,
			...scoreState
		});
	}


	render() {
		const {
			awaitingUserInput,
			buttonText,
			colors,
			isGameRunning,
			numberOfGames,
			numberOfWins,
			selectedColor,
			statusMessage
		} = this.state;

		const renderColorMarkers = () => colors.map(
			(color, index) => (
				<ColorMarker key={`${color}-${index}`}
					color={color}
					gameMode={awaitingUserInput}
					handleMarkerClick={this.handleColorMarkerClick}
				/>
			)
		);
		const renderDifficultyLevels = () => range(MIN_DIFFICULTY_LEVEL, MAX_DIFFICULTY_LEVEL, 1).map(
			index => <option value={index} key={index}>{index}</option>
		);

		const showStatusMessage = () => {
			if (awaitingUserInput) {
				return 'It\'s yor turn! Click on the smaller boxes to replay the sequence.'
			}
			return statusMessage;
		}

		return (
			<div className='game-root'>
				<div className='game-container'>
					<div className='game-box'>
						<ColorDisplayBox selectedColor={selectedColor} />
						<div className='color-markers-root'>
							{renderColorMarkers()}
						</div>
					</div>
					{ /** Game Controls and Status */}
					<div className='game-controls'>
						<p>Select level from 4 to 10</p>
						<select className='level-select' onChange={this.handleChangeDifficultyLevel}>
							{renderDifficultyLevels()}
						</select>
						<button className='start-game-button' disabled={isGameRunning}
							onClick={this.handleStartGame}>
							{buttonText}
						</button>
						<div className='game-scoreboard'>
							{numberOfGames > 0 && `Your wins: ${numberOfWins}/${numberOfGames}`}
						</div>
					</div>
				</div>
				<p>{showStatusMessage()}</p>
			</div>

		)
	}
}

Game.defaultProps = {
	difficultyLevel: 4
}