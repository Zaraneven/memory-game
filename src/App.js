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
  const level2 = getMultipleRandom(cardImages, 8);
  const level3 = getMultipleRandom(cardImages, 18);
  const level4 = getMultipleRandom(cardImages, 32);

  const [gameMode, setGameMode] = useState(level1);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [next, setNext] = useState(0);
  const [msg, setMsg] = useState("Level 1");
  const [squares, setSquares] = useState(2);

  const shuffleCards = () => {
    const shuffledCards = [...gameMode, ...gameMode]

      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  console.log(cards);

  useEffect(() => {
    if (choiceOne || choiceTwo) {
      setTurns((prevTurns) => prevTurns + 1);
    }
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              setNext(next + 1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      }
       else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // eslint-disable-next-line
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setTimeout(() => {
    if (next === 2) {
      setGameMode(level2);
      setMsg("Level 2");
      setSquares(4);
    } else if (next === 10) {
      setGameMode(level3);
      setMsg("Level 3");
      setSquares(6);
    } else if (next === 28) {
      setGameMode(level4);
      setSquares(8);
      setMsg("Level 4");
    }
  }, 2000)
    // eslint-disable-next-line
  }, [next]);

  useEffect(() => {
    if (gameMode) {
      shuffleCards();
    }
    // eslint-disable-next-line
  }, [gameMode]);

  const restart = () => {
    //shuffleCards();
    setGameMode(level1);
    setTurns(0);

    setNext(0);
    window.location.reload();
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);

    setDisabled(false);
  };

  const arr = Array(squares ** 2).concat(cards);
  const gridSize = "1fr ".repeat(squares);

  console.log(cards);
  return (
    <div className="App">
      <h1>Memory Game</h1>

      {cards.length < 1 ? (
        <button className="button" onClick={shuffleCards}>
          Start Game
        </button>
      ) : (
        <button className="button" onClick={restart}>
          Play Again
        </button>
      )}

      {cards.length > 3 ? <p style={{ float: "left" }}>Moves: {turns}</p> : ""}
      {cards.length > 3 ? (
        <p style={{ float: "right", marginRight: "50px" }}>{msg}</p>
      ) : (
        ""
      )}
      <div
        className="card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: gridSize,
          gridTemplateRows: gridSize,
          width: "450px",
          maxHeight: "450px",
        }}
      >
        {arr.map((card) => (
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
      <h2>Top 10 players:</h2>

      <EndGame turns={turns} shuffleCards={shuffleCards} next={next} />
    </div>
  );
}

export default App;
