import { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiException, TasksService } from '../../services'

export const TaskEditor = () => {
  const navigate = useNavigate()

  const { taskId } = useParams()

  if(!taskId) {
    throw new Error('Tarefa não encontrada')
  }

  const isCompletedInput = useRef<HTMLInputElement>(null)
  const taskInfoInput = useRef<HTMLTextAreaElement>(null)

  const handleSaveChanges = useCallback(() => {
    const isCompleted = isCompletedInput.current?.checked
    const taskInfo = taskInfoInput.current?.value.trim()

    if(isCompleted == undefined || !taskInfo) {
      alert('Todos os campos devem ser preenchidos!')
    } else {
      TasksService.updateById(taskId, {isCompleted, info: taskInfo})
        .then((result) => {
          if(result instanceof ApiException) {
            alert(result.message)
          } else {
            alert('Tarefa salva com sucesso!')
            navigate('/')
          }
        })
    }
  }, [taskInfoInput, isCompletedInput])

  const handleDeleteTask = useCallback(() => {
    TasksService.deleteById(taskId)
      .then((result) => {
        if(result instanceof ApiException) {
          alert(result.message)
        } else {
          alert('Tarefa deletada com sucesso!')
          navigate('/')
        }
      })
  }, [taskId])

  useEffect(() => {
    TasksService.getById(taskId)
      .then((result) => {
        if(result instanceof ApiException) throw new Error(result.message)

        if(taskInfoInput.current && isCompletedInput.current){
          taskInfoInput.current.placeholder = result.info
          isCompletedInput.current.checked = result.isCompleted
        }
      })
  }, [])

  return (
    <div className="grow flex items-center justify-center bg-zinc-100">
      <label className="flex flex-col rounded-md p-4 h-96 w-96 border-2 border-zinc-500">
        <Link className="rounded-sm bg-zinc-300 hover:bg-zinc-400 w-12 text-center" to={'/'}>Voltar</Link> 
        <span>ID: {taskId}</span>
        <textarea rows={60} className="border-2 border-zinc-500" ref={taskInfoInput}/>
        <input className="rounded-md" type="checkbox" ref={isCompletedInput}/>
        <div className="flex gap-2">
          <button onClick={handleSaveChanges} className="bg-green-500 rounded-sm p-2">Salvar</button>
          <button onClick={handleDeleteTask} className="bg-red-500 rounded-sm p-2">Deletar</button>
        </div>
      </label>
    </div>
  )
}