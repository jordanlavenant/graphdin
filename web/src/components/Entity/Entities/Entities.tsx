import type {
  DeleteEntityMutation,
  DeleteEntityMutationVariables,
  FindEntities,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Entity/EntitiesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ENTITY_MUTATION: TypedDocumentNode<
  DeleteEntityMutation,
  DeleteEntityMutationVariables
> = gql`
  mutation DeleteEntityMutation($id: Int!) {
    deleteEntity(id: $id) {
      id
    }
  }
`

const EntitiesList = ({ entities }: FindEntities) => {
  const [deleteEntity] = useMutation(DELETE_ENTITY_MUTATION, {
    onCompleted: () => {
      toast.success('Entity deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteEntityMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete entity ' + id + '?')) {
      deleteEntity({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr key={entity.id}>
              <td>{truncate(entity.id)}</td>
              <td>{truncate(entity.firstName)}</td>
              <td>{truncate(entity.lastName)}</td>
              <td>{truncate(entity.age)}</td>
              <td>{timeTag(entity.createdAt)}</td>
              <td>{timeTag(entity.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.entity({ id: entity.id })}
                    title={'Show entity ' + entity.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEntity({ id: entity.id })}
                    title={'Edit entity ' + entity.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete entity ' + entity.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(entity.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EntitiesList
