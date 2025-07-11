import { CharacterInfo } from '../interfaces/person';

export const saveCharacter = (id: string, data: CharacterInfo) => {
  localStorage.setItem(`character_${id}`, JSON.stringify(data));
};

export const getSavedCharacter = (id: string): CharacterInfo | null => {
  const json = localStorage.getItem(`character_${id}`);
  if (!json) return null;

  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error parsing character data from localStorage:', error);
    return null;
  }
};
