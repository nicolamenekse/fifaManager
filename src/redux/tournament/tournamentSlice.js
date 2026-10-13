import { createSlice } from '@reduxjs/toolkit';

// ─── Round-Robin Algoritması ────────────────────────────────────────────────
// N takım için:
//  • Tek sayıysa 'BYE' eklenerek çift yapılır
//  • İlk takım sabit tutulur, geri kalanlar her turda döndürülür
//  • N-1 tur, her turda N/2 maç (BYE maçları atlanır)
function generateSchedule(players) {
  const teams = [...players];
  if (teams.length % 2 !== 0) teams.push('BYE');

  const numTeams = teams.length;
  const numRounds = numTeams - 1;
  const halfSize = numTeams / 2;
  const rotating = [...teams];
  const rounds = [];

  for (let r = 0; r < numRounds; r++) {
    const matches = [];
    for (let i = 0; i < halfSize; i++) {
      const home = rotating[i];
      const away = rotating[numTeams - 1 - i];
      if (home !== 'BYE' && away !== 'BYE') {
        matches.push({
          id: `r${r}m${i}`,
          home,
          away,
          homeScore: '',
          awayScore: '',
          played: false,
        });
      }
    }
    rounds.push({ roundNumber: r + 1, matches });
    // Döndür: son eleman, 1. konuma geçer (0. sabit)
    rotating.splice(1, 0, rotating.pop());
  }
  return rounds;
}

// ─── Puan Tablosu Hesaplama ─────────────────────────────────────────────────
function calcStandings(players, rounds) {
  const tbl = {};
  players.forEach(p => {
    tbl[p] = { player: p, O: 0, G: 0, B: 0, M: 0, AY: 0, YY: 0, A: 0, Pts: 0 };
    //              Oynanan Galibiyet Beraberlik Mağlubiyet AttığıGol YediğiGol Averaj
  });

  rounds.forEach(round => {
    round.matches.forEach(match => {
      if (!match.played) return;
      const h = match.home;
      const a = match.away;
      const hs = Number(match.homeScore);
      const as = Number(match.awayScore);

      tbl[h].O++;  tbl[a].O++;
      tbl[h].AY += hs; tbl[a].AY += as;
      tbl[h].YY += as; tbl[a].YY += hs;
      tbl[h].A = tbl[h].AY - tbl[h].YY;
      tbl[a].A = tbl[a].AY - tbl[a].YY;

      if (hs > as) {
        tbl[h].G++;  tbl[h].Pts += 3;
        tbl[a].M++;
      } else if (hs < as) {
        tbl[a].G++;  tbl[a].Pts += 3;
        tbl[h].M++;
      } else {
        tbl[h].B++;  tbl[h].Pts++;
        tbl[a].B++;  tbl[a].Pts++;
      }
    });
  });

  return Object.values(tbl).sort((a, b) => {
    if (b.Pts !== a.Pts) return b.Pts - a.Pts;
    if (b.A   !== a.A)   return b.A   - a.A;
    return b.AY - a.AY;
  });
}

// ─── Slice ──────────────────────────────────────────────────────────────────
const initialState = {
  players: [],
  rounds: [],
  standings: [],
  isGenerated: false,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    generateTournament(state, action) {
      const players = action.payload; // string[]
      state.players  = players;
      state.rounds   = generateSchedule(players);
      state.standings = calcStandings(players, state.rounds);
      state.isGenerated = true;
    },

    updateMatchScore(state, action) {
      const { roundIndex, matchId, homeScore, awayScore, played } = action.payload;
      const round = state.rounds[roundIndex];
      if (!round) return;
      const match = round.matches.find(m => m.id === matchId);
      if (!match) return;
      match.homeScore = homeScore;
      match.awayScore = awayScore;
      match.played    = played;
      state.standings = calcStandings(state.players, state.rounds);
    },

    resetTournament(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { generateTournament, updateMatchScore, resetTournament } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
