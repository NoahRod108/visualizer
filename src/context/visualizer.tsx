"use client";

import { SortingAlgorithmType } from "@/lib/types";
import { MAX_ANIMATION_SPEED, randomNumber } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArraySort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelecetedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
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

    for (let i = 0; i < numLines; i++) {
      tempArray.push(randomNumber(35, maxLineHeight));
    }

    setArraySort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);
  };

  // Run selected algorithm
  const runAnimation = () => {};

  // Set values object
  const value = {
    arrayToSort,
    setArraySort,
    selectedAlgorithm,
    setSelecetedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    runAnimation,
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
