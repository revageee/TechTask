import { useEffect, useState } from 'react';
import { getCharacters } from '../../services/api';
import CharacterCard from '../../components/CharacterCard';
import {
  Grid,
  Pagination,
  TextField,
  MenuItem,
  Select,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UnifiedCharacter } from '../../interfaces/person';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState<UnifiedCharacter[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, pageSize]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCharacters(page, pageSize, debouncedSearch);
      setCharacters(res?.results);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="1200px" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" mb={2} textAlign="center" fontWeight={600}>
          Star Wars Characters
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField
            label="Search characters"
            variant="outlined"
            size="medium"
            value={search}
            disabled={loading}
            onChange={handleChange}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ flex: 1, minWidth: 200 }}
            placeholder="Enter name..."
            autoFocus
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="page-size-label">Items per page</InputLabel>
            <Select
              labelId="page-size-label"
              value={pageSize}
              label="Items per page"
              disabled={loading}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[6, 12, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {loading ? (
          <Typography
            variant="body1"
            sx={{ width: '100%', textAlign: 'center', mt: 5 }}
          >
            Loading...
          </Typography>
        ) : characters.length > 0 ? (
          characters.map((char) => (
            <Grid key={char.uid}>
              <CharacterCard character={char} />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ width: '100%', textAlign: 'center', mt: 5 }}
          >
            No characters found.
          </Typography>
        )}
      </Grid>

      <Box mt={5} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, p) => {
            setPage(p);
            setSearch('');
          }}
          shape="rounded"
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          disabled={loading}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
