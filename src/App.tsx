import  './css/main.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import React, {useEffect} from "react";
import {auth} from "./utils/auth";
import ErrorBoundary from "./components/ErrorBoundary";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {AuthState} from "./types/storeTypes";

const App:React.FC = () => {
    const authData:AuthState = useTypedSelector(state => state.auth)

    useEffect(()=>{
       if(authData.isAuth){
           auth.getDataByToken()
               .then((res)=>{
                   if(res.error){
                       auth.logout()
                   }
               })
       }

    }, [])

  return (
      <ErrorBoundary>
          <BrowserRouter>
              <Routes>
                  {
                      authData.isAuth ?
                          (
                              <Route path="/" element={ <Layout /> }>
                                  <Route path="/" element={<MainPage />} />
                                  <Route path="/auth/*" element={ <Auth/> } />
                                  <Route path="/profile/:id" element={<Profile />}/>
                                  <Route path="/post/:id" element={<Post />} />
                                  <Route path="/profile-settings" element={<ProfileSettings />}  />
                                  <Route path="/create-post" element={<CreatePost />} />
                                  <Route path="/update-post/:id" element={<UpdatePost />} />
                                  <Route path="*" element={<NotFound />} />
                              </Route>
                          ) :
                          (
                              <Route path="/" element={ <Layout /> }>
                                  <Route path="/" element={<MainPage />} />
                                  <Route path="/auth/*" element={ <Auth/> } />
                                  <Route path="*" element={<Navigate to="/auth/*" replace />} />
                              </Route>
                          )
                  }
              </Routes>
          </BrowserRouter>
      </ErrorBoundary>
  );
}

export default App;
