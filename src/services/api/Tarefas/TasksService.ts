import { Api } from '../ApiConfig'
import { ApiException } from '../ApiException'

export interface ITask {
  uuid: string;
  info: string;
  isCompleted: boolean;
}

const getAll = async (): Promise<ITask[] | ApiException> => {
  try {
    const { data } = await Api().get('/tasks')
    return data
  } catch(error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros!')
  }
}

const getById = async (id: string): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().get(`/tasks/${id}`)
    return data
  } catch(error: any) {
    return new ApiException(error.message || 'Erro ao buscar o registro!')
  }
}

const create = async (dataToCreate: Omit<ITask, 'uuid'>): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().post('/tasks', dataToCreate)
    return data
  } catch(error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro!')
  }
}

const updateById = async (id: string, dataToUpdate: Omit<ITask, 'uuid'>): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().put(`/tasks/${id}`, {...dataToUpdate, uuid: id})
    return data
  } catch(error: any) {
    return new ApiException(error.message || 'Erro ao atualizar o registro!')
  }
}

const deleteById = async (id: string): Promise<ITask | ApiException> => {
  try {
    const { data } = await Api().delete(`/tasks/${id}`)
    return data
  } catch(error: any) {
    return new ApiException(error.message || 'Erro ao deletar registro!')
  }
}

export const TasksService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}