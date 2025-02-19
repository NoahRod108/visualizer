"use client";

import { useSortingAlgorithmContext } from "@/context/visualizer";

export default function Home() {
  const { arrayToSort, selectedVisual } = useSortingAlgorithmContext();

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="container-xl lg:container m-auto">
        <div className="flex h-full justify-center">
          <div
            id="content-container"
            className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
          >
            <div className="relative h-[calc(100vh-66px)] w-full">
              <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end flex-wrap">
                {arrayToSort.map((value, index) =>
                  selectedVisual === "graph" ? (
                    <div
                      key={index}
                      className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                      style={{ height: `${value}px` }}
                    ></div>
                  ) : (
                    <div
                      key={index}
                      className="flex justify-center array-line w-1 m-1 py-4 px-8 border shadow-lg opacity-70 rounded-lg default-line-color"
                    >
                      {value}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
