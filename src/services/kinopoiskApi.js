import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', kinopoiskApiKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  // Collections
  endpoints: (builder) => ({
    getFilmsTop: builder.query({
      query: ({ type, page }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    // Film
    // getFilms: builder.query({
    //   query: ({
    //     countries = '1',
    //     genreId,
    //     order = 'NUM_VOTE',
    //     type = 'FILM',
    //     year = '1',
    //     page,
    //     keyword = '',
    //   }) => `/v2.2/films?countries=${countries}&genres=${genreId}
    //     $order=${order}&type=${type}&year=${year}&page=${page}&keyword=${keyword}`,
    // }),
    getFilms: builder.query({
      query: ({ genreId, type = 'FILM', page }) =>
        `/v2.2/films?genres=${genreId}&type=${type}&page=${page}`,
    }),
  }),
});

export const { useGetFilmsTopQuery, useGetFilmsQuery } = kinopoiskApi;
