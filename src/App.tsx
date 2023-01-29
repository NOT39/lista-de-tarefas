import { useCallback, useEffect, useRef, useState } from 'react'
import { Task } from './components/Task'
import { ApiException } from './services/api/ApiException'
import { TasksService, ITask } from './services/api/Tarefas/TasksService'

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
    if(newTaskInput.trim().length === 0) return
    if(tasks.some((task) => task.label === newTaskInput)) return
    
    TasksService.create({label: newTaskInput, isCompleted: false})
      .then((result => {
        if(result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks((oldTasks) => [...oldTasks, result])
        }
      }))
  }, [newTaskInput, tasks])

  const handleDeleteTask = useCallback((id: number) => {
    TasksService.deleteById(id)
      .then((result) => {
        if(result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks((oldTasks) => {
            return oldTasks.filter((task) => task.id !== id)
          })
        }
      })
  }, [])

  const handleToggleCompleted = useCallback((id: number) => {
    const taskData = tasks.find(task => task.id === id)

    if(!taskData) {
      alert('Houve um erro ao tentar encontrar a tarefa')
      return
    }
    
    TasksService.updateById(id, {...taskData, isCompleted: taskData.isCompleted ? false : true})
      .then(result => {
        if(result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks(oldTasks => {
            return oldTasks.map(task => task.id !== id ? task : result)
          })
        }
      })
  }, [tasks])

  return (
    <div>
      <header className='flex justify-center items-center h-10 mb-4 bg-violet-800'>
        <h1>Lista de tarefas</h1>
      </header>
      <main className='flex flex-col max-w-3xl m-auto gap-4'>
        <label className='flex flex-col gap-2'>
          <input type="text" value={newTaskInput} onChange={e => setNewTaskInput(e.target.value)}
            className="flex items-center justify-center px-4 py-2 min-w-96 bg-violet-500 rounded-sm"
          />
          <button onClick={handleCreateTask} className="flex items-center justify-center px-4 py-2 min-w-96 bg-violet-500 active:bg-violet-700 rounded-sm">
            Adicionar nova tarefa
          </button>
        </label>
        <ul className='flex flex-col gap-2'>
          {tasks.map((task) => {
            return <Task onClickDelete={() => handleDeleteTask(task.id)} onClickCompleted={() => handleToggleCompleted(task.id)} key={task.id} isCompleted={task.isCompleted}>{task.label}</Task>
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
