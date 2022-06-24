import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const baseURL = "http://localhost:4000/";


// for the login i created a mock server on the localhost port 4000 

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(
        baseURL+'login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      // returns a token to create a login session
      let data = await response.json();
      if(response.status === 401) {
        return thunkAPI.rejectWithValue(data);
      }
     else  {
        localStorage.setItem('token', data.token);
        return data;
      }  
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// to solve the CORS-Error we need to create a proxy inside package.json to reconfigure the API to meet the CORS standard

export const fetchData = createAsyncThunk(
  'users/fetchData',
  async ({ token,page }, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3000/cognativex/test-data/main/page_views_per_time.json',
        {
          method: 'GET',
          headers: {
            // Accept: 'application/json',
            // Authorization: 'Bearer ' +token,
            // 'Access-Control-Allow-Origin': '185.199.110.133:443',
            // 'Content-Type': 'application/json',
          },
        }
      );

      let data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    data:"",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = "candidate";
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.errorMsg;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchData.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data=payload.data;
      
    },
    [fetchData.rejected]: (state, { payload }) => {
      
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
