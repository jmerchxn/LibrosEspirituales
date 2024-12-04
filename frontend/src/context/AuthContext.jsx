import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = Cookies.get("jwToken");
  useEffect(()=>{
    if(auth){
        const decoded = jwtDecode(auth);
        setUser({
            username: decoded.usuario.username,
            id: decoded.usuario._id
        })
    }
  },[auth])
  const logout=()=>{
    setUser(null);
    Cookies.remove('jwToken')
  }
  return (
    <AuthContext.Provider value={{ user, setUser, auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
