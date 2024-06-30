import type {
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  FindRelationships,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Relationship/RelationshipsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables
> = gql`
  mutation DeleteRelationshipMutation($id: Int!) {
    deleteRelationship(id: $id) {
      id
    }
  }
`

const RelationshipsList = ({ relationships }: FindRelationships) => {
  const [deleteRelationship] = useMutation(DELETE_RELATIONSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Relationship deleted')
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

  const onDeleteClick = (id: DeleteRelationshipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete relationship ' + id + '?')) {
      deleteRelationship({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Entity one id</th>
            <th>Entity two id</th>
            <th>Type relationship id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {relationships.map((relationship) => (
            <tr key={relationship.id}>
              <td>{truncate(relationship.id)}</td>
              <td>{truncate(relationship.entityOneId)}</td>
              <td>{truncate(relationship.entityTwoId)}</td>
              <td>{truncate(relationship.typeRelationshipId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.relationship({ id: relationship.id })}
                    title={'Show relationship ' + relationship.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRelationship({ id: relationship.id })}
                    title={'Edit relationship ' + relationship.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete relationship ' + relationship.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(relationship.id)}
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

export default RelationshipsList
