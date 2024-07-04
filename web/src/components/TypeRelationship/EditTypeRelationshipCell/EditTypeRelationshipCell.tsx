import type {
  EditTypeRelationshipById,
  UpdateTypeRelationshipInput,
  UpdateTypeRelationshipMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TypeRelationshipForm from 'src/components/TypeRelationship/TypeRelationshipForm'

export const QUERY: TypedDocumentNode<EditTypeRelationshipById> = gql`
  query EditTypeRelationshipById($id: Int!) {
    typeRelationship: typeRelationship(id: $id) {
      id
      label
      color
    }
  }
`

const UPDATE_TYPE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  EditTypeRelationshipById,
  UpdateTypeRelationshipMutationVariables
> = gql`
  mutation UpdateTypeRelationshipMutation(
    $id: Int!
    $input: UpdateTypeRelationshipInput!
  ) {
    updateTypeRelationship(id: $id, input: $input) {
      id
      label
      color
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  typeRelationship,
}: CellSuccessProps<EditTypeRelationshipById>) => {
  const [updateTypeRelationship, { loading, error }] = useMutation(
    UPDATE_TYPE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('TypeRelationship updated')
        navigate(routes.typeRelationships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTypeRelationshipInput,
    id: EditTypeRelationshipById['typeRelationship']['id']
  ) => {
    updateTypeRelationship({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit TypeRelationship {typeRelationship?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TypeRelationshipForm
          typeRelationship={typeRelationship}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
