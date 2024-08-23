import { House } from "@/types";
import { atom } from "recoil";

export const favoriteCharactersState = atom<Array<string>>({
  key: "favoriteCharactersState",
  default: [],
});

export const selectedHouseState = atom<House>({
  key: "selectedHouseState",
  default: "Gryffindor",
});
