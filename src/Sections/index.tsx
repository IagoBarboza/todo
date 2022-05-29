import { useContext } from 'react'
import styled from 'styled-components'
import { TodoContext } from '../common/TodoContext'
import Section from './Section'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

export default function Sections (): JSX.Element {
  const { sections } = useContext(TodoContext)

  return (
    <Container>
      {sections.map(section => (
        <Section key={section.id} {...section} />
      ))}
    </Container>
  )
}