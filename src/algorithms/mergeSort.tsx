import { AnimationArrayType } from "@/lib/types";

function merge() {}

function runMergeSort(array: number[]) {
  console.log(array);
}

export function generateMergeAnimation(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (array.length <= 1) return [];
  if (isSorting) return;

  const tempArray = array.slice();
  const animations = runMergeSort(tempArray);

  runAnimation(animations);
}
