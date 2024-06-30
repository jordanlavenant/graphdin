import TypeRelationshipCell from 'src/components/TypeRelationship/TypeRelationshipCell'

type TypeRelationshipPageProps = {
  id: number
}

const TypeRelationshipPage = ({ id }: TypeRelationshipPageProps) => {
  return <TypeRelationshipCell id={id} />
}

export default TypeRelationshipPage
