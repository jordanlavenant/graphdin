import EditTypeRelationshipCell from 'src/components/TypeRelationship/EditTypeRelationshipCell'

type TypeRelationshipPageProps = {
  id: number
}

const EditTypeRelationshipPage = ({ id }: TypeRelationshipPageProps) => {
  return <EditTypeRelationshipCell id={id} />
}

export default EditTypeRelationshipPage
