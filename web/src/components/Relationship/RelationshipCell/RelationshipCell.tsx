import type {
  FindRelationshipById,
  FindRelationshipByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Relationship from 'src/components/Relationship/Relationship'

export const QUERY: TypedDocumentNode<
  FindRelationshipById,
  FindRelationshipByIdVariables
> = gql`
  query FindRelationshipById($id: Int!) {
    relationship: relationship(id: $id) {
      id
      entityOneId
      entityTwoId
      typeRelationshipId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Relationship not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRelationshipByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  relationship,
}: CellSuccessProps<FindRelationshipById, FindRelationshipByIdVariables>) => {
  return <Relationship relationship={relationship} />
}
