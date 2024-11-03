import Cookies from 'js-cookie';

export const signOut = () => {
  Cookies.remove('authToken');
  Cookies.remove('userData');
  window.location.reload();
};
//expires: 7,
export const saveToken = (token) => {
  Cookies.set('authToken', token, {  sameSite: 'Strict' }); 
};

export const getToken = () => {
  return Cookies.get('authToken');
};

export const saveUser = (userData) => {
  Cookies.set('userData', JSON.stringify(userData), {
    expires: 1, 
    sameSite: 'Strict'
  });
};


export const getUser = () => {
  const userDataString = Cookies.get('userData');
  return userDataString ? JSON.parse(userDataString) : null;
};