import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface ITask {
  id: string
  description: string
  done: boolean
}

export interface ISection {
  id: string
  description: string
  tasks: ITask[]
}

export interface TodoContextProps {
  sections: ISection[]
  setSections: Dispatch<SetStateAction<ISection[]>>
}

// @ts-expect-error
export const TodoContext = createContext<TodoContextProps>(null)

export const useTodoContext = (): TodoContextProps => useContext(TodoContext)
