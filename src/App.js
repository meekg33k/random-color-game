import React from 'react';
import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        Random Color Game
      </header>
      <p className='App-subheader'>Select a difficulty level and press start to play the game </p>
      <Game />
    </div>
  );
}

export default App;
