import styled from 'styled-components'
import { TodoSection } from '../../common/TodoContext'

const Container = styled.section`
  display: flex;
  height: 60px;
  padding: 10px;
  align-items: center;
  background: green;
  &:hover {
    cursor: pointer;
  }
`

export default function Section ({id, description}: TodoSection): JSX.Element {
  return (
    <Container>
      {description}
    </Container>
  )
}