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

export default function SelectMovies() {
  return (
    <Stack
      mt={2}
      mb={2}
      sx={{ flexDirection: { sm: 'columm', md: 'row' }, gap: 1 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Сортировка</InputLabel>
        <Select label="Age">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select label="Genre">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Button variant="outlined" startIcon={<CloseIcon />}>
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
}
