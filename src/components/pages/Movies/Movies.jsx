import { Link, Stack } from '@mui/material';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerial,
    responseCartoons,
  } = useMoviesQuery();

  // TODO add skeleton
  if (isLoading) return <p>Loading...</p>;

  // TODO add error component
  if (hasError) return <p>Error message</p>;

  const serializeDataForCarousel = (data) =>
    data.map((row) => (
      <BearSlideImage key={row.id} imageUrl={row.posterUrlPreview} />
    ));

  const caruselArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForCarousel(responsePopular.data.items),
    },
  ];

  return (
    <div>
      <Stack>
        <Link
          sx={{ mt: 2, mb: 2 }}
          variant="h4"
          component={RouterLink}
          to={caruselArr[0].url}
        >
          {caruselArr[0].title}
        </Link>
        <BearCarousel
          data={caruselArr[0].data}
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
    </div>
  );
}
