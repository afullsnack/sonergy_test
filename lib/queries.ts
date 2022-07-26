const BASE_URL = "https://sonergy-mvp.herokuapp.com";

// Onboarding =======================>
export const getUserProfile = async (token: string) =>
  await fetch(`${BASE_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// Wallet ===========================>
export const getUserWalletAddresses = async (token: string) =>
  await fetch(`${BASE_URL}/wallet/fetch-wallet`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getSonergyBalance = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/wallet/sonergy-balance/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getTransactionHistory = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/wallet/transaction/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// Survey =========================>

export const getSurveyPlans = async (token: string) =>
  await fetch(`${BASE_URL}/surveys/get-survey-plans`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getMySurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getAllSurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-all-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getCompletedSurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-completed-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// NFT
export const getNFTSurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-nft-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getMyNFTSurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-my-nft-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getCreatedNFTSurveys = async ({
  token,
  address,
}: {
  token: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-created-nft-surveys/${address}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getNFTListingPrice = async (token: string) =>
  await fetch(`${BASE_URL}/surveys/get-nft-listing-price`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
