import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoints } from '../redux/scoreSlice';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const scores = useSelector((state) => state.scores.players);
  const dispatch = useDispatch();

  const handleAddPoints = (player, points) => {
    dispatch(addPoints({ player, points }));
  };

  return (
    <div className="score-board">
      <h2>FIFA Puan Tablosu</h2>
      {Object.entries(scores).map(([player, score]) => (
        <div key={player} className="player-score">
          <div className="player-info">
            <h3>{player}</h3>
            <div className="score">{score}</div>
          </div>
          <div className="buttons">
            <button onClick={() => handleAddPoints(player, 1)}>+1</button>
            <button onClick={() => handleAddPoints(player, 3)}>+3</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard; 