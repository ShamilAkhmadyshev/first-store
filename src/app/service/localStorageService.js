const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export const setTokens = ({ refreshToken, idToken, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
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

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresIn,
};

export default localStorageService;
