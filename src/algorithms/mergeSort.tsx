import { AnimationArrayType } from "@/lib/types";

function merge(
  array: number[],
  begin: number,
  middle: number,
  end: number,
  animations: AnimationArrayType
) {
  // split array in half
  const left = array.slice(begin, middle);
  const right = array.slice(middle, end);
  let i = 0;
  let j = 0;
  let k = begin;

  while (i < left.length && j < right.length) {
    animations.push([[begin + i, middle + j], false]);

    if (left[i] <= right[j]) {
      animations.push([[k, left[i]], true]);
      array[k] = left[i];
      i += 1;
    } else {
      animations.push([[k, right[j]], true]);
      array[k] = right[j];
      j += 1;
    }
    k++;
  }

  while (i < left.length) {
    animations.push([[begin + i], false]);
    animations.push([[k, left[i]], true]);

    array[k] = left[i];
    i += 1;
    k += 1;
  }
  while (j < right.length) {
    animations.push([[middle + j], false]);
    animations.push([[k, right[j]], true]);
    array[k] = right[j];
    j += 1;
    k += 1;
  }
}

function runMergeSort(array: number[]) {
  const animations: AnimationArrayType = [];

  // Split array into beginning, middle, and end for merge function
  for (let i = 1; i < array.length; i = 2 * i) {
    for (let j = 0; j < array.length; j += 2 * i) {
      const begin = j;
      const middle = j + i;
      const end = Math.min(j + 2 * i, array.length);

      merge(array, begin, middle, end, animations);
    }
  }

  return animations;
}

export function generateMergeAnimation(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (array.length <= 1) return [];
  if (isSorting) return;

  const tempArray = array;
  const animations = runMergeSort(tempArray);

  runAnimation(animations);
}
