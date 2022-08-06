import { utils } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillClockCircle } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useToast } from "../../components/Alerts";
import {
  ButtonGhost,
  ButtonIcon,
  ButtonPrimary,
} from "../../components/Button";
import withLayout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useModal } from "../../components/Modal";
import OnboardCard from "../../components/OnboardCard";
import { useIPFSContext } from "../../lib/contexts/ipfsContext";
import { useWalletContext } from "../../lib/contexts/walletContext";
import { SURVEY_NFT_ADDRESS } from "../../lib/contract/config";
import { convertSurveyToNFT } from "../../lib/mutations";
import {
  getAllSurveys,
  getCompletedSurveys,
  getMySurveys,
} from "../../lib/queries";

enum SurveySort {
  Commissioned = "commissioned",
  Completed = "completed",
  Validated = "validated",
}

function MySurveys() {
  const { query, push } = useRouter();
  const [{ token }] = useCookies(["token"]);

  const queryClient = useQueryClient();

  // Context
  const { address, sonergyBalance, inBuiltAddress } = useWalletContext();
  const { pullData, isPullingData } = useIPFSContext();

  const [sort, setSort] = useState(
    query.sort ? query.sort : SurveySort.Commissioned
  );
  const [commissioned, setCommissioned] = useState<Array<any> | undefined>();
  const [completed, setCompleted] = useState<Array<any> | undefined>();
  const [validated, setValidated] = useState<Array<any> | undefined>();

  // modal
  const [mintModal, MintModalRender] = useModal();

  // Setup use queries function
  const result = useQueries([
    {
      queryKey: ["getValidatedSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getAllSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ data, message, success }) {
        // console.log(data, success, message, "Data from getAllSurveys queries");
        if (success && data.length) {
          const decodedMap = data
            .filter(
              (item) =>
                item.surveyURI !==
                "Qmd1KdBqjgke6FqpARZvWcoeWuWoAYpU3aNT5PgBVYFhDK"
            )
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyURI);
              // console.log("Gotten json", json);
              return {
                ...json,
                uri: item.surveyURI,
                amount: item.amount,
                symbol: sonergyBalance.symbol,
                valCount: item?.numOfValidators,
                responseCount: item?.numOfcommisioners,
                surveyId: item?.surveyID,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);
          setValidated(awaitedDecode || []);
          console.log(awaitedDecode, "My validated: Validated");
        }
      },
      onError(err) {
        console.error(err, "An error when fetching getAllSurveys");
      },
    },
    {
      queryKey: ["getMySurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getMySurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getMySurveys"
        // );

        if (success && data.length) {
          const decodedMap = data
            .filter(
              (item) =>
                item.surveyURI !==
                "Qmd1KdBqjgke6FqpARZvWcoeWuWoAYpU3aNT5PgBVYFhDK"
            )
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyURI);
              // console.log("Gotten json", json);
              return {
                ...json,
                uri: item.surveyURI,
                amount: item.amount,
                symbol: sonergyBalance.symbol,
                valCount: item?.numOfValidators,
                responseCount: item?.numOfcommisioners,
                surveyId: item?.surveyID,
                surveyCompleted: item?.completed,
                surveyExist: item?.exist,
                surveyNFTStatus: item?.nftStatus,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);
          setCommissioned(awaitedDecode || []);
          console.log(awaitedDecode, "My survey: Commissioned");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getMySurveys called");
      },
    },
    {
      queryKey: ["getCompletedSurveys", token, address || inBuiltAddress],
      queryFn: () =>
        getCompletedSurveys({ token, address: address || inBuiltAddress }),
      async onSuccess({ success, message, data }) {
        // console.info(
        //   data,
        //   success,
        //   message,
        //   "Data returned from the getCompletedSurvey"
        // );

        if (success && data.length) {
          const decodedMap = data
            .filter(
              (item) =>
                item.surveyURI !==
                "Qmd1KdBqjgke6FqpARZvWcoeWuWoAYpU3aNT5PgBVYFhDK"
            )
            .map(async (item: any) => {
              // console.log("Item", item.surveyURI);
              const json = await pullData(item?.surveyURI);
              // console.log("Gotten json", json);
              return {
                ...json,
                uri: item.surveyURI,
                amount: item.amount,
                symbol: sonergyBalance.symbol,
                valCount: item?.numOfValidators,
                responseCount: item?.numOfcommisioners,
                surveyId: item?.surveyID,
              };
            });

          const awaitedDecode = await Promise.all(decodedMap);

          setCompleted(awaitedDecode || []);
          console.log(awaitedDecode, "Completed Surveys: Completed survey");
        }
      },
      onError(err) {
        console.error(err, "Error occurred while getCompletedSurveys called");
      },
    },
  ]);

  const validatedLoading: boolean = result[0].isFetching || result[0].isLoading;
  const commissionedLoading: boolean =
    result[1].isFetching || result[1].isLoading;
  const completedLoading: boolean = result[2].isFetching || result[2].isLoading;

  console.log(
    validatedLoading,
    commissionedLoading,
    completedLoading,
    "Load tracking",
    isPullingData,
    "Track pulling",
    validated,
    commissioned,
    completed,
    "Tracking arrays"
  );

  const [toast, ToastRender] = useToast();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // console.log(
      //   token,
      //   address,
      //   "User token set after login redirect and context wallet",
      //   completed,
      //   ".....",
      //   commissioned,
      //   "....",
      //   "Decoded surveys",
      //   "Result queries"
      // );
    }
    queryClient.invalidateQueries("getCompletedSurveys");
    queryClient.invalidateQueries("getMySurveys");
    // queryClient.invalidateQueries("getValidatedSurveys");
  }, [address, sort]);

  return (
    <div className="w-full">
      {/* Sort actions */}
      <div className="flex flex-col items-start justify-start w-full bg-white mobile:p-3 mb-7">
        <div className="flex items-center justify-center w-[100%] mb-2">
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "commissioned"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort((sort) => SurveySort.Commissioned)}
          >
            Commissioned
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "completed"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort((sort) => SurveySort.Completed)}
          >
            Completed
          </button>
          <button
            className={`flex-1 mx-1 p-2 rounded-md border-solid border-[1px] ${
              sort === "validated"
                ? "border-blue-700 bg-blue-100"
                : "border-slate-200"
            } mobile:text-xs`}
            onClick={() => setSort((sort) => SurveySort.Validated)}
          >
            Validated
          </button>
        </div>
        <select className="select select-bordered w-full bg-gray-200 text-slate-700">
          <option disabled selected>
            Filter
          </option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last 12 months</option>
        </select>
      </div>

      {(sort === SurveySort.Validated ||
        sort === SurveySort.Commissioned ||
        sort === SurveySort.Completed) &&
        (!validated || !completed || !commissioned) &&
        (validatedLoading ||
          completedLoading ||
          commissionedLoading ||
          isPullingData) && (
          <div className="flex flex-col items-center justify-center w-full mobile:p-3 mb-7">
            <Loader />
          </div>
        )}

      {/* My surveys list */}
      {sort === SurveySort.Commissioned &&
        (!commissionedLoading || !isPullingData) &&
        commissioned &&
        commissioned.length > 0 && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              {commissioned.map((item, idx) => (
                <div
                  className="border border-slate-200 rounded-lg p-4 mb-3"
                  key={idx.toString()}
                >
                  <div className="flex flex-col items-start justify-between mb-3">
                    {item?.surveyCompleted ? (
                      <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                        Completed
                      </div>
                    ) : (
                      <div className="badge bg-blue-200 text-blue-700 text-xs border-none mb-3">
                        Ongoing
                      </div>
                    )}
                    <span className="text-gray-700 text-sm font-normal text-left mb-2">
                      {item.surveyTitle}
                    </span>
                    <span className="text-gray-700 text-xs font-normal text-left mb-2">
                      {item.description}
                    </span>
                    <p className="flex items-center justify-center">
                      <b className="text-gray-700 text-mf font-medium">
                        {utils.formatUnits(item?.amount, 18)} {item?.symbol}
                      </b>{" "}
                    </p>
                    <p className="flex items-center justify-center">
                      {" "}
                      <AiFillClockCircle size={14} />
                      <span className="text-xs text-gray-500 ml-1">
                        Expires on{" "}
                        {new Date(item?.dateExpiration).toLocaleString()}
                      </span>{" "}
                    </p>
                  </div>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex-[3]">
                      <ButtonGhost
                        text="Convert to NFT"
                        block={true}
                        onClick={(e) => {
                          console.log("Convert to NFT", e);
                          // call confirm mint modal
                          mintModal.show({
                            title: "Mint NFT",
                            content: (
                              <ConfirmMintModalContent
                                inBuiltAddress={inBuiltAddress}
                                surveyId={item?.surveyId}
                                surveyUrl={item?.uri}
                                cancel={() => mintModal.hide()}
                                onSuccessFeedback={(message) =>
                                  toast.success({ text: message })
                                }
                                onFailedFeedback={(message) =>
                                  toast.error({ text: message })
                                }
                              />
                            ),
                          });
                        }}
                        disabled={
                          !item?.surveyCompleted && item?.surveyNFTStatus
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <ButtonIcon
                        type="normal"
                        icon={<FaFileDownload size={18} />}
                        block={true}
                        onClick={(e) => console.log("Download", e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </OnboardCard>
            {/* Analyze action buttn */}
            <div className="flex flex-col items-start justify-start bg-white w-full mobile:p-3 mt-6">
              <ButtonPrimary
                type="normal"
                text="Analyze survey"
                icon={undefined}
                iconPosition={undefined}
                block={true}
                onClick={(e) => console.log(e, "Analyze survey")}
                isLoading={false}
                disabled={false}
              />
            </div>
          </div>
        )}
      {/* {(sort === SurveySort.Commissioned &&
        commissioned.length <= 0 &&
        commissionedLoading) ||
        (isPullingData && (
          <div className="flex flex-col items-center justify-center w-full mobile:p-3 mb-10">
            <Loader />
          </div>
        ))} */}
      {sort === SurveySort.Commissioned &&
        commissioned &&
        commissioned.length <= 0 &&
        !isPullingData &&
        !commissionedLoading && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              <span className="text-slate-800 text-2xl font-normal text-center">
                You have not commissioned any surveys yet
              </span>
            </OnboardCard>
          </div>
        )}

      {/* COMPLETED LIST */}
      {sort === SurveySort.Completed &&
        completed &&
        completed.length > 0 &&
        (!completedLoading || !isPullingData) && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              {completed.map((item, idx) => (
                <div
                  className="border border-slate-200 rounded-lg p-4 mb-3"
                  key={idx.toString()}
                >
                  <div className="flex flex-col items-start justify-between mb-3">
                    {item?.complete ? (
                      <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                        Completed
                      </div>
                    ) : (
                      <div className="badge bg-blue-200 text-blue-700 text-xs border-none mb-3">
                        Ongoing
                      </div>
                    )}
                    <span className="text-gray-700 text-sm font-normal text-left mb-2">
                      {item.surveyTitle}
                    </span>
                    <span className="text-gray-700 text-xs font-normal text-left mb-2">
                      {item.description}
                    </span>
                    <p className="flex items-center justify-center">
                      <b className="text-gray-700 text-mf font-medium">
                        {utils.formatUnits(item?.amount, 18)} {item?.symbol}
                      </b>{" "}
                    </p>
                    <p className="flex items-center justify-center">
                      {" "}
                      <AiFillClockCircle size={14} />
                      <span className="text-xs text-gray-500 ml-1">
                        Expires on{" "}
                        {new Date(item?.dateExpiration).toLocaleString()}
                      </span>{" "}
                    </p>
                  </div>
                  {!item?.complete && (
                    <div className="flex items-center justify-center w-full">
                      <ButtonGhost
                        text="Finish up"
                        type="normal"
                        icon={null}
                        iconPosition={null}
                        block={true}
                        onClick={(e) => {
                          console.log("Finish up", e);
                          push(
                            `/home/take-survey?surveyURI=${item?.uri}&surveyId=${item?.surveyId}&amount=${item?.amount}&validatorCount=${item?.valCount}&responseCount=${item?.responseCount}`
                          );
                        }}
                        isLoading={false}
                        disabled={false}
                      />
                    </div>
                  )}
                </div>
              ))}
            </OnboardCard>
          </div>
        )}
      {sort === SurveySort.Completed &&
        completed &&
        completed.length <= 0 &&
        !completedLoading &&
        !isPullingData && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              <span className="text-slate-800 text-2xl font-normal">
                You have not completed any surveys!
              </span>
            </OnboardCard>
          </div>
        )}
      {/* {sort === SurveySort.Completed &&
        completed.length <= 0 &&
        (isPullingData || completedLoading) && (
          <div className="flex flex-col items-center justify-center w-full mobile:p-3 mb-10">
            <Loader />
          </div>
        )} */}
      {/* VALIDATED LIST */}
      {sort === SurveySort.Validated &&
        validated &&
        validated.length > 0 &&
        (!validatedLoading || !isPullingData) && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              {validated.map((item, idx) => (
                <div
                  className="border border-slate-200 rounded-lg p-4 mb-3"
                  key={idx.toString()}
                >
                  <div className="flex flex-col items-start justify-between mb-3">
                    {item?.complete ? (
                      <div className="badge bg-green-200 text-green-700 text-xs border-none mb-3">
                        Completed
                      </div>
                    ) : (
                      <div className="badge bg-blue-200 text-blue-700 text-xs border-none mb-3">
                        Ongoing
                      </div>
                    )}
                    <span className="text-gray-700 text-sm font-normal text-left mb-2">
                      {item.surveyTitle}
                    </span>
                    <span className="text-gray-700 text-xs font-normal text-left mb-2">
                      {item.description}
                    </span>
                    <p className="flex items-center justify-center">
                      <b className="text-gray-700 text-mf font-medium">
                        {utils.formatUnits(item?.amount, 18)} {item?.symbol}
                      </b>{" "}
                    </p>
                    <p className="flex items-center justify-center">
                      {" "}
                      <AiFillClockCircle size={14} />
                      <span className="text-xs text-gray-500 ml-1">
                        Expires on{" "}
                        {new Date(item?.dateExpiration).toLocaleString()}
                      </span>{" "}
                    </p>
                  </div>
                  {!item?.complete && (
                    <div className="flex items-center justify-center w-full">
                      <ButtonGhost
                        text="Finish up"
                        type="normal"
                        icon={null}
                        iconPosition={null}
                        block={true}
                        onClick={(e) => console.log("Finish up", e)}
                        isLoading={false}
                        disabled={false}
                      />
                    </div>
                  )}
                </div>
              ))}
            </OnboardCard>
          </div>
        )}
      {sort === SurveySort.Validated &&
        validated &&
        validated.length <= 0 &&
        !validatedLoading &&
        !isPullingData && (
          <div className="flex flex-col items-start justify-start w-full mobile:p-3 mb-10">
            <OnboardCard>
              <span className="text-slate-800 text-2xl font-normal">
                You have not validated any surveys yet!
              </span>
            </OnboardCard>
          </div>
        )}

      <MintModalRender />
      <ToastRender />
    </div>
  );
}

const ConfirmMintModalContent = ({
  inBuiltAddress,
  surveyId,
  surveyUrl,
  cancel,
  onSuccessFeedback,
  onFailedFeedback,
}) => {
  const [{ token }] = useCookies(["token"]);
  const { push } = useRouter();
  // Mutation for convert to NFT with inbuilt wallet
  const { mutate, isLoading } = useMutation(convertSurveyToNFT, {
    onSuccess({ data, success, message }) {
      console.log(data, success, message, "Mint NFT with inbuilt return data");
      if (success) {
        return onSuccessFeedback(message);
        // push("/home/");
      }

      return onFailedFeedback(message);
    },
    onError(err) {
      console.error(err, "Mint NFT error");
      onFailedFeedback(err.toString());
    },
  });
  const [price, setPrice] = useState<string>();
  const [isContractCallLoading, setIsContractCallLoading] =
    useState<boolean>(false);

  const {
    surveyNFTContract,
    surveyContract,
    surveyMarketPlaceContract,
    address,
  } = useWalletContext();

  return (
    <div className="w-full flex flex-col space-y-2">
      <span className="text-sm text-gray-600 font-normal">
        Converting your completed surveys to NFT will make them available for
        trade on the market place when you list them. Are you sure about this?
      </span>
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text text-slate-700 font-medium">
            Sale Price of NFT
          </span>
        </label>
        <label className="input-group border-gray-200 border-solid border-[1px] rounded-md">
          {/* <span className="flex items-center justify-center pl-4 pr-1 bg-transparent">
                <FaEnvelope color="#B8C4CE" />
              </span> */}
          <input
            type="number"
            data-test="listing-price"
            placeholder="0.00"
            className="input input-bordered bg-transparent text-black outline-none border-none after:ring-0 before:ring-0 before:ring-offset-0 after:ring-offset-0 pl-3 w-[100%]"
            value={price}
            onChange={(e) => {
              console.info("price", e.target.value);
              setPrice(e.target.value);
            }}
          />
          {/* <span>USD</span> */}
        </label>
      </div>
      <ButtonPrimary
        text="Confirm and mint"
        onClick={async () => {
          // COnfirm mint and call necessary contract methods to mint survey
          if (price && !address) {
            const bnPrice = utils.parseUnits(price, 18);
            console.log(
              bnPrice.toString(),
              token,
              surveyId,
              inBuiltAddress,
              surveyUrl,
              "String price"
            );
            mutate({
              token,
              surveyId,
              address: inBuiltAddress,
              surveyUrl,
              price: bnPrice.toString(),
            });
          } else if (price && address) {
            setIsContractCallLoading(true);
            /* call createSurveyToken function */
            const convertTx = await surveyNFTContract.createSurveyToken(
              surveyUrl,
              {
                gasPrice: utils.parseUnits("100", "gwei"),
                gasLimit: 1000000,
              }
            );

            const tx = await convertTx.wait();
            let event = tx.events[0];
            let value = event.args[2];
            let tokenId = value.toNumber();

            console.log(
              convertTx,
              tx,
              event,
              value,
              tokenId,
              "Convert survey to NFT"
            );

            /* Get listing price */
            const listPrice =
              await surveyMarketPlaceContract.getNFTListingPrice();

            console.log(listPrice, "Receipt for listing price");

            /* List the item on market place */
            const bnPrice = utils.parseUnits(price, 18);
            const listTx = await surveyMarketPlaceContract.createSurveyNFT(
              SURVEY_NFT_ADDRESS,
              tokenId,
              bnPrice.toString(),
              surveyId,
              { value: listPrice.toString() },
              {
                gasPrice: utils.parseUnits("100", "gwei"),
                gasLimit: 1000000,
              }
            );
            const listRcpt = await listTx.wait();
            console.log(listTx, listRcpt, "List transaction");

            /* Update survey contract */
            const updateSurveyTx = await surveyContract.makeNFT(surveyId, {
              gasPrice: utils.parseUnits("100", "gwei"),
              gasLimit: 1000000,
            });
            const updateSurveyRcpt = await updateSurveyTx.wait();
            console.log(
              updateSurveyRcpt,
              updateSurveyTx,
              "Updaet survey contract"
            );

            setIsContractCallLoading(false);
          }
        }}
        isLoading={isLoading || isContractCallLoading}
      />
      <ButtonGhost text="Cancel" onClick={cancel} />
    </div>
  );
};

export default withLayout(MySurveys);
