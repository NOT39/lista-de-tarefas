import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/App'
import ErrorPage from '../pages/ErrorPage'
import { TaskEditor } from '../pages/TaskEditor'

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