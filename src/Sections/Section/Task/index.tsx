import styled from 'styled-components'
import { ITask } from '../../../common/TodoContext'

const Container = styled.section`
  display: flex;
  height: 40px;
  padding: 10px;
  align-items: center;
  background: #E3E3E3;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
`

export default function Task ({description}: ITask): JSX.Element {
  return (
    <Container>
      {description}
    </Container>
  )
}