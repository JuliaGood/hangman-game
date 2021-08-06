import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6, // the max number that user can guess incorrect before he-she lose
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, // nobody guessed anything wrong yet
      guessed: new Set(), // collection of the letters that have been guessed = we store here the letters that have been guessed
      answer: randomWord(), 
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
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

  /** render: render game */
  render() {
    const isGameOver = this.state.nWrong < this.props.maxWrong;
    const altText = `${this.state.nWrong}/${this.props.maxWrong}`;
    return (
      <div className='Hangman'>
        <h1>Hangman game</h1>
        <img src={this.props.images[this.state.nWrong]} alt={altText}/>
        <p className='Hangman-wrong'>Incorrect guesses are: {this.state.nWrong}/6</p>
        <p className='Hangman-word'>{
          isGameOver
          ? this.guessedWord()
          : this.state.answer
        }</p>
        <p className='Hangman-btns'>{
            isGameOver
            ? this.generateButtons()
            : 'You lose!'
        }</p>
      </div>
    );
  }
}

export default Hangman;
