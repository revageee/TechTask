export const saveCharacter = (id: string, data: any) => {
  localStorage.setItem(`character_${id}`, JSON.stringify(data));
};

export const getSavedCharacter = (id: string) => {
  const json = localStorage.getItem(`character_${id}`);
  return json ? JSON.parse(json) : null;
};
