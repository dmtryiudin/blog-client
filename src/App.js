import  './css/main.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import {useSelector} from "react-redux";
import MainPage from "./pages/MainPage";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";


function App() {
    const auth = useSelector(state => state.auth)

  return (
      <BrowserRouter>
          <Routes>
              {
                  auth.isAuth ?
                      (
                          <Route path="/" element={ <Layout /> }>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/auth/*" element={ <Auth/> } />
                                <Route path="/profile/:id" element={<Profile />}/>
                                <Route element={<ProfileSettings />} path="/settings"/>
                                <Route path="*" element={<NotFound />} />
                          </Route>
                      ) :
                      (
                          <Route path="/" element={ <Layout /> }>
                              <Route path="/auth/*" element={ <Auth/> } />
                              <Route path="*" element={<Navigate to="/auth/*" replace />} />
                          </Route>
                      )
              }
          </Routes>
      </BrowserRouter>
  );
}

export default App;
