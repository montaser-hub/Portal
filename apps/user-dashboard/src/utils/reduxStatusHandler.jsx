export const handleAsyncThunk = (builder, thunk, stateKey = 'data') => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state[stateKey] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message || 'Something went wrong.';
      state[stateKey] = null;
    });
};
