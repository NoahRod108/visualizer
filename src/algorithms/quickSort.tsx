import { AnimationArrayType } from "@/lib/types";

function partition(
  array: number[],
  begin: number,
  end: number,
  animations: AnimationArrayType
) {
  let i = begin;
  let j = end + 1;
  const condition = true;
  const pivot = array[begin];

  while (condition) {
    while (array[++i] <= pivot) {
      if (i === end) break;

      animations.push([[i], false]);
    }
    while (array[--j] >= pivot) {
      if (j === begin) break;

      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, array[j]], true]);
    animations.push([[j, array[i]], true]);

    [array[i], array[j]] = [array[j], array[i]];
  }
  animations.push([[begin, array[j]], true]);
  animations.push([[j, array[begin]], true]);

  [array[begin], array[j]] = [array[j], array[begin]];

  console.log(j);
  return j;
}

function runQuickort(
  array: number[],
  begin: number,
  end: number,
  animations: AnimationArrayType
) {
  if (begin < end) {
    console.log(begin, end);
    const part = partition(array, begin, end, animations);

    runQuickort(array, begin, part - 1, animations);
    runQuickort(array, part + 1, end, animations);
  }
}

export function generateQuickAnimation(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return array;

  const animations: AnimationArrayType = [];
  const tempArray = array;

  runQuickort(tempArray, 0, array.length - 1, animations);
  runAnimation(animations);
}
