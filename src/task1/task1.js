const nums = "143163421154143";
const predefinedNumbers = ["21154", "143", "21154143", "1634", "163421154"];

const getSeparatorRegex = (separator) => {
  return new RegExp(`^(.*?)${separator}(.*)$`);
};

const findPredefinedNumbers = (str, separator) => {
  const separatorRegex = getSeparatorRegex(separator);
  const newRange = str.match(separatorRegex);

  if (!newRange) {
    return [];
  }

  const [left, right] = newRange.slice(1);

  if (left === str) {
    return [];
  }

  const leftRest = predefinedNumbers
    .flatMap((number) => findPredefinedNumbers(left, number))
    .filter(Boolean);

  const rightRest = predefinedNumbers
    .flatMap((number) => findPredefinedNumbers(right, number))
    .filter(Boolean);

  if (!leftRest.length) {
    leftRest.push("");
  }

  if (!rightRest.length) {
    rightRest.push("");
  }

  return leftRest.flatMap((leftRestItem) => {
    return rightRest.map((rightRestItem) => {
      return `${leftRestItem ? leftRestItem + ":" : ""}${separator}${
        rightRestItem ? ":" + rightRestItem : ""
      }`;
    });
  });
};

const result = Array.from(
  new Set(
    predefinedNumbers.flatMap((number) => findPredefinedNumbers(nums, number))
  )
);

console.log(result);
