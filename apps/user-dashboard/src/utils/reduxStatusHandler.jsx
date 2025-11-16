export const handleAsyncThunk = (
  builder,
  thunk,
  dataKey,
  statusKey = 'status',
  errorKey = 'error',
  metaKey
) => {
  builder
    .addCase(thunk.pending, (state) => {
      console.log(`${dataKey} pending...`);
      state[statusKey] = 'loading';
      state[errorKey] = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      console.log(`${dataKey} fetched:`, action.payload);
      state[statusKey] = 'succeeded';
      state[dataKey] = action.payload?.data || [];
      if (metaKey) {
        state[metaKey] = {
          total: action.payload?.total || 0,
          totalFiltered: action.payload?.totalFiltered || 0,
          page: action.payload?.page || 1,
          limit: action.payload?.limit || state[dataKey].length,
        };
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      console.log(`${dataKey} rejected:`, action.payload || action.error);
      state[statusKey] = 'failed';
      state[errorKey] =
        action.payload || action.error?.message || 'Something went wrong';
      state[dataKey] = [];
      if (metaKey) state[metaKey] = {};
    });
};
