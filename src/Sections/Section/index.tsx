import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TodoContext, ISection } from '../../common/TodoContext'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  padding: 10px;
  border: 1px solid gray;
  margin-bottom: 15px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const HeaderDescription = styled.h4`
  flex: 1;
`

const HeaderActions = styled.div`
  display: flex;
`

const AddButton = styled.button`
  height: 30px;
  width: 30px;
  font-size: 20px;
  cursor: pointer;
`

const RemoveSelectedButton = styled.button`
  height: 30px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 10px;
`

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
`

export default function Section ({id, description, tasks}: ISection): JSX.Element {
  const { setSections } = useContext(TodoContext)
  const [ selectedTasksIds, setSelectedTasksIds ] = useState<string[]>([])

  const hasSelectedTasks = useMemo(() => !!selectedTasksIds.length, [selectedTasksIds])

  function handleAddTask () {
    setSections(currentSections => currentSections.map(section => section.id === id 
      ? {...section, tasks: [...section.tasks, { id: uuidv4(), description: 'New Task' }]} 
      : section
    )) 
  }

  function handleRemoveTask (taskToRemove: string) {
    setSections(currentSections => currentSections.map(section => section.id === id 
      ? {...section, tasks: section.tasks.filter(t => t.id !== taskToRemove)} 
      : section
    ))
  }

  function handleTaskSelection (taskId: string, checked: boolean) {
    if (checked) setSelectedTasksIds([...selectedTasksIds, taskId])
    else setSelectedTasksIds(selectedTasksIds.filter(tid => tid !== taskId))
  }

  function handleRemoveSelected () {
    setSections(currentSections => currentSections.map(section => section.id === id
      ? {
          ...section,
          tasks: section.tasks.filter(task => 
            !selectedTasksIds.find(tid => 
              task.id === tid 
            )
          )
        } 
      : section
    ))
    setSelectedTasksIds([])
  }

  return (
    <Container>
      <Header>
        <HeaderDescription>{description}</HeaderDescription>
        <HeaderActions>
          <AddButton onClick={handleAddTask}>+</AddButton>
          {hasSelectedTasks && <RemoveSelectedButton
            onClick={handleRemoveSelected}
          >
            Remove Selected
          </RemoveSelectedButton>}
        </HeaderActions>
      </Header>
      <Tasks>
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onSelection={handleTaskSelection}
            onRemove={handleRemoveTask}
          />
        ))}
      </Tasks>
    </Container>
  )
}