import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById } from '../../services/api';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import {
  getSavedCharacter,
  saveCharacter,
} from '../../utils/localStorageUtils';
import { CharacterInfo } from '../../interfaces/person';

const CharacterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    const local = getSavedCharacter(id!);
    if (local) {
      setCharacter(local);
    } else {
      const res = await getCharacterById(id!);
      setCharacter(res.properties);
      setDescription(res.description);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!character) return;
    const name = e.target.name as keyof CharacterInfo;
    const value = e.target.value;

    setCharacter({
      ...character,
      [name]: value,
    });
  };

  const handleSave = () => {
    saveCharacter(id!, character);
  };

  if (!character)
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6">Loading character data...</Typography>
      </Box>
    );

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        ← Back
      </Button>
      <Box maxWidth="600px" mx="auto" mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" mb={3} fontWeight={600} textAlign="center">
            {description}
          </Typography>
          <Typography variant="h5" mb={3} fontWeight={400} textAlign="center">
            Edit Character
          </Typography>
          <Stack spacing={3}>
            <TextField
              name="name"
              label="Name"
              value={character.name || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="gender"
              label="Gender"
              value={character.gender || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="skin_color"
              label="Skin Color"
              value={character.skin_color || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="hair_color"
              label="Hair Color"
              value={character.hair_color || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="mass"
              label="Mass"
              value={character.mass || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="eye_color"
              label="Eye Color"
              value={character.eye_color || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="birth_year"
              label="Birth Year"
              value={character.birth_year || ''}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Stack>

          <Box mt={4} textAlign="center">
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              size="large"
              sx={{ minWidth: '150px' }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default CharacterPage;
