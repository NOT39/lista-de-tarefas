import { createBrowserRouter } from 'react-router-dom'
import { TaskEditor, ErrorPage, App } from '../pages'

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/:taskId',
    element: <TaskEditor />,
    errorElement: <ErrorPage />
  }
])

export default AppRoutes