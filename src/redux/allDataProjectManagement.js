import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    requested: [],
    footage_received: [],
    assigned_to_editor: [],
    editing_in_progress: [],
    revision_in_progress: [],
    edit_complete: [],
    approved_by_client: [],
  },
  isFetching: {
    requested: false,
    footage_received: false,
    assigned_to_editor: false,
    editing_in_progress: false,
    revision_in_progress: false,
    edit_complete: false,
    approved_by_client: false,
  },
  error: {
    requested: null,
    footage_received: null,
    assigned_to_editor: null,
    editing_in_progress: null,
    revision_in_progress: null,
    edit_complete: null,
    approved_by_client: null,
  },
};

export const allDataProjectManagement = createSlice({
  name: "allDataProjectManagement",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    resetData: (state) => {
      state = initialState;
    },
  },
});

export const { setData, setIsFetching, resetData } =
  allDataProjectManagement.actions;

export default allDataProjectManagement.reducer;
