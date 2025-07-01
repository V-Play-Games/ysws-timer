import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ApiDisplay from './components/ApiDisplay';
import AboutMe from './components/AboutMe';
import Cat from './components/Cat';
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ApiDisplay/>}/>
          <Route path="/aboutme" element={<AboutMe/>}/>
          <Route path="/cat" element={<Cat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;