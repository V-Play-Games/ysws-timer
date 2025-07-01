import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseLayout from "./BaseLayout";
import TimerPage from "./pages/TimerPage";
import AboutPage from "./pages/AboutPage";
import CatPage from "./pages/CatPage";
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout/>}>
          <Route index element={<TimerPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/cat" element={<CatPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
