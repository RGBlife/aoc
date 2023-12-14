import { readFileSync } from "fs";

type Rule = { [key: string]: string[] };
type RulesMap = Rule[];
type Instructions = string[];

const content = readFileSync("data/day_8_inputs.txt", "utf8");
const testData = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const parseData = (
  data: string
): { instructions: Instructions; rulesMap: RulesMap } => {
  const lines = data.split("\n").map((line) => line.split(" = "));
  const instructions = lines.shift()![0].split("");
  lines.shift();

  const rulesMap = lines.reduce<RulesMap>((acc, line) => {
    const key = line[0];
    const value = line[1].replace(/[()]/g, "").split(", ");
    acc.push({ [key]: value });
    return acc;
  }, []);

  return { instructions, rulesMap };
};

const part1 = (instructions: Instructions, rulesMap: RulesMap): number => {
  let steps = 0;
  let current = "AAA";

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];

    if (current !== "ZZZ") {
      for (let rule of rulesMap) {
        if (rule.hasOwnProperty(current)) {
          const [L, R] = rule[current];
          current = instruction === "L" ? L : R;
          break;
        }
      }
      steps++;
    } else {
      return steps;
    }

    if (i === instructions.length - 1) {
      i = -1;
    }
  }

  return steps;
};
const { instructions, rulesMap } = parseData(content);
console.log("Steps to ZZZ:", part1(instructions, rulesMap));
