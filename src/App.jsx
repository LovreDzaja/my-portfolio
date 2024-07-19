import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, About, Projects } from "./pages";
import FollowCursor from './components/FollowCursor';
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Analytics/>
      <FollowCursor/>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App