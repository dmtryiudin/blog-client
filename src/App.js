import  './css/main.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={ <Layout /> }>
                  <Route path="/auth/*" element={ <Auth/> } />
                  <Route path="*" element={<NotFound />}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
