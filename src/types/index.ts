export type House = "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw";

export type Character = {
  id: string;
  name: string;
  house: House;
  image: string;
  dateOfBirth: string;
};
