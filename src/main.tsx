import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import BaseLayout from "./BaseLayout";
import TimerPage from "./pages/TimerPage";
import AboutPage from "./pages/AboutPage";
import CatPage from "./pages/CatPage";
import SuperCatPage from "./pages/SuperCatPage";
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout/>}>
          <Route index element={<TimerPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/cat" element={<Outlet/>}>
            <Route index element={<CatPage/>}/>
            <Route path="/cat/super" element={<SuperCatPage/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
