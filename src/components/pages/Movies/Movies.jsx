import { Link, Stack } from '@mui/material';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import ErrorMessage from '../../ui/ErrorMessage';

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  // TODO add skeleton
  if (isLoading) return <p>Loading...</p>;

  if (!hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (data) =>
    data.map((row) => (
      <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrlPreview} />
      </RouterLink>
    ));

  const caruselArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];

  return (
    <>
      {caruselArr.map((carusel) => (
        <Stack key={carusel.title}>
          <Link
            sx={{ mt: 2, mb: 2 }}
            variant="h4"
            component={RouterLink}
            to={carusel.url}
          >
            {carusel.title}
          </Link>
          <BearCarousel
            data={carusel.data}
            // Количество фильмов на экране
            slidesPerView={1}
            // Скорость прокрутки
            slidesPerGroup={1}
            // Кнопки для прокрутки
            isEnableNavButton
            // Бесконечная прокрутка
            isEnableLoop
            // Автопрокрутка
            isEnableAutoPlay
            autoPlayTime={5000}
            // Количество фильмов на мобильном экране
            breakpoints={{
              375: {
                autoPlayTime: 0,
              },
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
}
