import React, {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import GetUserDetails from "../Common/ApiCall/GetUserDetails";
import SendNotification from "../Common/Utils/SendNotification";
import NotificationTypeEnum from "../Common/Models/NotificationTypeEnum";
import {PrivateRoute} from "../Components/PrivateRoute";
import Dashboard from "../Dashboard";
import {GeneralRoute} from "../Components/GeneralRoute";
import {AuthRoute} from "../Components/AuthRoute";
import WelcomePage from "../WelcomePage";

const Home = () => {
  const [user, setUser] = useState(null)
  const [isAuthed, setIsAuthed] = useState(false)

  function handleAuthed() {
    if(user) {
      setIsAuthed(true);
    }
  }

  function setUserDetails() {
    let token = localStorage.getItem('authToken')
    if(token) {
      GetUserDetails(token)
        .then(r => {
          if(r) {
            setUser(r)
          }
          else {
            SendNotification(NotificationTypeEnum.Success, 'Bad Credentials')
          }
        })
    }
  }

  useEffect(()=>setUserDetails(), [])

  useEffect(()=>handleAuthed())

  return(
    <Switch>

      <PrivateRoute
        path="/"
        exact
        user={user}
        isAuthed={isAuthed}
        Component={Dashboard}
      />

      <GeneralRoute
        Component={WelcomePage}
      />

      <AuthRoute
        path='/sign-in'
        exact
        isAuthed={isAuthed}
        setUser={setUserDetails}
      />

    </Switch>
  )

}

export default Home