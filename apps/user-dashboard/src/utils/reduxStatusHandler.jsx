export const handleAsyncThunk = (
  builder,
  thunk,
  dataKey,
  statusKey = 'status',
  errorKey = 'error',
  metaKey,
  mode = 'replace'
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[statusKey] = 'loading';
      state[errorKey] = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[statusKey] = 'succeeded';
      const payload = action.payload;
      const data = payload?.data;
      switch (mode) {
        case 'append':
          // Used for addSwapRequest → push the new created request
          if (data) {
            state[dataKey].push(data);
          }
          break;

        case 'prepend':
          if (data) {
            state[dataKey] = [data, ...state[dataKey]];
          }
          break;

        case 'update':
          // Generic update by _id
          if (data?._id) {
            state[dataKey] = state[dataKey].map((item) =>
              item._id === data._id ? data : item
            );
          }
          break;

        case 'remove':
          // Remove by id (also supports alreadyDeleted logic)
          if (!payload?.alreadyDeleted && payload?.id) {
            state[dataKey] = state[dataKey].filter(
              (item) => item._id !== payload.id
            );
          }
          break;

        case 'replace':
        default:
          state[dataKey] = data || [];
      }

      // Meta for pagination
      if (metaKey) {
        state[metaKey] = {
          total: payload?.total || 0,
          totalFiltered: payload?.totalFiltered || 0,
          page: payload?.page || 1,
          limit: payload?.limit || state[dataKey].length,
        };
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      state[statusKey] = 'failed';
      state[errorKey] =
        action.payload || action.error?.message || 'Something went wrong';
      if (mode !== 'no-reset-on-failure') {
        state[dataKey] = [];
      }

      if (metaKey) state[metaKey] = {};
    });
};
