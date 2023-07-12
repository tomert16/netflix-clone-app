import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./pages/Landing"
import  Login  from "./pages/Login"
import Netflix from "./pages/Netflix"
import  Signup  from "./pages/Signup"
import Player from "./pages/Player"
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows"
import Watchlist from "./pages/Watchlist"

const App = () => {

  const router = createBrowserRouter([
    {
      path: '*',
      element: <div>404 NOT FOUND</div>
    },
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/home',
      element: <Netflix />
    },
    {
      path: '/player',
      element: <Player />
    },
    {
      path: '/movies',
      element: <Movies />
    },
    {
      path: '/tv',
      element: <TvShows />
    },
    {
      path: '/my-list',
      element: <Watchlist />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
