import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UnifiedCharacter } from '../interfaces/person';

const CharacterCard = ({ character }: { character: UnifiedCharacter }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/character/${character.uid}`)}>
      <Card sx={{ width: 350 }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6">{character.name}</Typography>
        </CardContent>
      </Card>
    </Card>
  );
};

export default CharacterCard;
