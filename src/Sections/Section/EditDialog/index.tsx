import { useState, useMemo, useEffect, useContext } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { ISection, ITask, TodoContext } from '../../../common/TodoContext'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

interface Props {
  resourceToEdit: ISection | ITask | null
  onHide: () => void
}

export default function EditDialog ({ resourceToEdit, onHide }: Props) {
  const [resource, setResource] = useState(resourceToEdit || { id: '', description: '', done: false })
  const { setSections } = useContext(TodoContext)

  useEffect(() => {
    if(resourceToEdit) setResource(resourceToEdit)
    else setResource({ id: '', description: '', done: false })
  }, [resourceToEdit])
  
  const resourceType = useMemo(() => {
    // @ts-expect-error
    return resourceToEdit && resourceToEdit.tasks ? 'section' : 'task'
  },
  [resourceToEdit])

  function handleSaveResource() {
    if (resourceType === 'section') {
      setSections(currentSections => 
        currentSections.map(section => section.id === resourceToEdit?.id
          ? {...section, description: resource.description}
          : section
        )
      )
    } else {
      setSections(currentSections => 
        currentSections.map(section => ({
            ...section,
            tasks: section.tasks.map(task => task.id === resourceToEdit?.id 
              ? {...task, ...resource}
              : task  
            )
          })
        )
      )
    }

    onHide()
  }

  return (
    <Modal show={!!resourceToEdit} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{resourceType === 'section' ? 'Edit Section' : 'Edit Task'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            // @ts-expect-error
            checked={resource?.done}
            onChange={e => setResource({ ...resource, done: e.target.checked })}
          />
          <div>Done</div>
        </CheckboxContainer>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            data-testid="reminder-description-input"
            type="text"
            id="reminderDescription"
            maxLength={30}
            value={resource.description}
            onChange={e => setResource({ ...resource, description: e.target.value })}
          />
          <Form.Text id="reminderDescription">
            The description must be 1-30 characters long
          </Form.Text>
        </Form.Group>

        <div>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSaveResource}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}