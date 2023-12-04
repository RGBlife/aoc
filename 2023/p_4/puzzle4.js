import { readTxtFile } from "../../utils/readTxtFile.mjs";const allocatedCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

async function checkPossibleGames() {
  const rawTxtList = await readTxtFile("../2023/p_3/inputs.txt");
  const listOfGames = getListOfGames(rawTxtList);

  const possibleGamesIds = [];

  listOfGames.forEach((game) => {
    Object.entries(game).forEach(([gameId, plays]) => {
      if (!isGameImpossible(plays)) {
        possibleGamesIds.push(gameId);
      }
    });
  });