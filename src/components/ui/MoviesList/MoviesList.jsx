import { Box, Pagination, Stack, Typography } from '@mui/material';
import React from 'react';

import MovieCard from '../MovieCard/MovieCard';

export default function MoviesList({ movies, totalPages, page, setPage }) {
  return (
    <>
      <Stack direction="flex" justifyContent="center" flexWrap="wrap">
        {movies.map((movie) => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </Stack>
      <Stack alignItems="center">
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
}
