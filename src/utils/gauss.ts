import { IGaussPoint } from "./models";

const getGaussArray = (count: number, min: number, max: number) => {
  let arr = getArrayRandomNumber(count, min, max),
    mathExpectation = getAverageNum(arr),
    averSqrtDeviation = getAverSqrtDeviation(arr),
    gaussArr: IGaussPoint[] = [],
    arrX: number[] = Array.from(new Set(arr));

  for (let elem of arrX) {
    gaussArr.push({
      x: elem,
      y: gaussFunction(averSqrtDeviation, elem, mathExpectation),
    });
  }
  return gaussArr.sort((a, b) => a.x - b.x);
};

function gaussFunction(
  averageSqrtDeviation: number,
  x: number,
  mathExpectation: number
) {
  return (
    (1 / (Math.sqrt(2 * Math.PI) * averageSqrtDeviation)) *
    Math.exp(-0.5 * ((x - mathExpectation) / averageSqrtDeviation) ** 2)
  );
}

const getDispersion = (arr: number[]): number => {
  return getAverSqrtDeviation(arr) ** 2;
};

const getAverSqrtDeviation = (arr: number[]): number => {
  let sum = 0,
    averNum = getAverageNum(arr);
  for (let i = 0; i < arr.length; i++) {
    sum += Math.abs(arr[i] - averNum) ** 2;
  }
  return Math.sqrt(sum / arr.length);
};

const getAverageDeviation = (arr: number[]): number => {
  let sum = 0,
    averNum = getAverageNum(arr);
  for (let i = 0; i < arr.length; i++) {
    sum += Math.abs(averNum - arr[i]);
  }
  return sum / arr.length;
};

function getAverageNum(arr: number[]): number {
  let sum = arr.reduce((prev, curr) => (prev += curr));
  return sum / arr.length;
}

function getRandomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getArrayRandomNumber(
  count: number,
  min: number,
  max: number
): number[] {
  let arr: number[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
}

export default {
  getGaussArray,
  gaussFunction,
  getDispersion,
  getAverSqrtDeviation,
  getAverageDeviation,
  getAverageNum,
  getRandomInt,
  getArrayRandomNumber,
};
