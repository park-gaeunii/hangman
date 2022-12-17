import styled, { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
import nanumsquare from "./assets/NanumSquare.woff";
import { useState, useEffect } from "react";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  @font-face {
    font-family: nanumsquare;
    src: url(${nanumsquare}) format('woff');
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
    outline: none;
  }
  input, button, select, textarea {
    font-family: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #133a59;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: nanumsquare, sans-serif;
  color: #ffe8db;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 30px;
`;

const Answer = styled.input.attrs({
  type: 'text',
  disabled: true
})`
  width: 500px;
  height: 50px;
  border-radius: 5px;
  background-color: #1f4461;
  font-size: 24px;
  color: #ffe8db;
  font-weight: bold;
  letter-spacing: 20px;
  margin: 45px 0 25px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 16px;
  letter-spacing: 1px;
  margin-bottom: 70px;
`;

const Alphabet = styled.div`
  width: 635px;
  > button {
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    background-color: #0e2b43;
    font-size: 20px;
    color: #ffe8db;
    font-weight: bold;
    margin-left: 15px;
    margin-bottom: 15px;
    :first-child { margin-left: 0; }
    :nth-child(14) { margin-left: 0; }
    &.active:active { background-color: #0a2031; }
    &.disabled {
      color: #5e636e;
      background-color: #0f2e47;
    }
  }
`;

const Reset = styled.button`
  width: 98px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  background-color: #ffe8db;
  color: #133a59;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 75px;
  &:active { background-color: #efd7ca; }
`;

const alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const wordArray = ["APPLE", "BANANA", "DRIVE", "SOUND", "JUMP", "KANGAROO", "LEMON", "MELON", "CLOUD", "ROOM"];

function App() {
  const [word, setWord] = useState(wordArray[Math.floor(Math.random() * wordArray.length)].split(''));
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(10);
  const [message, setMessage] = useState(`you have ${lives} lives.`);
  const [state, setState] = useState(false);
  useEffect( () => {
    let guessAnswer = "";
    for (let i = 0; i < word.length; i++) {
      guessAnswer += "*";
    }
    setAnswer(guessAnswer);
  }, [word] );
  useEffect( () => {
    let text = "";
    if (state) {
      text = `great work! you guessed the word.`;
    } else if (lives !== 0) {
      text = `you have ${lives} lives.`;
    } else {
      text = `game over`;
      setState(true);
    }
    setMessage(text);
  }, [lives, state] );

  const onClick = (event) => {
    let guess = event.target.innerText;
    let guessAnswer = "";
    let wrong = true;
    word.forEach( (alphabet, index) => {
      if (answer.charAt(index) !== "*") {
        guessAnswer += answer.charAt(index);
      } else if (alphabet === guess) {
        guessAnswer += guess;
        wrong = false;
      } else {
        guessAnswer += "*";
      }
    });
    if (wrong) {
      setLives( (current) => current - 1 )
    } else {
      if (word.join('') === guessAnswer) {
        setState(true);
      }
    }
    setAnswer(guessAnswer);
  }

  const reset = () => setWord(wordArray[Math.floor(Math.random() * wordArray.length)].split(''));

  return (
    <Container>
      <GlobalStyles />
      <Title>HANGMAN</Title>
      <Answer value={answer} />
      <Message>{message}</Message>
      <Alphabet>
        {alphabetArray.map((alphabet) => (
          <button
            key={alphabet}
            onClick={onClick}
            disabled={state}
            className={state? "disabled" : "active"}
          >
            {alphabet}
          </button>
        ))}
      </Alphabet>
      <Reset onClick={reset}>{state? "RESTART" : "RESET"}</Reset>
    </Container>
  );
}

export default App;
