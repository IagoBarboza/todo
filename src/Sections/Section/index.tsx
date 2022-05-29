import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TodoContext, ISection } from '../../common/TodoContext'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'react-bootstrap'

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

const ActionButton = styled(Button)`
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

  function handleEditTask (taskId: string) {
    console.log('handleEditTask', taskId)
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

  function handleRemoveSection () {
    setSections(currentSections => currentSections.filter(section => section.id !== id))
  }

  return (
    <Container>
      <Header>
        <HeaderDescription>{description}</HeaderDescription>
        <div>
          <ActionButton onClick={handleAddTask}>Add Task</ActionButton>
          {hasSelectedTasks && <ActionButton
            variant="secondary"
            onClick={handleRemoveSelected}
          >
            Remove Selected Tasks
          </ActionButton>}
          <ActionButton
            variant="secondary"
            onClick={handleRemoveSection}
          >
            Remove Section
          </ActionButton>
        </div>
      </Header>
      <Tasks>
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onSelection={handleTaskSelection}
            onEdit={handleEditTask}
            onRemove={handleRemoveTask}
          />
        ))}
      </Tasks>
    </Container>
  )
}