import { create } from "ipfs-http-client";
import { createContext, ReactNode, useContext, useState } from "react";
import { SurveyQuestionsData } from "../../components/Survey";

type ipfsContextType = {
  isPushingData: boolean;
  isPullingData: boolean;
  pushData: Function;
  pullData: Function;
};

interface ProviderProps {
  children: ReactNode;
}

interface EncodeData {
  surveyTitle: string;
  description: string;
  dateCreated: string;
  questions: SurveyQuestionsData[];
}

export function IPFSProvider({ children }: ProviderProps) {
  const [isPushingData, setIsPushingData] = useState<boolean>(false);
  const [isPullingData, setIsPullingData] = useState<boolean>(false);

  const pushData = async (json: EncodeData) => {
    console.log(
      json,
      process.env.IPFS_PROJEC_ID,
      process.env.IPFS_URL,
      process.env.IPFS_PROJECT_SECRET
    );
    setIsPushingData(true);
    const ipfsClient = create({
      url: `${process.env.IPFS_URL}/api/v0`,
      headers: {
        authorization: `Bearer ${process.env.IPFS_PROJEC_ID}:${process.env.IPFS_PROJECT_SECRET}`,
      },
    });
    const cid = await ipfsClient.dag.put(json as object, {
      storeCodec: "dag-cbor",
      hashAlg: "sha2-256",
    });
    console.log(cid.toString(), "CID after IPFS call");
    setIsPushingData(false);
    return cid.toString();
  };
  const pullData = async ({ cid }) => {
    setIsPullingData(true);
    const ipfsClient = create({
      url: `${process.env.IPFS_URL}/api/v0`,
      headers: {
        authorization: `Bearer ${process.env.IPFS_PROJEC_ID}:${process.env.IPFS_PROJECT_SECRET}`,
      },
    });
    const json = await ipfsClient.dag.get(cid);
    console.log(json, json.value, "JSON after IPFS call");
    setIsPullingData(false);
    return json.value;
  };

  return (
    <>
      <IPFSContext.Provider
        value={{
          isPushingData,
          isPullingData,
          pushData,
          pullData,
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
