"use client";

import { Select } from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { useSortingAlgorithmContext } from "@/context/visualizer";
import { SortingAlgorithmType, SelectAlgorithmVisualType } from "@/lib/types";
import {
  algorithmOptions,
  algorithmVisualOptions,
  generateAnimation,
} from "@/lib/utils";

const Nav = () => {
  const {
    arrayToSort,
    isSorting,
    animationSpeed,
    setAnimationSpeed,
    selectedAlgorithm,
    setSelecetedAlgorithm,
    selectedVisual,
    setSelectedVisual,
    requireReset,
    resetAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelecetedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  const handleSelectVisualChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVisual(e.target.value as SelectAlgorithmVisualType);
  };

  const handlePlay = () => {
    if (requireReset) {
      resetAnimation();
      return;
    }

    // Make generation array
    generateAnimation(selectedAlgorithm, isSorting, arrayToSort, runAnimation);
  };

  return (
    <>
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="h-[166px] relative flex items-center lg:justify-between justify-center w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">
              Visualizer
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <Select
                options={algorithmVisualOptions}
                defaultValue={selectedVisual}
                onChange={handleSelectVisualChange}
              />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requireReset ? "Reset" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
