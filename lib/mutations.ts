
const BASE_URL = 'https://sonergy.herokuapp.com';

export interface LoginData {
  email: string,
  password: string
}

export interface RegisterData {
  fullName: string,
  email: string,
  password: string,
  username: string,
}

export interface VerifyEmailOTPData {
  code: string,
  email: string,
}

export interface CreateNewPasswordData {
  code: string,
  email: string,
  newPassword: string
}

export const loginUser = async (data: LoginData) => await fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());
export const registerUser = async (data: RegisterData) => await fetch(`${BASE_URL}/auth/register`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());
export const resendEmailOTP = async (email: string) => await fetch(`${BASE_URL}/auth/send-email-otp`, { method: 'POST', body: JSON.stringify(email), headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'} }).then(res => res.json());
export const verifyEmailOTP = async (data: VerifyEmailOTPData) => await fetch(`${BASE_URL}/auth/verify-email-otp`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());
export const forgotPassword = async (email: string) => await fetch(`${BASE_URL}/auth/send-password-reset-otp`, { method: 'POST', body: JSON.stringify(email), headers: {'Content-Type': 'application/json'} }).then(res => res.json());
export const createNewForgotPassword = async (data: CreateNewPasswordData) => await fetch(`${BASE_URL}/auth/create-new-password`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());