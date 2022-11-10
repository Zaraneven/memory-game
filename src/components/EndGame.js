import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
const initalVal = Array(10).fill({ name: 'Unknown', score: 9999})
const EndGame = ({ turns, next }) => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const [name, setName] = useState("");
  const [highScore, setHighScore] = useState(() => { return JSON.parse(localStorage.getItem("highScore", initalVal))});
  const [playerScore, setPlayerScore] = useState();

  
  
  localStorage.setItem("highScore", JSON.stringify([...highScore]));
  var storedSCores = localStorage.getItem("highScore");
  var resultObj = JSON.parse(storedSCores);
  
  useEffect(() => {
    if (next === 60) {
      setOpen(true);
      setPlayerScore(turns);
      
    }
    // eslint-disable-next-line
  }, [next]);

  const handle = () => {
    if (player === "") {
      setName("Please enter players name");
      setOpen(true);
    } else if (player.length > 0) {
      localStorage.setItem("player", player);
      setOpen(false);
      updateScore();
      
    }
  };

  function updateScore() {
    const newScore = [
      ...highScore,
      {
        name: player,
        score: playerScore,
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
      },
    ];
    setHighScore(newScore);
  }

  function close() {
    setOpen(false);
  }
  return (
    <div>
      <Modal className="odal" isOpen={open}>
        <h2>
          Congratulations, You found all matches in just {playerScore} moves !{" "}
        </h2>

        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="inp"
          type="text"
        />
        <p className="validation">{name}</p>
        <button className="btn2" onClick={handle}>Submit </button>
        <button className="btn2" onClick={close}>Close</button>
      </Modal>
      <div>
        <table className="table">
          <tr>
            <th >Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
          {resultObj
            .sort((a, b) => {
              return a.score - b.score;
            })
            .slice(0, 10)
            .map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.name}</td>
                  <td>{value.score}</td>
                  <td>
                    {value.day}.{value.month} {value.hour}:{value.minute}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default EndGame;
