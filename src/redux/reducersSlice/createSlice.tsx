/* eslint-disable no-alert */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticles,
  fetchArticlesSlug,
  fetchCreateArticle,
  fetchSignIn,
  fetchSignUp,
  fetchUserUpdate,
} from '../createAsyncThunk/createAsyncThunk';

interface IUser {
  articles: any[];
  article: any[];
  username: string;
  token: string;
  status: boolean;
  editArticle: any[];
  body: string;
  title: string;
  description: string;
  slug: string;
  edit: boolean;
  loading: boolean;
  error: boolean | null;
}
const initialState: IUser = {
  articles: [],
  article: [],
  username: '',
  editArticle: [],
  token: '',
  body: '',
  title: '',
  description: '',
  slug: '',
  status: false,
  edit: false,
  loading: true,
  error: null,
};

const ArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    oauth(state, action) {
      state.status = action.payload;
    },
    editArticle(state, action) {
      state.edit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchArticlesSlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesSlug.fulfilled, (state, action) => {
        state.article = [action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('image', action.payload.image);
        state.status = true;
        state.loading = false;
        state.error = null;
      })
      // .addCase(fetchSignIn.rejected, (_, action) => {
      //   alert(JSON.stringify(action.payload.response.data.errors));
      // })
      .addCase(fetchSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
        state.status = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSignIn.rejected, (_, action) => {
        alert(action.payload);
      })
      .addCase(fetchSignUp.rejected, (_, action) => {
        alert(action.payload);
      })
      .addCase(fetchUserUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserUpdate.fulfilled, (state, action) => {
        localStorage.setItem('image', action.payload.image);
        state.username = action.payload.username;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCreateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateArticle.fulfilled, (state, action) => {
        state.editArticle = action.payload;
        state.slug = action.payload.slug;
        state.loading = false;
        state.error = null;
      });
    // .addCase(fetchUpdateArticle.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchUpdateArticle.fulfilled, (state, action) => {
    //   state.title = action.payload.title;
    //   state.img = action.payload.image;
    //   state.loading = false;
    //   state.error = null;
    // });
  },
});
export const { oauth, editArticle } = ArticlesSlice.actions;
export default ArticlesSlice.reducer;
