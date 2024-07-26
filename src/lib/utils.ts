import { generateBubbleAnimation } from "@/algorithms/bubbleSort";
import { AnimationArrayType, SortingAlgorithmType } from "./types";
import { generateMergeAnimation } from "@/algorithms/mergeSort";
import { generateQuickAnimation } from "@/algorithms/quickSort";

export const MIN_ANIMATION_SPEED = 50;
export const MAX_ANIMATION_SPEED = 200;

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
];

export const algorithmVisualOptions = [
  { label: "Graph", value: "graph" },
  { label: "Blocks", value: "blocks" },
];

export function generateAnimation(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      // generateBubbleAnimation
      generateBubbleAnimation(isSorting, array, runAnimation);
      break;
    case "merge":
      // generateMergeAnimation
      generateMergeAnimation(isSorting, array, runAnimation);
      break;
    case "quick":
      // generateQuickAnimation
      generateQuickAnimation(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}
