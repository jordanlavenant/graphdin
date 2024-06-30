import type {
  DeleteRelationshipMutation,
  DeleteRelationshipMutationVariables,
  FindRelationshipById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  relationship: NonNullable<FindRelationshipById['relationship']>
}

const Relationship = ({ relationship }: Props) => {
  const [deleteRelationship] = useMutation(DELETE_RELATIONSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Relationship deleted')
      navigate(routes.relationships())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRelationshipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete relationship ' + id + '?')) {
      deleteRelationship({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Relationship {relationship.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{relationship.id}</td>
            </tr>
            <tr>
              <th>Entity one id</th>
              <td>{relationship.entityOneId}</td>
            </tr>
            <tr>
              <th>Entity two id</th>
              <td>{relationship.entityTwoId}</td>
            </tr>
            <tr>
              <th>Type relationship id</th>
              <td>{relationship.typeRelationshipId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRelationship({ id: relationship.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(relationship.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Relationship
