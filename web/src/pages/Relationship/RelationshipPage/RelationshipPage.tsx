import RelationshipCell from 'src/components/Relationship/RelationshipCell'

type RelationshipPageProps = {
  id: number
}

const RelationshipPage = ({ id }: RelationshipPageProps) => {
  return <RelationshipCell id={id} />
}

export default RelationshipPage
