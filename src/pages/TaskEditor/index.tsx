import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ApiException, TasksService } from '../../services'

export const TaskEditor = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()

  const [ isCompleted, setIsCompleted ] = useState(false)
  const [ newTaskInfo, setNewTaskInfo ] = useState('')

  const handleSaveChanges = useCallback(() => {
    if(!taskId) return
    
    TasksService.updateById(taskId, {isCompleted, info: newTaskInfo})
      .then((result) => {
        if(result instanceof ApiException) alert(result.message)

        alert('Tarefa salva com sucesso!')
        navigate('/')
      })
  }, [newTaskInfo, isCompleted])

  const handleDeleteTask = useCallback(() => {
    if(!taskId) return

    TasksService.deleteById(taskId)
      .then((result) => {
        if(result instanceof ApiException) alert(result.message)
        
        alert('Tarefa deletada com sucesso!')
        navigate('/')
      })
  }, [taskId])

  useEffect(() => {

    if(!taskId) {
      throw new Error('Tarefa não encontrada')
    }
    
    TasksService.getById(taskId)
      .then((result) => {
        if(result instanceof ApiException) throw new Error(result.message)

        setNewTaskInfo(result.info)
        setIsCompleted(result.isCompleted)
      })
  }, [])

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-zinc-100">
      <label className="flex flex-col rounded-md p-4 h-96 w-96 border-2 border-zinc-500">
        <Link className="rounded-sm bg-zinc-300 hover:bg-zinc-400 w-12 text-center" to={'/'}>Voltar</Link> 
        <span>ID: {taskId}</span>
        <textarea rows={60} className="border-2 border-zinc-500" value={newTaskInfo} onChange={(e) => setNewTaskInfo(e.target.value)} />
        <input className="rounded-md" type="checkbox" checked={isCompleted} onChange={() => setIsCompleted(isCompleted ? false : true)}/>
        <div className='flex gap-2'>
          <button onClick={handleSaveChanges} className='bg-green-500 rounded-sm p-2'>Salvar</button>
          <button onClick={handleDeleteTask} className='bg-red-500 rounded-sm p-2'>Deletar</button>
        </div>
      </label>
    </div>
  )
}