import EditRelationshipCell from 'src/components/Relationship/EditRelationshipCell'

type RelationshipPageProps = {
  id: number
}

const EditRelationshipPage = ({ id }: RelationshipPageProps) => {
  return <EditRelationshipCell id={id} />
}

export default EditRelationshipPage
