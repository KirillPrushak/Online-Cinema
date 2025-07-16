import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useDispatch } from 'react-redux';

import { resetQuery, selectQuery } from '../../../features/currentQuerySlice';

export default function SelectMovies({
  countriesList,
  genresList,
  countries,
  order,
  year,
  genreId,
}) {
  const dispatch = useDispatch();

  const ordersList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По оценкам', value: 'NUM_VOTE' },
  ];

  return (
    <Stack
      mt={2}
      mb={2}
      sx={{ flexDirection: { sm: 'columm', md: 'row' }, gap: 1 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={order}
          onChange={(e) => dispatch(selectQuery({ order: e.target.value }))}
        >
          {ordersList.map((order) => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          value={genreId}
          onChange={(e) => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {genresList.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button
          onClick={() => dispatch(resetQuery())}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}
