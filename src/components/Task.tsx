import { Link } from 'react-router-dom'
import { ITask } from '../services/api/Tarefas/TasksService'

interface ITaskProps {
  content: ITask
  onClickDelete: () => void
  onClickCompleted: () => void

  children: React.ReactNode
}

export const Task: React.FC<ITaskProps> = ({ content, onClickDelete, onClickCompleted, children }) => {
  return (
    <li className="flex items-center justify-between gap-2 px-4 py-2 min-w-96 bg-violet-500 rounded-sm">
      <button onClick={onClickCompleted} className={`${content.isCompleted ? 'bg-green-500 hover:bg-green-550' : 'bg-red-500 hover:bg-red-600'} w-4 h-4 flex-shrink-0 rounded-full`}></button>
      <p className="truncate flex-grow">{children}</p>
      <div className="flex gap-2 items-center justify-center">
        <Link to={`/${content.uuid}`}>Editar</Link>
        <button onClick={onClickDelete}>🗑️</button>
      </div>
    </li>
  )
}