import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk<any, number, { rejectValue: string }>(
  'articles/fetchArticles',
  async function (offset, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(offset - 1) * 5}`);
    if (!response.ok) rejectWithValue('Server Error!');
    const user = await response.json();
    return user.articles;
  },
);

export const fetchArticlesSlug = createAsyncThunk<any, any, { rejectValue: string }>(
  'articles/fetchArticlesSlug',
  async function (slug: string | number, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!response.ok) rejectWithValue('Server Error!');
    const user = await response.json();
    return user.article;
  },
);

export const fetchSignUp = createAsyncThunk(
  'articles/fetchSignUp',
  async function (
    { username, email, password }: { username: string; email: string; password: string | number },
    { rejectWithValue },
  ) {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const user = await response.json();
    return user;
  },
);
export const fetchSignIn = createAsyncThunk(
  'articles/fetchSignIn',
  async function ({ email, password }: { email: string; password: string | number }, { rejectWithValue }) {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const { user } = await response.json();
    return user;
  },
);

// export const fetchUser = createAsyncThunk('articles/fetchUser', async function ({tokenID}, { rejectWithValue }) {
//   const response = await fetch('https://blog.kata.academy/api/user', {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${tokenID}`,
//     },
//   });
//   if (!response.ok) rejectWithValue('Server Error!');
//   const user = await response.json();
//   console.log(user)
//   return user;
// });

export const fetchUserUpdate = createAsyncThunk(
  'articles/fetchUserUpdate',
  async function (
    { username, email, password, image }: { username: string; email: string; password: string | number; image: string },
    { rejectWithValue },
  ) {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          bio: 'string',
          image: image,
        },
      }),
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const { user } = await response.json();
    return user;
  },
);

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async function (
    { title, description, body, tagList }: { title: string; description: string; body: string; tagList: string },
    { rejectWithValue },
  ) {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: [tagList],
        },
      }),
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const { article } = await response.json();
    return article;
  },
);
export const fetchUpdateArticle = createAsyncThunk(
  'articles/fetchCreateArticleSlug',
  async function (
    { title, description, body, slug }: { title: string; description: string; body: string; slug: string | undefined },
    { rejectWithValue },
  ) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
        },
      }),
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const { article } = await response.json();
    return article;
  },
);
export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async function (slug: string, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const article = await response.json();
    return article;
  },
);

export const fetchPostFavorite = createAsyncThunk(
  'articles/fetchPostFavorite',
  async function (slug: string, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const article = await response.json();
    console.log(article);
    return article;
  },
);

export const fetchDeleteFavorite = createAsyncThunk(
  'articles/fetchDeleteFavorite',
  async function (slug: string, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) rejectWithValue('Server Error!');
    const article = await response.json();
    return article;
  },
);
