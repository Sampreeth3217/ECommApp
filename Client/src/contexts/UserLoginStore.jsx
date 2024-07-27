import { userLoginContext } from "./userLoginContext";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';


function UserLoginStore({ children }) {
  //login user state
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [err, setErr] = useState("");

  //user login
  // async function loginUser(userCred) {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/user-api/login`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(userCred),
  //       }
  //     );

  //     const result = await res.json();
  //     if (result.message === 'login success') {
  //       setCurrentUser(result.user);
  //       setUserLoginStatus(true);
  //       setErr('');
  //     } else {
  //       setErr(result.message);
  //       setCurrentUser(null);
  //       setUserLoginStatus(false);
  //     }
  //   } catch (error) {
  //     setErr(error.message);
  //   }
  // }
  const loginUser = async (userCred) => {
    try {
      const res = await fetch('http://localhost:3000/user-api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(userCred),
      });
      const result = await res.json();
      console.log('Login response:', result); // Add this line
      if (result.message === 'Login Successful') {
        setCurrentUser(result.payload.user);
        setUserLoginStatus(true);
        setErr('');
        sessionStorage.setItem('token',result.payload.token)
      } else {
        setErr(result.message);
        setCurrentUser(null);
        setUserLoginStatus(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  

  //user logout
  function logoutUser() {
    //reset state
    setCurrentUser(null);
    setUserLoginStatus(false);
    setErr('');
    sessionStorage.clear();
  }

  return (
    <userLoginContext.Provider
      value={{ loginUser, logoutUser, userLoginStatus, err, currentUser, setCurrentUser }}
    >
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
