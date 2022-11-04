import React, { useState, useEffect } from "react";
import "./App.css";

import Card from "./components/Card";
import EndGame from "./components/EndGame";


const cardImages = [
  { src: "./images/android.png", matched: false },
  { src: "/images/java.png", matched: false },
  { src: "/images/github.png", matched: false },
  { src: "/images/paragon.png", matched: false },
  { src: "/images/css.png", matched: false },
  { src: "/images/drupal.png", matched: false },
  { src: "/images/mongo.png", matched: false },
  { src: "/images/mocha.png", matched: false },
  { src: "/images/mysql.png", matched: false },
  { src: "/images/node.png", matched: false },
  { src: "/images/docker.png", matched: false },
  { src: "/images/git.png", matched: false },
  { src: "/images/heroku.png", matched: false },
  { src: "/images/javascript.png", matched: false },
  { src: "/images/linux.png", matched: false },
  { src: "/images/msteams.png", matched: false },
  { src: "/images/vue.png", matched: false },
  { src: "/images/go.png", matched: false },
  { src: "/images/python.png", matched: false },
  { src: "/images/scala.png", matched: false },
  { src: "/images/swift.png", matched: false },
  { src: "/images/postgresql.png", matched: false },
  { src: "/images/postman.png", matched: false },
  { src: "/images/react.png", matched: false },
  { src: "/images/rail.png", matched: false },
  { src: "/images/html.png", matched: false },
  { src: "/images/csharp.png", matched: false },
  { src: "/images/unity.png", matched: false },
  { src: "/images/typescript.png", matched: false },
  { src: "/images/visualstudio.png", matched: false },
  { src: "/images/slack.png", matched: false },
  { src: "/images/angular.png", matched: false },

];

function App() {
  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }
  const level1 = getMultipleRandom(cardImages, 2);
  const level2 = getMultipleRandom(cardImages, 4);
  const level3 = getMultipleRandom(cardImages, 8);
  const level4 = getMultipleRandom(cardImages, 16);

  const [gameMode, setGameMode] = useState([]);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  const match = cards.every((item) => item.matched === true);
  

  const shuffleCards = () => {
    const shuffledCards = [...gameMode, ...gameMode]

      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    //localStorage.clear()
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {cards.length < 3 ? <p>Please choose difficulty Level </p> : ''}
      {cards.length > 3 ? (<button onClick={shuffleCards}>New Game</button>) : ''}
      <div>
        <button onClick={() => (setGameMode(level1), shuffleCards())}>
          Level 1
        </button>
        <button onClick={() => (setGameMode(level2), shuffleCards())}>
          Level 2
        </button>
        <button onClick={() => (setGameMode(level3), shuffleCards())}>
          Level 3
        </button>
        <button onClick={() => (setGameMode(level4), shuffleCards())}>
          Level 4
        </button>
      </div>
      {cards.length > 3 ? <p>Moves: {turns}</p> : ''}
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            cards={cards}
            turns={turns}
          />
        ))}
      </div>
      <h2>Best Score :</h2>
       
      <EndGame turns={turns} match={match}  
       shuffleCards={shuffleCards} />
    </div>
  );
}

export default App;
