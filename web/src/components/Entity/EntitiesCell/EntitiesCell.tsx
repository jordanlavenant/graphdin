import type { FindEntities, FindEntitiesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Entities from 'src/components/Entity/Entities'

export const QUERY: TypedDocumentNode<
  FindEntities,
  FindEntitiesVariables
> = gql`
  query FindEntities {
    entities {
      id
      firstName
      lastName
      visible
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No entities yet. '}
      <Link to={routes.newEntity()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindEntities>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  entities,
}: CellSuccessProps<FindEntities, FindEntitiesVariables>) => {
  return <Entities entities={entities} />
}
