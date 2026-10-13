import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPoints, addPlayer, removePlayer } from '../redux/scoreSlice';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const scores  = useSelector((state) => state.scores.players);
  const dispatch = useDispatch();
  const [input, setInput]   = useState('');
  const [error, setError]   = useState('');

  const handleAddPoints = (player, points) => {
    dispatch(addPoints({ player, points }));
  };

  const handleAdd = () => {
    const name = input.trim();
    if (!name) { setError('İsim boş olamaz'); return; }
    if (Object.keys(scores).map(k => k.toLowerCase()).includes(name.toLowerCase())) {
      setError('Bu isim zaten var'); return;
    }
    dispatch(addPlayer(name));
    setInput('');
    setError('');
  };

  const handleRemove = (name) => {
    if (window.confirm(`"${name}" silinsin mi?`)) {
      dispatch(removePlayer(name));
    }
  };

  return (
    <div className="score-board">
      <h2>FIFA Puan Tablosu</h2>

      {/* Oyuncu Ekleme */}
      <div className="add-player-row">
        <input
          className="add-player-input"
          type="text"
          placeholder="Oyuncu ekle..."
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          maxLength={20}
        />
        <button className="add-player-btn" onClick={handleAdd}>+</button>
      </div>
      {error && <p className="add-player-error">{error}</p>}

      {/* Oyuncu Listesi */}
      {Object.keys(scores).length === 0 ? (
        <p className="no-players">Henüz oyuncu eklenmedi</p>
      ) : (
        Object.entries(scores).map(([player, score]) => (
          <div key={player} className="player-score">
            <div className="player-info">
              <h3>{player}</h3>
              <div className="score">{score}</div>
            </div>
            <div className="buttons">
              <button onClick={() => handleAddPoints(player, 1)}>+1</button>
              <button onClick={() => handleAddPoints(player, 3)}>+3</button>
              <button className="remove-btn" onClick={() => handleRemove(player)}>×</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ScoreBoard;
