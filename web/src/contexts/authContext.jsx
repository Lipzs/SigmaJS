import React, {createContext, useState, useContext} from 'react';

const AuthContext =  createContext(null);

const AuthProvider = ({user, children}) => {
  const [currentUser, setCurrentUser] = useState(user);

  return(
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
