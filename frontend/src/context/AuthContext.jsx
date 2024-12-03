import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = Cookies.get("jwToken") || null;
  console.log(auth); 
  useEffect(()=>{
    if(auth){
        const decoded = jwtDecode(auth);
        console.log(decoded)
        setUser({
            username: decoded.user.username,
            id: decoded.user._id
        })
    }
  })
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
