interface ITaskProps {
  isCompleted: boolean
  onClickDelete: () => void
  onClickCompleted: () => void

  children: React.ReactNode
}

export const Task: React.FC<ITaskProps> = ({ isCompleted, onClickDelete, onClickCompleted, children }) => {
  return (
    <li className="flex items-center justify-between gap-2 px-4 py-2 min-w-96 bg-violet-500 rounded-sm">
      <p className="truncate">{children}</p>
      <div className="flex gap-2 items-center justify-center">
        <button onClick={onClickDelete}>Deletar</button>
        <button onClick={onClickCompleted} className={`${isCompleted ? 'bg-green-500' : 'bg-red-500'} w-4 h-4 rounded-full`}></button>
      </div>
    </li>
  )
}