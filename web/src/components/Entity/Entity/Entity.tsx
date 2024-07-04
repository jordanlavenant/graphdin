import type {
  DeleteEntityMutation,
  DeleteEntityMutationVariables,
  FindEntityById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

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

interface Props {
  entity: NonNullable<FindEntityById['entity']>
}

const Entity = ({ entity }: Props) => {
  const [deleteEntity] = useMutation(DELETE_ENTITY_MUTATION, {
    onCompleted: () => {
      toast.success('Entity deleted')
      navigate(routes.entities())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEntityMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete entity ' + id + '?')) {
      deleteEntity({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Entity {entity.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{entity.id}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{entity.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{entity.lastName}</td>
            </tr>
            <tr>
              <th>Visible</th>
              <td>{checkboxInputTag(entity.visible)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(entity.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(entity.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEntity({ id: entity.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(entity.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Entity
