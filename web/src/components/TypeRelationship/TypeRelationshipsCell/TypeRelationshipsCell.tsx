import type {
  FindTypeRelationships,
  FindTypeRelationshipsVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import TypeRelationships from 'src/components/TypeRelationship/TypeRelationships'

export const QUERY: TypedDocumentNode<
  FindTypeRelationships,
  FindTypeRelationshipsVariables
> = gql`
  query FindTypeRelationships {
    typeRelationships {
      id
      label
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No typeRelationships yet. '}
      <Link to={routes.newTypeRelationship()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindTypeRelationships>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  typeRelationships,
}: CellSuccessProps<FindTypeRelationships, FindTypeRelationshipsVariables>) => {
  return <TypeRelationships typeRelationships={typeRelationships} />
}
