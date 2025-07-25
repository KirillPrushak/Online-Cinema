import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

const movieTypes = {
  FILM: 'Фильм',
  TV_SERIES: 'Сериал',
  TV_SHOW: 'ТВ-Шоу',
  MINI_SERIAL: 'Мини-сериал',
};

export default function Search() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const [searchValue, setSearchValue] = useState('');

  const { genreId, type, page, keyword } = useSelector(
    (state) => state.searchQuerySlice,
  );

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 200);

    return () => clearTimeout(setTimeoutId);
  }, [input]);

  const { data, isFetching } = useGetFilmsQuery({
    genreId,
    type,
    page,
    keyword: input,
  });

  return (
    <Autocomplete
      freeSolo
      sx={{
        width: 300,
        background: 'rgba(255, 255, 255, 0.15',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
        },
      }}
      getOptionLabel={(option) =>
        `${option.nameRu} - ${movieTypes[option.type]}`
      }
      options={data ? data.items : []}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, value) => {
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
