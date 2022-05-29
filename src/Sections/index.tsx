import { useContext } from 'react'
import styled from 'styled-components'
import { ISection, TodoContext } from '../common/TodoContext'
import Section from './Section'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export default function Sections (): JSX.Element {
  const { sections, setSections } = useContext(TodoContext)

  function allowDrop(e: any) {
    e.preventDefault()
  }

  function drop(e: any) {
    e.preventDefault()
    const previousSectionId = e.target.attributes['drop-id'].value;
    const sectionToMoveId = e.dataTransfer.getData('text')
    const sectionToMove = sections.find(section => section.id === sectionToMoveId) as ISection
    
    setSections(currentSections => currentSections
      .filter(section => section.id !== sectionToMoveId)
      .reduce<ISection[]>((acc, section) => section.id === previousSectionId ? [...acc, section, sectionToMove] : [...acc, section], [])
    )
  }

  return (
    <Container>
      {sections.map((section, index) => (
        <>
          <Section key={section.id} {...section} />
          <div
            key={index}
            drop-id={section.id}
            style={{ height: '20px' }}
            onDrop={drop}
            onDragOver={allowDrop}
          ></div>
        </>
      ))}
    </Container>
  )
}