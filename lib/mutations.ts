
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

export const loginUser = async (data: LoginData) => await fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());
export const registerUser = async (data: RegisterData) => await fetch(`${BASE_URL}/auth/register`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());