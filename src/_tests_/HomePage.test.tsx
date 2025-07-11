import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/home/HomePage';
import { getCharacters } from '../services/api';

jest.mock('../services/api');

const mockedGetCharacters = getCharacters as jest.MockedFunction<
  typeof getCharacters
>;

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render title and search bar', async () => {
    mockedGetCharacters.mockResolvedValue({
      results: [],
      totalPages: 0,
    });

    render(<HomePage />);

    expect(await screen.findByText('Star Wars Characters')).toBeInTheDocument();
    expect(screen.getByLabelText('Search characters')).toBeInTheDocument();
    expect(screen.getByLabelText('Items per page')).toBeInTheDocument();
  });

  it('should render loading state initially', () => {
    mockedGetCharacters.mockImplementation(() => new Promise(() => {}));
    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
