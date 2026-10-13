import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  generateTournament,
  updateMatchScore,
  resetTournament,
} from '../../redux/tournament/tournamentSlice';
import { addPoints } from '../../redux/scoreSlice';
import styles from './TournamentPage.module.css';

export default function TournamentPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const { rounds, standings, isGenerated, players } = useSelector(
    (s) => s.tournament
  );
  const scorePlayers = useSelector((s) => s.scores.players);

  // Yerel skor girişleri { matchId: { home: '', away: '' } }
  const [inputs, setInputs] = useState({});
  const [activeTab, setActiveTab] = useState('fixture'); // 'fixture' | 'standings'

  // ─── Turnuva oluştur ────────────────────────────────────────────────────
  const handleGenerate = () => {
    const playerList = Object.keys(scorePlayers);
    dispatch(generateTournament(playerList));
    setInputs({});
  };

  // ─── Skor input değişimi ────────────────────────────────────────────────
  const handleInput = (matchId, side, value) => {
    if (value !== '' && (!/^\d+$/.test(value) || Number(value) > 99)) return;
    setInputs((prev) => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value },
    }));
  };

  // ─── Maç sonucu kaydet ──────────────────────────────────────────────────
  const handleSave = (roundIndex, match) => {
    const inp = inputs[match.id] || {};
    const hs = inp.home ?? match.homeScore;
    const as = inp.away ?? match.awayScore;
    if (hs === '' || as === '') return;

    // Eğer maç daha önce oynanmışsa ScoreBoard puanlarını geri al
    if (match.played) {
      const prevH = Number(match.homeScore);
      const prevA = Number(match.awayScore);
      if (prevH > prevA) {
        dispatch(addPoints({ player: match.home, points: -3 }));
      } else if (prevH < prevA) {
        dispatch(addPoints({ player: match.away, points: -3 }));
      } else {
        dispatch(addPoints({ player: match.home,  points: -1 }));
        dispatch(addPoints({ player: match.away, points: -1 }));
      }
    }

    dispatch(
      updateMatchScore({
        roundIndex,
        matchId: match.id,
        homeScore: hs,
        awayScore: as,
        played: true,
      })
    );

    // ScoreBoard'a puan ekle
    const h = Number(hs), a = Number(as);
    if (h > a) {
      dispatch(addPoints({ player: match.home, points: 3 }));
    } else if (h < a) {
      dispatch(addPoints({ player: match.away, points: 3 }));
    } else {
      dispatch(addPoints({ player: match.home,  points: 1 }));
      dispatch(addPoints({ player: match.away, points: 1 }));
    }

    // Input'u temizle
    setInputs((prev) => {
      const next = { ...prev };
      delete next[match.id];
      return next;
    });
  };

  // ─── Maç sonucu temizle ─────────────────────────────────────────────────
  const handleReset = (roundIndex, match) => {
    if (!match.played) return;
    const prevH = Number(match.homeScore);
    const prevA = Number(match.awayScore);
    if (prevH > prevA) {
      dispatch(addPoints({ player: match.home, points: -3 }));
    } else if (prevH < prevA) {
      dispatch(addPoints({ player: match.away, points: -3 }));
    } else {
      dispatch(addPoints({ player: match.home,  points: -1 }));
      dispatch(addPoints({ player: match.away, points: -1 }));
    }
    dispatch(
      updateMatchScore({
        roundIndex,
        matchId: match.id,
        homeScore: '',
        awayScore: '',
        played: false,
      })
    );
  };

  const playedCount = rounds.reduce(
    (acc, r) => acc + r.matches.filter((m) => m.played).length,
    0
  );
  const totalMatches = rounds.reduce((acc, r) => acc + r.matches.length, 0);

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.trophy}>🏆</span>
          <div>
            <h1 className={styles.title}>TURNUVA</h1>
            <p className={styles.subtitle}>Round-Robin Ligi</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.backBtn} onClick={() => navigate('/match')}>
            ← Maç Sayfası
          </button>
        </div>
      </header>

      {/* Turnuva yoksa başlat ekranı */}
      {!isGenerated ? (
        <div className={styles.startScreen}>
          <div className={styles.startCard}>
            <div className={styles.startIcon}>⚽</div>
            <h2>Turnuva Başlat</h2>
            <p>
              Turnuvaya katılacak oyuncular:{' '}
              <strong>{Object.keys(scorePlayers).join(', ')}</strong>
            </p>
            <p className={styles.ruleText}>
              {Object.keys(scorePlayers).length === 3
                ? '3 oyuncu → 3 tur, herkes herkesle 1 maç'
                : Object.keys(scorePlayers).length === 4
                ? '4 oyuncu → 3 tur, her turda 2 maç'
                : `${Object.keys(scorePlayers).length} oyuncu → Round-Robin`}
            </p>
            <button className={styles.generateBtn} onClick={handleGenerate}>
              🎯 Fikstürü Oluştur
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Üst Bilgi Çubuğu */}
          <div className={styles.infoBar}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Oyuncular</span>
              <span className={styles.infoValue}>{players.length}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Turlar</span>
              <span className={styles.infoValue}>{rounds.length}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Maçlar</span>
              <span className={styles.infoValue}>
                {playedCount}/{totalMatches}
              </span>
            </div>
            <button
              className={styles.resetBtn}
              onClick={() => {
                if (window.confirm('Turnuvayı sıfırlamak istiyor musun?')) {
                  dispatch(resetTournament());
                  setInputs({});
                }
              }}
            >
              🔄 Sıfırla
            </button>
          </div>

          {/* Sekme Menüsü */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'fixture' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('fixture')}
            >
              📅 Fikstür
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'standings' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('standings')}
            >
              📊 Puan Durumu
            </button>
          </div>

          {/* FİKSTÜR */}
          {activeTab === 'fixture' && (
            <div className={styles.fixtureSection}>
              {rounds.map((round, roundIndex) => (
                <div key={round.roundNumber} className={styles.roundBlock}>
                  <div className={styles.roundHeader}>
                    <span className={styles.roundBadge}>{round.roundNumber}. TUR</span>
                    <span className={styles.roundProgress}>
                      {round.matches.filter((m) => m.played).length}/
                      {round.matches.length} tamamlandı
                    </span>
                  </div>

                  {round.matches.map((match) => {
                    const inp = inputs[match.id] || {};
                    const hVal = inp.home !== undefined ? inp.home : match.homeScore;
                    const aVal = inp.away !== undefined ? inp.away : match.awayScore;

                    return (
                      <div
                        key={match.id}
                        className={`${styles.matchCard} ${match.played ? styles.played : ''}`}
                      >
                        {/* Ev sahibi */}
                        <div className={styles.teamBlock}>
                          <span className={styles.teamName}>{match.home}</span>
                        </div>

                        {/* Skor alanı */}
                        <div className={styles.scoreBlock}>
                          <input
                            className={styles.scoreInput}
                            type="text"
                            inputMode="numeric"
                            value={hVal}
                            onChange={(e) =>
                              handleInput(match.id, 'home', e.target.value)
                            }
                            placeholder="0"
                            maxLength={2}
                          />
                          <span className={styles.scoreSep}>–</span>
                          <input
                            className={styles.scoreInput}
                            type="text"
                            inputMode="numeric"
                            value={aVal}
                            onChange={(e) =>
                              handleInput(match.id, 'away', e.target.value)
                            }
                            placeholder="0"
                            maxLength={2}
                          />
                        </div>

                        {/* Deplasman */}
                        <div className={`${styles.teamBlock} ${styles.awayTeam}`}>
                          <span className={styles.teamName}>{match.away}</span>
                        </div>

                        {/* Aksiyon Butonları */}
                        <div className={styles.matchActions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => handleSave(roundIndex, match)}
                            disabled={hVal === '' || aVal === ''}
                          >
                            {match.played ? '✏️ Güncelle' : '✅ Kaydet'}
                          </button>
                          {match.played && (
                            <button
                              className={styles.clearBtn}
                              onClick={() => handleReset(roundIndex, match)}
                            >
                              ✖
                            </button>
                          )}
                        </div>

                        {match.played && (
                          <div className={styles.resultBadge}>
                            {Number(match.homeScore) > Number(match.awayScore)
                              ? `🏆 ${match.home}`
                              : Number(match.homeScore) < Number(match.awayScore)
                              ? `🏆 ${match.away}`
                              : '🤝 Beraberlik'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* PUAN DURUMU */}
          {activeTab === 'standings' && (
            <div className={styles.standingsSection}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Oyuncu</th>
                    <th title="Oynadığı">O</th>
                    <th title="Galibiyet">G</th>
                    <th title="Beraberlik">B</th>
                    <th title="Mağlubiyet">M</th>
                    <th title="Attığı Gol">AG</th>
                    <th title="Yediği Gol">YG</th>
                    <th title="Averaj">Av</th>
                    <th title="Puan">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => (
                    <tr
                      key={row.player}
                      className={i === 0 ? styles.topRow : ''}
                    >
                      <td>
                        {i === 0
                          ? '🥇'
                          : i === 1
                          ? '🥈'
                          : i === 2
                          ? '🥉'
                          : i + 1}
                      </td>
                      <td className={styles.playerCell}>{row.player}</td>
                      <td>{row.O}</td>
                      <td className={styles.win}>{row.G}</td>
                      <td>{row.B}</td>
                      <td className={styles.loss}>{row.M}</td>
                      <td>{row.AY}</td>
                      <td>{row.YY}</td>
                      <td>{row.A > 0 ? `+${row.A}` : row.A}</td>
                      <td className={styles.pts}>{row.Pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {playedCount === totalMatches && totalMatches > 0 && (
                <div className={styles.champion}>
                  <span>🏆</span>
                  <span>
                    Şampiyon: <strong>{standings[0]?.player}</strong>
                  </span>
                  <span>🏆</span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
