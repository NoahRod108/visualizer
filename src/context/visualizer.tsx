"use client";

import {
  AnimationArrayType,
  SelectAlgorithmVisualType,
  SortingAlgorithmType,
} from "@/lib/types";
import { MAX_ANIMATION_SPEED, randomNumber } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArraySort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelecetedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  selectedVisual: SelectAlgorithmVisualType;
  setSelectedVisual: (visual: SelectAlgorithmVisualType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  runAnimation: (animations: AnimationArrayType) => void;
  resetAnimation: () => void;
  requireReset: boolean;
}

// Create the context
const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

// Create the Provider
export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArraySort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelecetedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");
  const [selectedVisual, setSelectedVisual] =
    useState<SelectAlgorithmVisualType>("graph");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requireReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetAnimation();
    // on window resize, change the array
    window.addEventListener("resize", resetAnimation);

    return () => {
      window.removeEventListener("resize", resetAnimation);
    };
  }, []);

  const resetAnimation = () => {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    // Create number of lines depending on width
    const numLines = contentContainerWidth / 12;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);

    // Loop through lines and give value
    for (let i = 0; i < numLines; i++) {
      tempArray.push(randomNumber(20, maxLineHeight));
    }

    setArraySort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);

    const arrayLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    setTimeout(() => {
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.remove("change-line-color");
        arrayLines[i].classList.add("default-line-color");
      }
    }, 0);
  };

  // Run selected algorithm animation
  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    };

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      if (newHeight === undefined) return;

      arrayLines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [values, isSwap] = animation;

        if (!isSwap) {
          updateClassList(values, "change-line-color", "default-line-color");

          setTimeout(() => {
            updateClassList(values, "default-line-color", "change-line-color");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;

          selectedVisual === "graph"
            ? updateHeightValue(lineIndex, newHeight)
            : updateHeightValue(lineIndex, undefined);
        }
      }, index * inverseSpeed);
    });
  };

  // Set values object
  const value = {
    arrayToSort,
    setArraySort,
    selectedAlgorithm,
    setSelecetedAlgorithm,
    selectedVisual,
    setSelectedVisual,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    runAnimation,
    resetAnimation,
    requireReset,
  };

  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);

  if (!context) {
    throw new Error("context must be used in a provider");
  }

  return context;
};
