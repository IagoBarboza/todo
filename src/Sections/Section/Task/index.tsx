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

const Description = styled.h4`
  flex: 1;
`

const Actions = styled.div`
  display: flex;
  background: green;
`

const RemoveButton = styled.button`
  height: 30px;
  width: 30px;
  font-size: 20px;
  cursor: pointer;
`

interface TaskProps extends ITask {
  onSelection: (id: string, value: boolean) => void
  onRemove: (id: string) => void
}


export default function Task ({ id, description, onSelection, onRemove }: TaskProps): JSX.Element {

  return (
    <Container>
      <div>
        <input
          type="checkbox"
          onChange={e => onSelection(id, e.target.checked)}
        />
      </div>
      <Description>{description}</Description>
      <Actions>
        <RemoveButton onClick={() => onRemove(id)}>-</RemoveButton>
      </Actions>
    </Container>
  )
}