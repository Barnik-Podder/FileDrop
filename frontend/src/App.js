import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import DownloadPage from './pages/DownloadPage'
import AboutPage from './pages/AboutPage'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/download/:id' element={<DownloadPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
    </Routes>
  )
}

export default App
