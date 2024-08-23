import { useRecoilValue } from "recoil";
import styles from "./User.module.css";
import { favoriteCharactersState } from "@/state";
import { useQuery } from "@tanstack/react-query";
import { favoriteCharactersQuery } from "@/query";
import { FavoriteCharacterList } from "@/components/FavoriteCharacterList";
import { SelectedHouse } from "@/components/SelectedHouse";

export const User = () => {
  const favoriteCharacterIds = useRecoilValue(favoriteCharactersState);

  const {
    data: favoriteCharacters,
    isPending,
    isError,
  } = useQuery(favoriteCharactersQuery(favoriteCharacterIds));

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Selected house: </h2>
      <SelectedHouse />

      <h2 className={styles.title}>Favorite characters: </h2>
      <FavoriteCharacterList characters={favoriteCharacters} />
    </div>
  );
};
