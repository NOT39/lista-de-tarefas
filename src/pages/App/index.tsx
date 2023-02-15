import { Route, Routes } from 'react-router-dom'
import { ErrorPage } from '../ErrorPage'
import { Home } from '../Home'
import { TaskEditor } from '../TaskEditor'

export const App = () => {

  return (
    <div className="h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-800 font-sans">
      <header className="flex justify-center items-center h-10 bg-violet-800 text-zinc-100">
        <h1>Lista de tarefas</h1>
      </header>
      <main className="flex flex-col max-w-3xl mt-4 m-auto gap-4 ">
        <Routes>
          <Route path="/" element={<Home />} errorElement={<ErrorPage />}/>
          <Route path="/:taskId" element={<TaskEditor />} errorElement={<ErrorPage />}/>
        </Routes>
      </main>
    </div>
  )
}
