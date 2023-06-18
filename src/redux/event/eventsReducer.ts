import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { IEvent } from '../../types/event';

export const eventsAdapter = createEntityAdapter<IEvent>();

const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState(),
  reducers: {},
});

export default eventsSlice.reducer;
