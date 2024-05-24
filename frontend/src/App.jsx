import React from 'react'
import Home from './components/Home'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Main from './components/Main'
import BookDetail from './components/BookDetail'
import SearchBooks from './components/SearchBooks'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>,
      children:[
        {
          path:"/",
          element: <Main/>
        },
        {
          path:"/book/:id",
          element: <BookDetail/>
        },
        {
          path:"/search/:titre",
          element:<SearchBooks/>
        }
      ]
    }
  ])
  return (
    <React.Fragment>
      <RouterProvider router={router}/>
    </React.Fragment>
  )
}

export default App
