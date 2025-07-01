import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TimerPage from './components/TimerPage';
import AboutPage from './components/AboutPage';
import CatPage from './components/CatPage';
import BaseLayout from "./components/BaseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout/>}>
          <Route index element={<TimerPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/cat" element={<CatPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;