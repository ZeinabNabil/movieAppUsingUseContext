import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
// import MoviesModule from "./modules/MoviesModule";
import { Box, Toolbar } from "@mui/material";
// import NotFound from "./components/NotFound";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const Movies = lazy(() => import("./modules/MoviesModule"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/" element={<Movies />} />
              <Route path="/movie/*" element={<Movies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
