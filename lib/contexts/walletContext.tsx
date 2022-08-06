import { Contract, ethers } from "ethers";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useQueries, useQueryClient } from "react-query";
import {
  CONTRACT_ABI,
  SURVEY_ABI_NEW,
  SURVEY_ADDRESS,
  SURVEY_ADDRESS_NEW,
  SURVEY_MARKETPLACE_ABI,
  SURVEY_MARKETPLACE_ADDRESS,
  SURVEY_NFT_ABI,
  SURVEY_NFT_ADDRESS,
  TOKEN_ADDRESS,
} from "../contract/config";
import { getSonergyBalance, getUserWalletAddresses } from "../queries";

export const MIN_WITHDRAW = 10;

type walletContextType = {
  isFetchingBalance: boolean;
  address: string;
  inBuiltAddress: string;
  setAddress: Dispatch<SetStateAction<string>>;
  sonergyBalance: BalanceData;
  provider: string;
  setProvider: Dispatch<SetStateAction<any>>;
  setSigner: Dispatch<SetStateAction<any>>;
  tokenContract: Contract;
  surveyContract: Contract;
  surveyNFTContract: Contract;
  surveyMarketPlaceContract: Contract;
  approveSpend: Function;
  setSonergyBalance: Dispatch<SetStateAction<BalanceData>>;
};

type Props = {
  children: ReactNode;
};

export interface BalanceData {
  USD: number;
  sonergy: string;
  symbol: string;
}

export function WalletProvider({ children }: Props): JSX.Element {
  const queryClient = useQueryClient();
  const [{ token }] = useCookies(["token"]);

  // States
  const [address, setAddress] = useState<string | undefined>();
  const [inBuiltAddress, setInbuiltAddress] = useState<string | undefined>();
  const [tokenContract, setTokenContract] = useState<Contract>();
  const [surveyContract, setSurveyContract] = useState<Contract>();
  const [surveyNFTContract, setSurveyNFTContract] = useState<Contract>();
  const [surveyMarketPlaceContract, setSurveyMarketPlaceContract] =
    useState<Contract>();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [sonergyBalance, setSonergyBalance] = useState<BalanceData | undefined>(
    {
      USD: 0,
      sonergy: "0",
      symbol: "SNEGY",
    }
  );

  // Create queries for the In built balance and wallet return address
  const [{ isLoading: isBalanceLoading }] = useQueries([
    {
      //Get inbuilt address and return to address
      queryKey: ["getInbuiltAddress", token],
      queryFn: () => getUserWalletAddresses(token),
      onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getInbuiltUserAddress"
        // );

        if (success && !address)
          setInbuiltAddress(
            data?.find((val) => val.walletType === "BSC").address
          );
      },
      onError(err) {
        console.error(err, "Error occurred while getSonergyBalance called");
      },
    },
    {
      //Get balance, if connected get connected balance else get inbuilt balance
      queryKey: ["getSonergyBalance", token, address || inBuiltAddress],
      queryFn: () =>
        getSonergyBalance({ token, address: address || inBuiltAddress }),
      onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getSonergyBalance"
        // );

        if (success)
          setSonergyBalance(
            data?.filter((val) => val.symbol === "SNEGYTEST")[0]
          );
      },
      onError(err) {
        console.error(err, "Error occurred while getSonergyBalance called");
      },
    },
  ]);

  const approveSpend = async (amount: string) => {
    // approve spend for user
    if (tokenContract && typeof tokenContract !== "undefined") {
      const data = await tokenContract?.approve(
        SURVEY_ADDRESS,
        ethers.utils.parseUnits(amount, 18)
      );
      console.log(data, "Data of spending approval");
      return data;
    } else {
      return false;
    }
  };

  const connectTokenContract = async () => {
    // COnnect contract on wallet connect
    if (provider && typeof provider !== "undefined") {
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        JSON.parse(JSON.stringify(CONTRACT_ABI)),
        provider
      );
      // Configure with signer
      const contractWithSigner = tokenContract?.connect(signer);
      setTokenContract(contractWithSigner);

      console.log(contractWithSigner, "COnnected to  contract with signer");
    }
  };
  const connectSurveyContract = async () => {
    // COnnect contract on wallet connect
    if (provider && typeof provider !== "undefined") {
      const surveyContract = new ethers.Contract(
        SURVEY_ADDRESS_NEW,
        JSON.parse(JSON.stringify(SURVEY_ABI_NEW)),
        provider
      );
      // Configure with signer
      const contractWithSigner = surveyContract?.connect(signer);
      setSurveyContract(contractWithSigner);

      console.log(contractWithSigner, "COnnected to  contract with signer");
    }
  };
  const connectSurveyNFTContract = async () => {
    // COnnect contract on wallet connect
    if (provider && typeof provider !== "undefined") {
      const surveyNFTContract = new ethers.Contract(
        SURVEY_NFT_ADDRESS,
        JSON.parse(JSON.stringify(SURVEY_NFT_ABI)),
        provider
      );
      // Configure with signer
      const contractWithSigner = surveyNFTContract?.connect(signer);
      setSurveyNFTContract(contractWithSigner);

      console.log(
        contractWithSigner,
        "Connected to survey NFT contract with signer"
      );
    }
  };
  const connectSurveyMarketPlaceContract = async () => {
    // COnnect contract on wallet connect
    if (provider && typeof provider !== "undefined") {
      const surveyNFTContract = new ethers.Contract(
        SURVEY_MARKETPLACE_ADDRESS,
        JSON.parse(JSON.stringify(SURVEY_MARKETPLACE_ABI)),
        provider
      );
      // Configure with signer
      const contractWithSigner = surveyNFTContract?.connect(signer);
      setSurveyMarketPlaceContract(contractWithSigner);

      console.log(
        contractWithSigner,
        "Connected to survey NFT contract with signer"
      );
    }
  };

  useEffect(() => {
    if (address) {
      queryClient.invalidateQueries("getSonergyBalance");
      connectTokenContract();
      connectSurveyContract();
      connectSurveyNFTContract();
      connectSurveyMarketPlaceContract();
    }

    if (!address) {
      queryClient.invalidateQueries("getInbuiltAddress");
      queryClient.invalidateQueries("getSonergyBalance");
    }
  }, [address, inBuiltAddress]);

  return (
    <>
      <WalletContext.Provider
        value={{
          isFetchingBalance: isBalanceLoading,
          address,
          inBuiltAddress,
          provider,
          setProvider,
          setSigner,
          tokenContract,
          surveyContract,
          surveyNFTContract,
          surveyMarketPlaceContract,
          setAddress,
          approveSpend,
          sonergyBalance,
          setSonergyBalance,
        }}
      >
        {children}
      </WalletContext.Provider>
    </>
  );
}

export function useWalletContext() {
  return useContext(WalletContext);
}
const WalletContext = createContext<walletContextType>(undefined);
