import React, { useEffect } from 'react';
import Signup from "./Patient_view/Signup";
import { Container } from 'react-bootstrap'
//import {BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Patient_view/Login";
import Share from "./Patient_view/Share"
import AddPhysician from "./Patient_view/AddPhysician";
import DataVisualization from "./Physician_view/DataVisualization";
import KeyLogin from "./Physician_view/KeyLogin";
import Logs from "./Patient_view/Logs";
import MyAccount from "./Patient_view/MyAccount";
import { AuthProvider } from "./Patient_view/AuthContext";
import AddTracker from "./Patient_view/AddTracker";
import InvalidTokenError from './InvalidTokenError';
import MismatchError from './MismatchError'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
// import configureStore from "./configureStore";
// import ErrorPage from "./Pages/ErrorPage";

// Provider: makes Redux store avaliable to any nested components


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/rootReducer";


// Redux Persist configuration 
const persistConfig = {
  key: 'storeAccess',
  version: 1,
  storage,
};
const pReducer = persistReducer(persistConfig, rootReducer);
//  const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);


// Acessing local storage 
const tempLS = JSON.parse(window.localStorage.getItem("loginResp"));

const App = () => {

  // occurs throughout all components, on refresh persist data from local storage 
  useEffect(() => {
     
    console.log(tempLS)
    if(tempLS){
      store.dispatch({
        type: "resfreshedStoreAccess",
        payload: {
          data: {
            username: tempLS.data.username,
            first_name: tempLS.data.first_name,
            last_name: tempLS.data.last_name,
            email: tempLS.data.email,
            created_at: tempLS.data.created_at,
            updated_at: tempLS.data.updated_at,
            refresh: tempLS.data.refresh,
            access: tempLS.data.access,
        },
        status_code: tempLS.status_code
        }
      });
    }
    
    // saves whole login response 
    //type: "resfreshedStoreAccess"
    
   
    const state = store.getState();
    // console.log(state.storeAccess[0].data.access);
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>


        <AuthProvider>
          <Container className="d-flex algin-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Router>
                <Routes>

                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/dataVisualization" element={<DataVisualization />} />
                  <Route path="/share" element={<Share />} />
                  <Route path="/share/add-physician" element={<AddPhysician />} />
                  <Route path="/keyLogin" element={<KeyLogin />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/account" element={<MyAccount />} />
                  <Route path="/addtracker" element={<AddTracker />} />
                  <Route path="/mismatcherror" element={<MismatchError />} />
                  <Route path="/invaliderror" element={<invalidTokenError />} />


                  {/* <Route path = "*" element = {<ErrorPage />}/> */}
                </Routes>
              </Router>

            </div>

          </Container>
        </AuthProvider>
      </PersistGate>
    </Provider>



  );

};

export default App;
export { store, persistor }; 
