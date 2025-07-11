import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CharacterPage from '../pages/characterInfo/CharacterPage';
import { getCharacterById } from '../services/api';
import { getSavedCharacter, saveCharacter } from '../utils/localStorageUtils';

jest.mock('../services/api');
const mockedGetCharacterById = getCharacterById as jest.MockedFunction<
  typeof getCharacterById
>;

jest.mock('../utils/localStorageUtils');
const mockedGetSavedCharacter = getSavedCharacter as jest.MockedFunction<
  typeof getSavedCharacter
>;
const mockedSaveCharacter = saveCharacter as jest.MockedFunction<
  typeof saveCharacter
>;

describe('CharacterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockedGetSavedCharacter.mockReturnValue(null);
    mockedGetCharacterById.mockResolvedValue({
      uid: '1',
      _id: '1',
      description: 'Luke Skywalker',
      properties: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        mass: '77',
        skin_color: 'fair',
        homeworld: 'Tatooine',
        films: ['A New Hope'],
        species: ['Human'],
        starships: ['X-wing'],
        vehicles: ['Snowspeeder'],
        url: 'https://swapi.tech/api/people/1',
      },
    });

    render(<CharacterPage />);
    expect(screen.getByText('Loading character data...')).toBeInTheDocument();
  });

  it('should render back button after loading', async () => {
    mockedGetSavedCharacter.mockReturnValue(null);
    mockedGetCharacterById.mockResolvedValue({
      uid: '1',
      _id: '1',
      description: 'Luke Skywalker',
      properties: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        eye_color: 'blue',
        gender: 'male',
        hair_color: 'blond',
        height: '172',
        mass: '77',
        skin_color: 'fair',
        homeworld: 'Tatooine',
        films: ['A New Hope'],
        species: ['Human'],
        starships: ['X-wing'],
        vehicles: ['Snowspeeder'],
        url: 'https://swapi.tech/api/people/1',
      },
    });

    render(<CharacterPage />);

    await waitFor(() => {
      expect(screen.getByText('← Back')).toBeInTheDocument();
    });
  });
});
