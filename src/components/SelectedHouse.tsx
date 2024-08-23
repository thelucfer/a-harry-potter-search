import { useRecoilState } from "recoil";
import styles from "./SelectedHouse.module.css";
import { selectedHouseState } from "@/state";
import { House } from "@/types";
import { KeyboardEvent, useId, useState } from "react";

export const SelectedHouse = () => {
  const houses: Array<House> = [
    "Gryffindor",
    "Hufflepuff",
    "Ravenclaw",
    "Slytherin",
  ];

  const [selectedHouse, setSelectedHouse] = useRecoilState(selectedHouseState);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(-1);
  const radioId = useId();

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        setFocusedButtonIndex((prev) => {
          if (prev === houses.length - 1) return 0;

          return prev + 1;
        });

        break;
      }
      case "ArrowUp": {
        setFocusedButtonIndex((prev) => {
          if (prev === 0) return houses.length - 1;

          return prev - 1;
        });

        break;
      }

      case " ": {
        setSelectedHouse(houses[focusedButtonIndex]);

        break;
      }

      default:
        break;
    }
  };

  return (
    <ul
      className={styles.wrapper}
      role="radiogroup"
      aria-activedescendant={`${radioId}-${houses[focusedButtonIndex]}`}
      tabIndex={0}
      onFocus={() => setFocusedButtonIndex(0)}
      onBlur={() => setFocusedButtonIndex(-1)}
      onKeyDown={handleKeyDown}
    >
      {houses.map((house, index) => (
        <li
          className={styles.listItem}
          role="radio"
          key={house}
          aria-checked={house === selectedHouse}
          onClick={() => {
            setFocusedButtonIndex(index);
            setSelectedHouse(house);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Space") return;

            setSelectedHouse(house);
          }}
          id={`${radioId}-${house}`}
          data-focused={focusedButtonIndex === index}
        >
          {house}
        </li>
      ))}
    </ul>
  );
};
