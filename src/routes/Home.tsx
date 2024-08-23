import { useQuery } from "@tanstack/react-query";
import styles from "./Home.module.css";
import { charactersQuery } from "@/query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [search, setSearch] = useState("");

  const { data: characters, isPending } = useQuery(charactersQuery());

  const filteredCharacters = useMemo(() => {
    if (!characters) {
      return [];
    }

    return characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.searchWrapper}>
        Search characters
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          placeholder="Type to search..."
        />
      </label>

      <ul className={styles.list}>
        {isPending ? (
          <>loading...</>
        ) : (
          filteredCharacters.map((character) => (
            <li key={character.id} className={styles.listItem}>
              <Link to={`/${character.id}`} className={styles.listLink}>
                {character.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
