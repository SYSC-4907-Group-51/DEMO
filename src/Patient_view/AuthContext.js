import React, { useContext, useState, useEffect } from "react"
// import { store } from "../index";
import { store, persistor } from "../App";
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()


  async function makeRequest(method, endpoint, need_auth, body) {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    if (need_auth) {
      const state = store.getState();
      headers.append("Authorization", `Bearer ${state.storeAccess[0].data.access}`)
    }
    try {
       
      const response = await fetch(`https://cap-api.gura.ch/${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body) || undefined,
      })
      const data = await response.json()
      const status_code = response.status
      return {
        data,
        status_code
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function signup(username, password, first_name, last_name, email) {
    const endpoint = 'user/register'
    
    return await makeRequest('POST', endpoint, false, {
      username,
      password,
      first_name,
      last_name,
      email
    })
  }

  async function deleteAccount(password) {
    const endpoint = 'user/delete'

    return await makeRequest('DELETE', endpoint, true, {
      password
    })
  }

  async function authorization() {
    const endpoint = 'tracker/auth'
    return makeRequest('POST', endpoint, true, {})
  }


  async function login(username, password) {
    const endpoint = 'user/login'
    return await makeRequest('POST', endpoint, false, {
      username,
      password
    })
  }

  async function logout() {
    const endpoint = 'user/logout'
    return await makeRequest('POST', endpoint, true, {})
  }

  // async function signup(username, password, firstname, lastname, email) {
  //   const url = 'https://cap.gura.ch/api/user/register'

  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify({ "username": username, "password": password, "firstname": firstname, "lastname": lastname, "email": email }) // body data type must match "Content-Type" header
  //   })
  //   // try and catch for unsuccessful status 
  //   const data = await response.json() // parses JSON response into native JavaScript objects
  //   const status_code = response.status
  //   return {
  //     data,
  //     status_code
  //   }
  //   // parses JSON response into native JavaScript objects
  // }

  // async function deleteAccount(password) {
  //   const url = 'https://cap.gura.ch/api/user/delete'
  //   const state = store.getState();
  //   // console.log(state)
  //   // const authToken = state.access;

  //   const response = await fetch(url, {
  //     method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Authorization': `Bearer ${state[0]}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify({ "password": password }) // body data type must match "Content-Type" header
  //   })
  //   // // try and catch for unsuccessful status 
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   console.log('Success:', data);
  //   // })
  //   // .catch((error) => {
  //   //   console.error('Error:', error);
  //   // });
  //   const data = await response.json() // parses JSON response into native JavaScript objects
  //   const status_code = response.status
  //   return {
  //     data,
  //     status_code
  //   }
  //   // parses JSON response into native JavaScript objects
  // }

  // async function authorization() {
  //   const url = 'https://cap.gura.ch/api/tracker/auth'
  //   const state = store.getState();
  //   const authToken = state.access;

  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Authorization': `Bearer ${authToken}`
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     // body: JSON.stringify({"username": username, "password": password, "firstname": firstname, "lastname": lastname, "email": email}) // body data type must match "Content-Type" header
  //   })
  //   // // try and catch for unsuccessful status 
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   console.log('Success:', data);
  //   // })
  //   // .catch((error) => {
  //   //   console.error('Error:', error);
  //   // }); // parses JSON response into native JavaScript objects
  //   const data = await response.json() // parses JSON response into native JavaScript objects
  //   const status_code = response.status
  //   return {
  //     data,
  //     status_code
  //   }
  // }


  // async function login(email, password) {
  //   const url = 'https://cap.gura.ch/api/user/login'

  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify({ "username": email, "password": password }) // body data type must match "Content-Type" header
  //   });
  //   const data = await response.json() // parses JSON response into native JavaScript objects
  //   const status_code = response.status
  //   return {
  //     data,
  //     status_code
  //   }
  //   // // try and catch for unsuccessful status 
  //   // .then(response => response.json())
  //   // .then(data => {
  //   //   console.log('Success:', data);
  //   // })
  //   // .catch((error) => {
  //   //   console.error('Error:', error);
  //   // }); // parses JSON response into native JavaScript objects
  // }

  // async function logout() {
  //   const url = 'https://cap.gura.ch/api/user/logout'
  //   const state = store.getState();
  //   const authToken = state.access;
  //   console.log(state);

  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       // 'Authorization': `Bearer ${authToken}`, // this is changed 
  //       'Authorization': `Bearer ${state}`,
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow', // manual, *follow, error
  //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     // body: JSON.stringify({"username": email, "password": password}) // body data type must match "Content-Type" header
  //   });
  //   const data = await response.json() // parses JSON response into native JavaScript objects
  //   const status_code = response.status
  //   return {
  //     data,
  //     status_code
  //   } 
  // }
  // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ0NTk3MTg4LCJpYXQiOjE2NDQ1OTY4ODgsImp0aSI6IjgxYzMzYTU3MDg2MzRjOGZiMjIyMjBiYTk5ZDY0NmRiIiwidXNlcl9pZCI6Mn0.4Sc1IQMKVntDO2EYZA6YOnydJbl4RE-1JZX1jh-8GoQ




  const value = {
    currentUser,
    login,
    signup,
    deleteAccount,
    authorization,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}