import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: {}   // başlangıçta boş — ScoreBoard'dan eklenir
};

export const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      const name = action.payload;
      if (!state.players.hasOwnProperty(name)) {
        state.players[name] = 0;
      }
    },
    removePlayer: (state, action) => {
      delete state.players[action.payload];
    },
    addPoints: (state, action) => {
      const { player, points } = action.payload;
      if (state.players.hasOwnProperty(player)) {
        state.players[player] += points;
      }
    },
  },
});

export const { addPlayer, removePlayer, addPoints } = scoreSlice.actions;
export default scoreSlice.reducer;
