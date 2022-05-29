import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface TodoItem {
  id: string
  description: string
}

export interface TodoSection {
  id: string
  description: string
  items: TodoItem[]
}

export interface TodoContextProps {
  sections: TodoSection[]
  setSections: Dispatch<SetStateAction<TodoSection[]>>
}

// @ts-expect-error
export const TodoContext = createContext<TodoContextProps>(null)

export const useTodoContext = (): TodoContextProps => useContext(TodoContext)
