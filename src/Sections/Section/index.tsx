import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TodoContext, ISection, ITask } from '../../common/TodoContext'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'react-bootstrap'
import EditDialog from './EditDialog'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  padding: 15px;
  border: 1px solid #E3E3E3;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
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
  const { sections, setSections } = useContext(TodoContext)
  const [ selectedTasksIds, setSelectedTasksIds ] = useState<string[]>([])
  const [ resourceToEdit, setResourceToEdit ] = useState<ISection | ITask | null>(null)

  const hasSelectedTasks = useMemo(() => !!selectedTasksIds.length, [selectedTasksIds])

  function handleAddTask () {
    setSections(currentSections => currentSections.map(section => section.id === id 
      ? {...section, tasks: [...section.tasks, { id: uuidv4(), description: 'New Task', done: false }]} 
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

  function handleRemoveSection () {
    setSections(currentSections => currentSections.filter(section => section.id !== id))
  }

  function allowDrop(e: any) {
    e.preventDefault()
  }

  function drop(e: any) {
    e.preventDefault()
    const previousTaskId = e.target.attributes['drop-id'].value;
    const taskToMoveId = e.dataTransfer.getData('text')
    let taskToMove: ITask 
    
    sections.forEach(section => {
      if (!taskToMove) taskToMove = section.tasks.find(task => task.id === taskToMoveId) as ITask
    })
    
    setSections(currentSections => currentSections.map(section => ({
      ...section,
      tasks: section.tasks
        .filter(t => t.id !== taskToMoveId)
        .reduce<ITask[]>((acc, t) => t.id === previousTaskId ? [...acc, t, taskToMove] : [...acc, t], [])
    })))
  }

  function drag(e: any) {
    e.dataTransfer.setData("text", e.target.id)
  }

  return (
    <Container
      id={id}
      draggable
      onDragStart={drag}
    >
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
            onClick={() => setResourceToEdit({ id, description, tasks })}
          >
            Edit Section
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={handleRemoveSection}
          >
            Remove Section
          </ActionButton>
        </div>
      </Header>
      <Tasks>
        {tasks.map((task, index) => (
          <>
            <Task
              key={task.id}
              {...task}
              onSelection={handleTaskSelection}
              onEdit={setResourceToEdit}
              onRemove={handleRemoveTask}
            />
            <div
              key={index}
              drop-id={task.id}
              style={{ height: '20px' }}
              onDrop={drop}
              onDragOver={allowDrop}
            ></div>
          </>
        ))}
      </Tasks>
      <EditDialog
        resourceToEdit={resourceToEdit}
        onHide={() => setResourceToEdit(null)}
      />
    </Container>
  )
}