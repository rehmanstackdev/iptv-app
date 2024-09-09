
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/authentication/protectedRoute';
import Login from './components/pages/auth/login';
import Sigup from './components/pages/auth/signup';
import Dasboard from './components/pages/dasboard'
import Genreindex from'./components/pages/genre/index'
import AddGenre from'./components/pages/genre/addgenre'
import EditGenre from './components/pages/genre/editgenre';
import AddSeries from './components/pages/series/addseries'
import Seriesindex from './components/pages/series/index'
import EditSeries from './components/pages/series/editseries'
import AddSeason from './components/pages/season/addseason'
import Seasoninsex from './components/pages/season/index'
import EditSeason from './components/pages/season/editseason';
import AddEpisode from './components/pages/Episode/addepisode'
import Episodeindex from './components/pages/Episode/index'
import EditEpisode from './components/pages/Episode/editepisode'
import AddFile from'./components/pages/file/addfile'
import Fileindex from'./components/pages/file/index'
function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Sigup/>} />


      <Route path="/dashboard" element={
        <ProtectedRoute>
        <Dasboard />
        </ProtectedRoute>
        } />
      <Route path="/genreindex" element={
        <ProtectedRoute>
        <Genreindex />
        </ProtectedRoute>
        } />
      <Route path="/addgenre" element={
        <ProtectedRoute>
        <AddGenre/>
        </ProtectedRoute>

        } />
        <Route path="/editgenre/:id" element={
        <ProtectedRoute>
        <EditGenre/>
        </ProtectedRoute>

        } />

<Route path="/addseries" element={
        <ProtectedRoute>
        <AddSeries/>
        </ProtectedRoute>

        } />

<Route path="/seriesindex" element={
        <ProtectedRoute>
        <Seriesindex/>
        </ProtectedRoute>

        } />
        <Route path="/editseries/:id" element={
        <ProtectedRoute>
        <EditSeries/>
        </ProtectedRoute>

        } />
    <Route path="/addseason" element={
        <ProtectedRoute>
        <AddSeason/>
        </ProtectedRoute>

        } />
        <Route path="/seasonindex" element={
        <ProtectedRoute>
        <Seasoninsex/>
        </ProtectedRoute>

        } />

<Route path="/editseason/:id" element={
        <ProtectedRoute>
        <EditSeason/>
        </ProtectedRoute>

        } />
        <Route path="/addepisode" element={
        <ProtectedRoute>
        <AddEpisode/>
        </ProtectedRoute>

        } />

<Route path="/episodeindex" element={
        <ProtectedRoute>
        <Episodeindex/>
        </ProtectedRoute>

        } />
        <Route path="/editepisode/:id" element={
        <ProtectedRoute>
        <EditEpisode/>
        </ProtectedRoute>

        } />
        <Route path="/addfile" element={
        <ProtectedRoute>
        <AddFile/>
        </ProtectedRoute>

        } />
    <Route path="/fileindex" element={
        <ProtectedRoute>
        <Fileindex/>
        </ProtectedRoute>

        } />

    </Routes>
  </BrowserRouter>
  )
}

export default App
