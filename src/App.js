import  './css/main.css'
import AuthForm from "./components/AuthForm";
import SignUpForm from "./components/SignUpForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout /> }>
                  <Route path="/auth/*" element={ <Auth/> } />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
