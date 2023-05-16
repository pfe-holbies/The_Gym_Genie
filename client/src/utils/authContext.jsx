import { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

// define an initialState object with user property set to null
const initialState = {
  user: null,
};

// check and decode localStorage token, remove expired, set user.
if (localStorage.getItem('token')) {
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

// create context object
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// reducer function handles state updates based on the dispatched action
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': // LOGIN case: sets user property to the action's payload
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT': // LOGOUT case; sets user to null
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// AuthProvider component uses useReducer to manage state updates with the authReducer function and initialState.
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // sets a token in localStorage and dispatch a LOGIN action
  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
    console.log('Register/Login hit');
  };
  // removes the token from localStorage and dispatch a LOGOUT action
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    console.log('Logout hit');
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
