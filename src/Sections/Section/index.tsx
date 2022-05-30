import { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TodoContext, ISection, ITask } from '../../common/TodoContext'
import Task from './Task'
import { v4 as uuidv4 } from 'uuid'
import { Button, Dropdown } from 'react-bootstrap'
import EditDialog from './EditDialog'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 60px;
  padding: 20px;
  // border: 2px solid #20232a;
  background: #e8e8e8;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-bottom: 50px;
`

const HeaderDescription = styled.div`
  flex: 1;
  font-size: 23px;
  font-weight: 300;
  color: #20232a;
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
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleAddTask}>Add Task</Dropdown.Item>
            <Dropdown.Item onClick={() => setResourceToEdit({ id, description, tasks })}>Edit Section</Dropdown.Item>
            <Dropdown.Item onClick={handleRemoveSection}>Remove Section</Dropdown.Item>
            {hasSelectedTasks && <Dropdown.Item onClick={handleRemoveSelected}>Remove Selected Tasks</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
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