import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: {
    'Emin': 0,
    'Mehmet': 0,
    'İrfan': 0
  }
};

export const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    addPoints: (state, action) => {
      const { player, points } = action.payload;
      state.players[player] += points;
    }
  }
});

export const { addPoints } = scoreSlice.actions;
export default scoreSlice.reducer; 