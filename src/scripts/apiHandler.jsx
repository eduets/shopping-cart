export { useGameData };
import { useState, useEffect } from "react";

function buildGameData(results) {
  const IGNORE_NAMES = ["mobile", "wolf"];
  const newGameData = {};
  let currentId = 1;
  for (const result of results) {
    if ("id" in result && "name" in result && "background_image" in result) {
      const targetName = result.name.toLowerCase();
      let ignore = false;
      for (const ignoreName of IGNORE_NAMES) {
        if (targetName.includes(ignoreName)) {
          ignore = true;
          break;
        }
      }
      if (ignore) {
        continue;
      }
      let targetPrice = 40;
      if (targetName.includes("elden")) {
        targetPrice = 60;
      } else if (targetName.includes("souls")) {
        targetPrice = 50;
      } else if (targetName.includes("sekiro")) {
        targetPrice = 45;
      } else if (targetName.includes("bloodborne")) {
        targetPrice = 55;
      }
      newGameData[currentId] = {
        name: result.name,
        image: result.background_image,
        price: targetPrice,
      };
      currentId += 1;
    } else {
      continue;
    }
  }
  return newGameData;
}

function useGameData() {
  const [gameData, setGameData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "3cb1824a8b384ceb950749f3a7a62a5f";
  const developer = "fromsoftware";
  const dates = "2009-01-01,2025-12";
  const ordering = "-released";
  const fetchURL = `https://api.rawg.io/api/games?developers=${developer}&dates=${dates}&ordering=${ordering}&key=${API_KEY}`;

  useEffect(() => {
    fetch(fetchURL, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((response) => {
        if (
          "results" in response &&
          Array.isArray(response.results) &&
          response.results.length > 0
        ) {
          setGameData(buildGameData(response.results));
        } else {
          throw new Error("Incorrect response");
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { gameData, error, loading };
}

// function useGameDataMock() {
//   const newGameData = {
//     1: {
//       name: "Elden Ring Nightreign",
//       image:
//         "https://media.rawg.io/media/games/a14/a143ef815d323a3000840fc774d834c7.jpg",
//       price: 60,
//     },
//     2: {
//       name: "Elden Ring",
//       image:
//         "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
//       price: 60,
//     },
//     3: {
//       name: "Dark Souls",
//       image:
//         "https://media.rawg.io/media/games/29c/29c6c21cc0c78cff6f45d23631cc82f4.jpg",
//       price: 50,
//     },
//   };

//   return { gameData: newGameData, error: null, loading: false };
// }
