import { useContext } from 'react'
import styled from 'styled-components'
import { TodoContext } from '../common/TodoContext'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'react-bootstrap'

const Container = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #20232a;
  height: 60px;
`

const Title = styled.div`
  text-align: center;
  color: white;
  font-size: 20px;
`

const AddButton = styled(Button)`
  position: absolute;
  right: 10px;
  cursor: pointer;
`

export default function Header (): JSX.Element {
  const {setSections} = useContext(TodoContext)

  function handleAddSection() {
    setSections(currentSections => [...currentSections, { id: uuidv4(), description: 'New section', tasks: [] }])
  }

  return (
    <Container>
      <Title>Todo App</Title>
      <AddButton
        onClick={handleAddSection}
        size="md"
      >
        Add Section
      </AddButton>
    </Container>
  )
}