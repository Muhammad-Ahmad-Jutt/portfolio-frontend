import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)
  useEffect(()=>{
    const savedtoken = localStorage.getItem('access_token')
    const savedUser = localStorage.getItem('user')
    if (savedtoken) setToken(savedtoken);
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Invalid user JSON, clearing storage:", e);
      localStorage.removeItem("user");
    }
  }
  },[])
  const login = (tokendata, userdata)=>{
    setToken(tokendata);
    setUser(userdata);
    localStorage.setItem('access_token', tokendata);
    localStorage.setItem("user", JSON.stringify(userdata));   }
  const logout = ()=>{
    setToken(null)
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')

  }
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
