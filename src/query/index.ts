import { Character } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export const getCharacters = async (): Promise<Array<Character>> => {
  const res = await fetch("https://hp-api.onrender.com/api/characters");

  return res.json();
};

export const charactersQuery = () =>
  queryOptions({
    queryKey: ["characters"],
    queryFn: getCharacters,
  });

export const favoriteCharactersQuery = (favoriteCharacterIds: string[]) =>
  queryOptions({
    ...charactersQuery(),
    enabled: favoriteCharacterIds.length > 0,
    select: (data) =>
      data.filter((character) => favoriteCharacterIds.includes(character.id)),
    placeholderData: [],
  });

export const getCharacterById = async (
  id: string
): Promise<Array<Character>> => {
  const res = await fetch(`https://hp-api.onrender.com/api/character/${id}`);

  return res.json();
};

export const characterByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    select: (data) => data[0],
  });
