import { readTxtFile } from "../../../utils/readTxtFile.mjs";

async function checkFewestCubes() {
  try {
    const rawTxtList = await readTxtFile("../2023/p_3/inputs.txt");
    const listOfGames = getListOfGames(rawTxtList);

    const powerCol = [];

    listOfGames.forEach((game) => {
      const playedCubes = {
        red: 0,
        green: 0,
        blue: 0,
      };

      Object.entries(game).forEach(([gameId, plays]) => {
        plays.forEach((play) => {
          const cubes = play.split(", ");
          cubes.forEach((cube) => {
            const [number, colour] = cube.split(" ");

            playedCubes[colour] = Math.max(number, playedCubes[colour]);
          });
        });

      });
      let multiply = 1;
      for (const key in playedCubes) {
        multiply *= playedCubes[key];
      }
      powerCol.push(multiply);
      //game
    });

    const sum = powerCol.reduce((acc, cur) => {
      return acc + parseInt(cur);
    }, 0);

    return sum;
  } catch (err) {
    console.log(err);
  }
}

function getListOfGames(txtList) {
  const listOfGames = txtList.map((game) => {
    const gameSplit = game.split(":");
    const key = gameSplit[0].substring(5).trim();
    const value = gameSplit[1].trim().split("; ");

    const obj = {};
    obj[key] = value;
    return obj;
  });
  return listOfGames;
}

checkFewestCubes().then((res) => {
  console.log(res);
});
