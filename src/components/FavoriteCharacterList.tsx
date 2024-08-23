import { Character } from "@/types";
import styles from "./FavoriteCharacterList.module.css";
import { favoriteCharactersState } from "@/state";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { XIcon } from "./XIcon";

export const FavoriteCharacterList = ({
  characters,
}: {
  characters: Array<Character>;
}) => {
  const setFavorites = useSetRecoilState(favoriteCharactersState);

  const toggleFavorite = (characterId: string) => {
    setFavorites((prev) => prev.filter((favorite) => favorite !== characterId));
  };

  if (characters.length === 0) {
    return <div>No favorite characters</div>;
  }

  return (
    <ul className={styles.wrapper}>
      {characters.map((character) => (
        <li key={character.id} className={styles.listItem}>
          <Link to={`/${character.id}`} className={styles.link}>
            {character.name}
          </Link>

          <button
            onClick={() => toggleFavorite(character.id)}
            className={styles.button}
          >
            <XIcon />
          </button>
        </li>
      ))}
    </ul>
  );
};
