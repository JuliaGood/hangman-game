import React, { Component } from "react";
import "./hangman.css";
import img0 from "./img/0.png";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";
import { randomWord } from "./words";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6, // the max number that user can guess incorrect before he-she lose
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      numWrong: 0, 
      guessed: new Set(), 
      answer: randomWord() //a random word is here
    };
  }

  resetWord = () => {
    this.setState({
      numWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr} 
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleGuess = (event) => {
    const ltr = event.target.value;
    this.setState((currState) => ({
      guessed: currState.guessed.add(ltr),
      numWrong: currState.numWrong + (currState.answer.includes(ltr) ? 0 : 1)
    }));
  }
  
  guessedWord = () => {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  render() {
    const { numWrong, answer } = this.state;
    const { maxWrong, images } = this.props;

    const isGameOver = numWrong >= maxWrong;
    const isWinner = this.guessedWord().join("") === answer;

    let gameState; 
    if(isWinner) {
      gameState= "You Won !"
    } else if(isGameOver) {
      gameState= "You Lost !"
    } else {
      gameState = this.generateButtons();
    }
    const altText = `${numWrong}/${maxWrong}`;

    return (
      <div className="hangman">
        <h1>Hangman Game</h1>
        <img src={images[numWrong]} alt={altText}/>
        <p className="hangman-wrong">You have {numWrong}/6 guesses left.</p>
        <p className="hangman-word">{
          !isGameOver ? this.guessedWord() : answer
        }</p>
        <p className="hangman-btns">{gameState}</p>
        <button 
          onClick={this.resetWord}
          id="hangman-reset"
        >Reset</button>
      </div>
    );
  }
}

export default Hangman;
