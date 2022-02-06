export const combineCorrespondingIndexes = (array1, array2, arr2key = null) => {
  return array1.map((item, index) => ({
    ...item,
    ...(arr2key ? array2[index][arr2key] : array2[index]),
  }));
};
