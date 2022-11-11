import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
const initalVal = Array(10).fill({ name: "Unknown", score: 9999 });
const EndGame = ({ turns, next }) => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const [name, setName] = useState("");
  const [highScore, setHighScore] = useState(() => {
    const savedItem = localStorage.getItem("highScore");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || initalVal;
  });
  const [playerScore, setPlayerScore] = useState();

  useEffect(() => {
    setTimeout(() => {
    if (next === 60) {
      setOpen(true);
      setPlayerScore(turns);
    }
  }, 1500)
    // eslint-disable-next-line
  }, [next]);

  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

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
        <button className="btn2" onClick={handle}>
          Submit{" "}
        </button>
        <button className="btn2" onClick={close}>
          Close
        </button>
      </Modal>
      <div>
        <table className="table">
          <tbody>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
          {highScore
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
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default EndGame;
