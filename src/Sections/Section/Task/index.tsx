import styled from 'styled-components'
import { ITask } from '../../../common/TodoContext'
import { Button } from 'react-bootstrap'
import { BaseSyntheticEvent } from 'react'

const Container = styled.div<{ done: boolean }>`
  display: flex;
  height: 65px;
  padding: 15px;
  align-items: center;
  background: ${props => props.done ? '#93E792' : 'white'};
  border: 1px solid #cfcfcf;
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

export default function Task ({ id, description, done, onSelection, onEdit, onRemove }: TaskProps): JSX.Element {

  function drag(e: any) {
    e.dataTransfer.setData("text", e.target.id)
  }

  return (
    <Container
      id={id}
      done={done}
      draggable
      onDragStart={drag}
    >
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
          onClick={() => onEdit({ id, description, done })
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