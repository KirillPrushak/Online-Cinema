import { ArrowBack, Language, Movie } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer.jsx/VideoPlayer';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFitm = useGetFilmQuery(id);
  const responseSiquelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  if (
    responseFitm.isLoading ||
    // responseSiquelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="Flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (
    responseFitm.error ||
    // responseSiquelsAndPrequels.error ||
    responseStaff.error
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={2} mt={4} sx={{ mt: { md: 2 } }}>
        <Grid item size={{ md: 4 }}>
          <img
            src={responseFitm.data.posterUrl}
            alt={responseFitm.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid item size={{ md: 6 }}>
          <Grid container gap="10px">
            <Grid size={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item alignContent="center">
              {<Typography variant="h5">{responseFitm.data.nameRu}</Typography>}
            </Grid>
          </Grid>
          <Grid container gap="10px">
            <Grid size={6}>{<Typography>Год</Typography>}</Grid>
            <Grid>
              <Typography gutterBottom>{responseFitm.data.year}</Typography>
            </Grid>

            <Grid size={6}>{<Typography>Страна</Typography>}</Grid>
            <Grid>
              {responseFitm.data.countries.map(({ country }) => (
                <Typography key={country}>{country}</Typography>
              ))}
            </Grid>

            <Grid size={6}>{<Typography>Жанры</Typography>}</Grid>
            <Grid>
              {responseFitm.data.genres.map(({ genre }) => (
                <Typography gutterBottom key={genre}>
                  {genre}
                </Typography>
              ))}
            </Grid>

            <Grid size={6}>{<Typography>Режиссеры</Typography>}</Grid>
            <Grid>
              {responseStaff.data
                .filter((el) => el.professionText === 'Режиссеры')
                .map(({ nameRu }) => (
                  <Typography key={nameRu}>{nameRu}</Typography>
                ))}
            </Grid>

            <Grid size={6}>
              <Typography>Время</Typography>
            </Grid>
            <Grid>
              <Typography gutterBottom>
                {responseFitm.data.filmLength} (мин)
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography gutterBottom>Описание</Typography>
            </Grid>
            <Grid size={12}>
              <Typography>
                {responseFitm.data.description
                  ? responseFitm.data.description
                  : 'Описание отсутствует'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ md: 2 }}>
          <Typography variant="h6">В главных ролях</Typography>
          {responseStaff.data
            .filter((el) => el.professionText === 'Актеры')
            .slice(0, 10)
            .map(({ nameRu }) => (
              <Typography gutterBottom key={nameRu}>
                {nameRu}
              </Typography>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12}></Grid>
        <ButtonGroup variant="outlined" size="small">
          <Button
            target="_blank"
            href={responseFitm.data.webUrl}
            endIcon={<Language />}
          >
            Кинопоиск
          </Button>
          <Button
            target="_blank"
            href={`https://www.imdb.com/title//${responseFitm.data.imdbId}`}
            endIcon={<Movie />}
          >
            IMDB
          </Button>
        </ButtonGroup>

        <Grid xs={12}></Grid>
        <Typography textAlign="center" variant="h5">
          Смотреть онлайн
        </Typography>
        <VideoPlayer />
      </Grid>

      {responseSiquelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography variant="h5" gutterBottom>
            Сиквелы и приквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            {responseSiquelsAndPrequels.data.map((el) => (
              <MovieCard key={el.filmId} movie={el} reload />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default MovieDetail;
