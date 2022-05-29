import styled from 'styled-components'
import { ITask } from '../../../common/TodoContext'
import { Button } from 'react-bootstrap'

const Container = styled.section`
  display: flex;
  height: 65px;
  padding: 10px;
  align-items: center;
  background: #E3E3E3;
  margin-bottom: 5px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`

const Description = styled.div`
  flex: 1;
  margin-left: 10px;
`

const Actions = styled.div`
  display: flex;
`

const ActionButton = styled(Button)`
  margin-left: 5px;
`

interface TaskProps extends ITask {
  onSelection: (id: string, value: boolean) => void
  onEdit: (task: ITask) => void
  onRemove: (id: string) => void
}


export default function Task ({ id, description, onSelection, onEdit, onRemove }: TaskProps): JSX.Element {
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
        <ActionButton
          variant="secondary"
          size="sm"
          onClick={() => onEdit({ id, description })
        }>
          Edit
        </ActionButton>
        <ActionButton
          variant="secondary"
          size="sm"
          onClick={() => onRemove(id)
        }>
          Remove
        </ActionButton>
      </Actions>
    </Container>
  )
}