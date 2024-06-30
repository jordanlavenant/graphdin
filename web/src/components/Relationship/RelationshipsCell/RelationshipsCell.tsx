import type {
  FindRelationships,
  FindRelationshipsVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Relationships from 'src/components/Relationship/Relationships'

export const QUERY: TypedDocumentNode<
  FindRelationships,
  FindRelationshipsVariables
> = gql`
  query FindRelationships {
    relationships {
      id
      entityOneId
      entityTwoId
      typeRelationshipId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No relationships yet. '}
      <Link to={routes.newRelationship()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindRelationships>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  relationships,
}: CellSuccessProps<FindRelationships, FindRelationshipsVariables>) => {
  return <Relationships relationships={relationships} />
}
