  
const TOKEN = '';

const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;

const getToken = () => localStorage.getItem(TOKEN);

const login = (token) => {
  localStorage.setItem(TOKEN, token);
};

const logout = () => {
  localStorage.removeItem(TOKEN);
};

export { TOKEN, isAuthenticated, getToken, login, logout};