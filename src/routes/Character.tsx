import { Link, Navigate, useParams } from "react-router-dom";
import styles from "./Character.module.css";
import { useQuery } from "@tanstack/react-query";
import { characterByIdQuery } from "@/query";
import { HeartIcon } from "@/components/HeartIcon";
import { useRecoilState } from "recoil";
import { favoriteCharactersState } from "@/state";
import clsx from "clsx";

export const Character = () => {
  const { characterId } = useParams<{ characterId: string }>();

  const [favorites, setFavorites] = useRecoilState(favoriteCharactersState);

  const {
    data: character,
    isPending,
    isError,
  } = useQuery(characterByIdQuery(characterId ?? ""));

  const isFavorite = () => {
    if (!character) return false;

    return favorites.includes(character.id);
  };

  const toggleFavorite = () => {
    if (!character) return;

    if (favorites.includes(character.id)) {
      setFavorites((prev) =>
        prev.filter((favorite) => favorite !== characterId)
      );
    }

    setFavorites((prev) => [...prev, character.id]);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!characterId || (!isPending && !character) || isError) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{character.name}</h2>

        <button
          type="button"
          className={clsx({
            [styles.button]: true,
            [styles.buttonFavorite]: isFavorite(),
          })}
          onClick={toggleFavorite}
        >
          <HeartIcon />
        </button>

        <img
          src={character.image}
          alt={character.name}
          className={styles.image}
        />

        <dl className={styles.details}>
          <dt className={styles.detailsTitle}>House: </dt>
          <dd>{character.house}</dd>
          <dt className={styles.detailsTitle}>Date of Birth: </dt>
          <dd className={styles.detailInfo}>
            {character.dateOfBirth ?? "unknown"}
          </dd>
        </dl>
      </div>

      <Link to="/" className={styles.link}>
        Back to home
      </Link>
    </div>
  );
};
