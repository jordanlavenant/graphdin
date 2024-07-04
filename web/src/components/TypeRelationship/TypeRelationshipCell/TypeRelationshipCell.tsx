import type {
  FindTypeRelationshipById,
  FindTypeRelationshipByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import TypeRelationship from 'src/components/TypeRelationship/TypeRelationship'

export const QUERY: TypedDocumentNode<
  FindTypeRelationshipById,
  FindTypeRelationshipByIdVariables
> = gql`
  query FindTypeRelationshipById($id: Int!) {
    typeRelationship: typeRelationship(id: $id) {
      id
      label
      color
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TypeRelationship not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTypeRelationshipByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  typeRelationship,
}: CellSuccessProps<
  FindTypeRelationshipById,
  FindTypeRelationshipByIdVariables
>) => {
  return <TypeRelationship typeRelationship={typeRelationship} />
}
