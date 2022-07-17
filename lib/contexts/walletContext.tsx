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
import { useQuery, useQueryClient } from "react-query";
import { getSonergyBalance } from "../queries";

type walletContextType = {
  isFetchingBalance: boolean;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  sonergyBalance: BalanceData;
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
  const [sonergyBalance, setSonergyBalance] = useState<BalanceData | undefined>(
    {
      USD: 0,
      sonergy: "0",
      symbol: "SNEGY",
    }
  );

  // Wallet sonergy balance query { data, success, message }
  const {
    data,
    isLoading,
    error,
  }: {
    data:
      | {
          data: Array<BalanceData | undefined>;
          success: boolean;
          message: string;
        }
      | undefined;
    isLoading: boolean;
    error: object | undefined;
  } = useQuery(
    ["getSonergyBalance", token, address],
    () => getSonergyBalance({ token, address }),
    {
      onSuccess({ success, message, data }) {
        console.info(
          data,
          success,
          message,
          "Data returned from the getSonergyBalance"
        );

        if (success)
          setSonergyBalance(
            data?.filter((val) => val.symbol === "SNEGYTEST")[0]
          );
      },
      onError(err) {
        console.error(err, "Error occurred while getSonergyBalance called");
      },
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries("getSonergyBalance");
  }, [address]);

  return (
    <>
      <WalletContext.Provider
        value={{
          isFetchingBalance: isLoading,
          address,
          setAddress,
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
