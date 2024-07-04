import type {
  DeleteTypeRelationshipMutation,
  DeleteTypeRelationshipMutationVariables,
  FindTypeRelationshipById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  typeRelationship: NonNullable<FindTypeRelationshipById['typeRelationship']>
}

const TypeRelationship = ({ typeRelationship }: Props) => {
  const [deleteTypeRelationship] = useMutation(
    DELETE_TYPE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('TypeRelationship deleted')
        navigate(routes.typeRelationships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TypeRelationship {typeRelationship.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{typeRelationship.id}</td>
            </tr>
            <tr>
              <th>Label</th>
              <td>{typeRelationship.label}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{typeRelationship.color}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTypeRelationship({ id: typeRelationship.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(typeRelationship.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TypeRelationship
