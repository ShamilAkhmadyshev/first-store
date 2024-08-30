const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

export const setTokens = ({
  refreshToken,
  idToken,
  expiresIn = 3600,
  localId,
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(USERID_KEY, localId);
};

export const getAccessToken = () => {
  localStorage.getItem(TOKEN_KEY);
};
export const getRefreshToken = () => {
  localStorage.getItem(REFRESH_TOKEN);
};
export const getTokenExpiresIn = () => {
  localStorage.getItem(EXPIRES_KEY);
};
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  removeAuthData,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresIn,
  getUserId,
};

export default localStorageService;
