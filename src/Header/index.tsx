import { useContext } from 'react'
import styled from 'styled-components'
import { TodoContext } from '../common/TodoContext'
import { v4 as uuidv4 } from 'uuid'

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background: gray;
`

const Title = styled.h1`
  text-align: center;
`

const AddButton = styled.button`
  position: absolute;
  right: 0px;
  height: 100%;
  width: 60px;
  font-size: 40px;
  cursor: pointer;
`

export default function Header (): JSX.Element {
  const {setSections} = useContext(TodoContext)

  function handleAddSection() {
    setSections(currentSections => [...currentSections, { id: uuidv4(), description: 'New section', tasks: [] }])
  }

  return (
    <Container>
      <Title>TODO</Title>
      <AddButton onClick={handleAddSection}>+</AddButton>
    </Container>
  )
}