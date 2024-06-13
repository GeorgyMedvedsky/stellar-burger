import { TLoginData, getUserApi, loginUserApi, logoutApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: unknown;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      localStorage.setItem('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
      return res.user;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Произошла ошибка при входе в систему');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          localStorage.removeItem('accessToken');
          deleteCookie('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const logoutUserThunk = createAsyncThunk('auth/logout', async () => {
  logoutApi()
    .then(() => {
      localStorage.clear();
      deleteCookie('refreshToken');
    })
    .catch((err) => {
      console.log(err);
    });
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const { setAuthChecked, setUser } = authSlice.actions;
export const { selectUser, selectAuthChecked, selectError, selectIsLoading } =
  authSlice.selectors;
