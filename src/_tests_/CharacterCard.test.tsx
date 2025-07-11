import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';
import { UnifiedCharacter } from '../interfaces/person';

describe('CharacterCard', () => {
  const mockCharacter: UnifiedCharacter = {
    uid: '1',
    name: 'Luke Skywalker',
    url: 'https://swapi.tech/api/people/1',
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
  };

  it('should render character name', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render different character names', () => {
    const darthVader: UnifiedCharacter = {
      ...mockCharacter,
      uid: '4',
      name: 'Darth Vader',
      properties: {
        ...mockCharacter.properties,
        name: 'Darth Vader',
      },
    };

    render(<CharacterCard character={darthVader} />);
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('should render card with correct structure', () => {
    render(<CharacterCard character={mockCharacter} />);

    const card = screen.getByText('Luke Skywalker').closest('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });
});
