import { useCallback, useEffect, useState } from 'react'
import { Task } from '../components/Task'
import { ApiException } from '../services/api/ApiException'
import { TasksService, ITask } from '../services/api/Tarefas/TasksService'

function App() {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskInput, setNewTaskInput] = useState('')

  // Pega a lista de tarefas do banco de dados na primeira renderização da página
  useEffect(() => {
    TasksService.getAll()
      .then((res) => res instanceof ApiException ? alert(res.message) : setTasks(res))
      .catch((error) => console.error(error))
  }, [])

  const handleCreateTask = useCallback(() => {
    if (newTaskInput.trim().length === 0) return
    if (tasks.some((task) => task.info === newTaskInput.trim())) return

    TasksService.create({ info: newTaskInput.trim(), isCompleted: false })
      .then((result => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks((oldTasks) => [...oldTasks, result])
        }
      }))
  }, [newTaskInput, tasks])

  const handleDeleteTask = useCallback((id: string) => {
    TasksService.deleteById(id)
      .then((result) => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks((oldTasks) => {
            return oldTasks.filter((task) => task.uuid !== id)
          })
        }
      })
  }, [])

  const handleToggleCompleted = useCallback((id: string) => {
    const taskData = tasks.find(task => task.uuid === id)

    if (!taskData) {
      alert('Houve um erro ao tentar encontrar a tarefa')
      return
    }

    TasksService.updateById(id, { ...taskData, isCompleted: taskData.isCompleted ? false : true })
      .then(result => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks(oldTasks => {
            return oldTasks.map(task => task.uuid !== id ? task : result)
          })
        }
      })
  }, [tasks])

  return (
    <div className='h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-800 font-sans'>
      <header className='flex justify-center items-center h-10 bg-violet-800 text-zinc-100'>
        <h1>Lista de tarefas</h1>
      </header>
      <main className='flex flex-col max-w-3xl mt-4 m-auto gap-4 '>
        <label className='flex'>
          <input type="text" value={newTaskInput} onKeyDown={e => { if (e.key === 'Enter') { handleCreateTask() } }} onChange={e => setNewTaskInput(e.target.value)}
            className="flex flex-grow items-center justify-center px-4 py-2 min-w-96 bg-violet-500 rounded-l-sm"
          />
          <button onClick={handleCreateTask} className="flex items-center justify-center px-4 py-2 min-w-96 bg-violet-600 active:bg-violet-700 rounded-r-sm">
            Adicionar nova tarefa
          </button>
        </label>
        <ul className='flex flex-col max-h-[65vh] gap-2 overflow-y-scroll'>
          {tasks.map((task) => {
            return (
              <Task
                onClickDelete={() => handleDeleteTask(task.uuid)}
                onClickCompleted={() => handleToggleCompleted(task.uuid)}
                key={task.uuid} content={task}
              >
                {task.info}
              </Task>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
