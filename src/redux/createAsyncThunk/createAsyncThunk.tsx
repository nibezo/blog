/* eslint-disable no-alert */
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset: number, { rejectWithValue }) => {
  const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${(offset - 1) * 5}`);
  if (!response.ok) rejectWithValue('Server Error!');
  const user = await response.json();
  return user.articles;
});

export const fetchArticlesSlug = createAsyncThunk(
  'articles/fetchArticlesSlug',
  async (slug: string | undefined, { rejectWithValue }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
    if (!response.ok) rejectWithValue('Server Error!');
    const user = await response.json();
    return user.article;
  },
);

export const fetchSignUp = createAsyncThunk(
  'articles/fetchSignUp',
  async (
    { username, email, password }: { username: string; email: string; password: string | number },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Имя или email уже занято, попробуйте ввести другие данные!');
      }
      if (response.ok) {
        alert('Поздравляю, Вы успешно зарегистрировались');
      }
      const { user } = await response.json();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchSignIn = createAsyncThunk(
  'articles/fetchSignIn',
  async ({ email, password }: { email: string; password: string | number }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
          errors: {
            body: ['string'],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Email или пароль неправильный!');
      }
      if (response.ok) alert('Вы успешно зашли в ваш кабинет!');
      const { user } = await response.json();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserUpdate = createAsyncThunk(
  'articles/fetchUserUpdate',
  async (
    { username, email, password, image }: { username: string; email: string; password: string | number; image: string },
    { rejectWithValue },
  ) => {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          username,
          bio: 'string',
          image,
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
  async (
    { title, description, body, tagList }: { title: string; description: string; body: string; tagList: string[] },
    { rejectWithValue },
  ) => {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: [...tagList],
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
  async (
    { title, description, body, slug }: { title: string; description: string; body: string; slug: string | undefined },
    { rejectWithValue },
  ) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
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
  async (slug: string, { rejectWithValue }) => {
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
  async (slug: string, { rejectWithValue }) => {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
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

export const fetchDeleteFavorite = createAsyncThunk(
  'articles/fetchDeleteFavorite',
  async (slug: string, { rejectWithValue }) => {
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
