import { ApiException, TasksService, ITask } from '../../services'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Task } from '../../components'

export const Home = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const addTaskInput = useRef<HTMLInputElement>(null)

  // Pega a lista de tarefas do banco de dados na primeira renderização da página
  useEffect(() => {
    TasksService.getAll()
      .then((res) => res instanceof ApiException ? alert(res.message) : setTasks(res))
      .catch((error) => console.error(error))
  }, [])

  const handleCreateTask = useCallback(() => {
    const taskInput = addTaskInput.current?.value

    if (!taskInput) return
    if (taskInput.trim().length === 0) return
    if (tasks.some((task) => task.info === taskInput.trim())) return

    TasksService.create({ info: taskInput.trim(), isCompleted: false })
      .then((result => {
        if (result instanceof ApiException) {
          alert(result.message)
        } else {
          setTasks((oldTasks) => [...oldTasks, result])
        }
      }))
  }, [addTaskInput, tasks])

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
    <>
      <label className="flex">
        <input type="text"
          ref={addTaskInput}
          onKeyDown={e => {if (e.key === 'Enter') { handleCreateTask() }}}
          className="flex grow items-center justify-center px-4 py-2 min-w-96 bg-violet-500 rounded-l-sm"
        />
        <button onClick={handleCreateTask} className="flex items-center justify-center px-4 py-2 min-w-96 bg-violet-600 active:bg-violet-700 rounded-r-sm">
          Adicionar nova tarefa
        </button>
      </label>
      <ul className="flex flex-col max-h-[65vh] gap-2 overflow-y-scroll">
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
    </>
  )
}