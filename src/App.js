import React, { useState, useEffect } from "react";
import "./App.css";
import NextLevel from "./components/NextLevel";
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

  const [gameMode, setGameMode] = useState(level1);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [next, setNext] = useState(0);
  const [msg, setMsg] = useState("Level 1");

  const match = cards.every((item) => item.matched === true);

  const shuffleCards = () => {
    const shuffledCards = [...gameMode, ...gameMode]

      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);

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
              setNext(next + 1);
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

  useEffect(() => {
    if (next === 2) {
      setGameMode(level2);
      setMsg("Level 2");
    } else if (next === 6) {
      setGameMode(level3);
      setMsg("Level 3");
    } else if (next === 12) {
      setGameMode(level4);

      setMsg("Level 4");
    }
  }, [next]);

  const restart = () => {
    setGameMode(level1);
    setTurns(0);
    shuffleCards();
    setNext(0);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);

    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>

      {cards.length < 1 ? (
        <button className="button" onClick={shuffleCards}>Start Game</button>
      ) : (
        <button className="button" onClick={restart}>Play Again</button>
      )}

      {cards.length > 3 ? <p style={{ float: "left" }}>Moves: {turns}</p> : ""}
      {cards.length > 3 ? (
        <p style={{ float: "right", marginRight: "60px" }}>{msg}</p>
      ) : (
        ""
      )}
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
      <NextLevel next={next} shuffleCards={shuffleCards} />
      <EndGame
        turns={turns}
        shuffleCards={shuffleCards}
        next={next}
      />
    </div>
  );
}

export default App;
