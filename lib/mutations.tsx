
const BASE_URL = 'https://sonergy.herokuapp.com';

interface LoginData {
  email: string,
  password: string
}

export const loginUser = async (data: LoginData) => await fetch(`${BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'} }).then(res => res.json());