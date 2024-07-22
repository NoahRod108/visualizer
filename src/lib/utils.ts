import { generateBubbleAnimation } from "@/algorithms/bubbleSort";
import { AnimationArrayType, SortingAlgorithmType } from "./types";

export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400;

export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const algorithmOptions = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
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
      break;
    case "quick":
      // generateQuickAnimation
      break;
    default:
      break;
  }
}
