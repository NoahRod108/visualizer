import { createContext } from "react";

interface SortingAlgorithmType {}

const SortingAlgorithmContext = createContext<SortingAlgorithmType | undefined>(
  undefined
);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SortingAlgorithmContext.Provider value={{}}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};
