import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="aauto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={4} pt={1}>
        <Grid itemsize={{ xs: 12, md: 4 }}>
          <img
            src={data.posterUrl}
            style={{ width: '100%' }}
            alt={data.nameRu}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Stack flexDirection="row">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            ></Button>
            <Stack flexDirection="column">
              <Typography variant="h5">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h5">
            Об актере
          </Typography>
          <Grid container>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Карьера</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Рост</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>
                {data.birdhday} ({data.age} лет)
              </Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>{data.films.length}</Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Typography gutterBottom>Факты</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              {data.facts.map((fact, index) => (
                <Typography gutterBottom key={fact}>
                  {index + 1}.{fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Typography variant="h5">Фильм</Typography>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex((el) => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              flexDirection="row"
              justifyContent="left"
              gap="10px"
            >
              <Typography>{index + 1}.</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating ? film.rating : '-'}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
