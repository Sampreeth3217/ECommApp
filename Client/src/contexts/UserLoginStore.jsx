// import { userLoginContext } from "./userLoginContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";  

// function UserLoginStore({ children }) {
//   //login user state
//   let [currentUser, setCurrentUser] = useState(null);
//   let [userLoginStatus, setUserLoginStatus] = useState(false);
//   let [err, setErr] = useState("");

//   //user login
//   async function loginUser(userCred) {
//     try {
//       let res = await fetch(
//         `http://localhost:3000/user-api/login`,
      
//       {
//         method: "POST",
//         headers:{"Content-type":"application/json",},
//         body:JSON.stringify(userCred),
//       });
//       let result=await  res.json();
//       if(result.message==='login success')
//       {
//         setCurrentUser(result.user)
//         setUserLoginStatus(true)
//         setErr('')
//       }
//       else{
//         setErr(result.message);
//         setCurrentUser({})
//         setUserLoginStatus(false)
//       }
//     }
//     catch(error){
//       setErr(error.message);
//     }
//   }

//   //user logout
//   function logoutUser() {
//     //reset state
//     setCurrentUser({});
//     setUserLoginStatus(false);
//     setErr('')
//   }

//   return (
//     <userLoginContext.Provider
//       value={{ loginUser, logoutUser, userLoginStatus,err,currentUser,setCurrentUser }}
//     >
//       {children}
//     </userLoginContext.Provider>
//   );
// }

// export default UserLoginStore;



import { userLoginContext } from "./userLoginContext";
import { useState } from "react";

function UserLoginStore({ children }) {
  //login user state
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [err, setErr] = useState("");

  //user login
  async function loginUser(userCred) {
    try {
      const res = await fetch(
        `http://localhost:3000/user-api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userCred),
        }
      );

      const result = await res.json();
      if (result.message === 'login success') {
        setCurrentUser(result.user);
        setUserLoginStatus(true);
        setErr('');
      } else {
        setErr(result.message);
        setCurrentUser(null);
        setUserLoginStatus(false);
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  //user logout
  function logoutUser() {
    //reset state
    setCurrentUser(null);
    setUserLoginStatus(false);
    setErr('');
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
