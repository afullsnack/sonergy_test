const BASE_URL = "https://sonergy-mvp.herokuapp.com";

export type Gender = `male` | "female";
export interface BioData {
  fullName: string;
  bio: string;
  dateOfBirth: Date;
  location: string;
  gender: Gender;
  country: string;
}

export interface CompleteBio {
  age: string;
  gender: Gender;
  country: string;
  occupation: string;
  bio: String;
  interest: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  username: string;
}

export interface VerifyEmailOTPData {
  code: string;
  email: string;
}

export interface CreateNewPasswordData {
  code: string;
  email: string;
  newPassword: string;
}

interface UpdateData {
  data: BioData;
  token: string;
}

// Onboarding and profile endpoints

export const loginUser = async (data: LoginData) =>
  await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());

export const registerUser = async (data: RegisterData) =>
  await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

export const resendEmailOTP = async (email: string) =>
  await fetch(`${BASE_URL}/auth/send-email-otp`, {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());

export const verifyEmailOTP = async (data: VerifyEmailOTPData) =>
  await fetch(`${BASE_URL}/auth/verify-email-otp`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

export const forgotPassword = async (email: string) =>
  await fetch(`${BASE_URL}/auth/send-password-reset-otp`, {
    method: "POST",
    body: JSON.stringify(email),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

export const createNewForgotPassword = async (data: CreateNewPasswordData) =>
  await fetch(`${BASE_URL}/auth/create-new-password`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());

export const updateUserBio = async ({ data, token }: UpdateData) =>
  await fetch(`${BASE_URL}/user`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const completeUserBio = async ({ data, token }: UpdateData) =>
  await fetch(`${BASE_URL}/user/complete-profile`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const changeUserPassword = async ({
  oldPassword,
  newPassword,
  token,
}: {
  oldPassword: string;
  newPassword: string;
  token: string;
}) =>
  await fetch(`${BASE_URL}/user/change-user-password`, {
    method: "POST",
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// Surveys and NFT's endpoints

export const addSurvey = async ({
  token,
  surveyURI,
  // enrollForSurvey,
  address,
  surveyPlanId,
  numOfValidators,
  amount,
  numberOfCommissioners,
}: {
  token: string;
  surveyURI: string;
  // enrollForSurvey: string | undefined;
  address: string;
  surveyPlanId: string;
  numOfValidators: string;
  amount: string;
  numberOfCommissioners: string;
}) =>
  await fetch(`${BASE_URL}/surveys/add-survey`, {
    method: "POST",
    body: JSON.stringify({
      surveyURI,
      // enrollForSurvey,
      address,
      surveyPlanId,
      numOfValidators,
      amount,
      numberOfCommissioners,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const addAnswerToSurvey = async ({
  token,
  surveyId,
  address,
  answerUri,
}: {
  token: string;
  surveyId: string;
  address: string;
  answerUri: string;
}) =>
  await fetch(`${BASE_URL}/surveys/add-survey-answer`, {
    method: "POST",
    body: JSON.stringify({ surveyId, address, answerUri }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const fetchSurveyAnswers = async ({
  token,
  surveyId,
  address,
}: {
  token: string;
  surveyId: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/surveys/get-all-survey-answers`, {
    method: "POST",
    body: JSON.stringify({ surveyId, address }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const convertSurveyToNFT = async ({
  token,
  surveyId,
  address,
  surveyUrl,
  price,
}: {
  token: string;
  surveyId: string;
  address: string;
  surveyUrl: string;
  price: string;
}) =>
  await fetch(`${BASE_URL}/surveys/convert-to-nft`, {
    method: "POST",
    body: JSON.stringify({ surveyId, address, surveyUrl, price }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const buySurveyNFT = async ({
  token,
  surveyTokenId,
  price,
}: {
  token: string;
  surveyTokenId: string;
  price: string;
}) =>
  await fetch(`${BASE_URL}/surveys/buy-nft`, {
    method: "POST",
    body: JSON.stringify({ surveyTokenId, price }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

// Wallet
export const sendSonergy = async ({
  token,
  amount,
  recipient,
  Network = "BSC",
  address,
}: {
  token: string;
  amount: string;
  recipient: string;
  Network: string;
  address: string;
}) =>
  await fetch(`${BASE_URL}/wallet/send-sonergy`, {
    method: "POST",
    body: JSON.stringify({ amount, recipient, Network, address }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
