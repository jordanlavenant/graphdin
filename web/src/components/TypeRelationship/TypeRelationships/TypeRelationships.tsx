import type {
  DeleteTypeRelationshipMutation,
  DeleteTypeRelationshipMutationVariables,
  FindTypeRelationships,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TypeRelationship/TypeRelationshipsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_TYPE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  DeleteTypeRelationshipMutation,
  DeleteTypeRelationshipMutationVariables
> = gql`
  mutation DeleteTypeRelationshipMutation($id: Int!) {
    deleteTypeRelationship(id: $id) {
      id
    }
  }
`

const TypeRelationshipsList = ({
  typeRelationships,
}: FindTypeRelationships) => {
  const [deleteTypeRelationship] = useMutation(
    DELETE_TYPE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('TypeRelationship deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id: DeleteTypeRelationshipMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete typeRelationship ' + id + '?')
    ) {
      deleteTypeRelationship({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Label</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {typeRelationships.map((typeRelationship) => (
            <tr key={typeRelationship.id}>
              <td>{truncate(typeRelationship.id)}</td>
              <td>{truncate(typeRelationship.label)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.typeRelationship({ id: typeRelationship.id })}
                    title={
                      'Show typeRelationship ' + typeRelationship.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTypeRelationship({
                      id: typeRelationship.id,
                    })}
                    title={'Edit typeRelationship ' + typeRelationship.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete typeRelationship ' + typeRelationship.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(typeRelationship.id)}
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

export default TypeRelationshipsList
