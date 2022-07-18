import * as IPFS from "ipfs-core";
import { createContext, ReactNode, useContext, useState } from "react";

type ipfsContextType = {
  isPushingData: boolean;
  isPullingData: boolean;
  pushData: Function;
  pullData: Function;
};

interface ProviderProps {
  children: ReactNode;
}

export function IPFSProvider({ children }: ProviderProps) {
  const [pushData, setPushData] = useState();
  const [pullData, setPullData] = useState();

  const initIPFS = async () => {
    const ipfs = await IPFS.create();
  };

  return (
    <>
      <IPFSContext.Provider
        value={{
          isPushingData: false,
          isPullingData: false,
          pushData: ({ json }) => {},
          pullData: ({ cid }) => {},
        }}
      >
        {children}
      </IPFSContext.Provider>
    </>
  );
}

export function useIPFSContext() {
  return useContext(IPFSContext);
}

const IPFSContext = createContext<ipfsContextType>(undefined);
