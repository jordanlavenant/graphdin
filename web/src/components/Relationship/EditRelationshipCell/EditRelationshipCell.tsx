import type {
  EditRelationshipById,
  UpdateRelationshipInput,
  UpdateRelationshipMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RelationshipForm from 'src/components/Relationship/RelationshipForm'

export const QUERY: TypedDocumentNode<EditRelationshipById> = gql`
  query EditRelationshipById($id: Int!) {
    relationship: relationship(id: $id) {
      id
      entityOneId
      entityTwoId
      typeRelationshipId
    }
  }
`

const UPDATE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  EditRelationshipById,
  UpdateRelationshipMutationVariables
> = gql`
  mutation UpdateRelationshipMutation(
    $id: Int!
    $input: UpdateRelationshipInput!
  ) {
    updateRelationship(id: $id, input: $input) {
      id
      entityOneId
      entityTwoId
      typeRelationshipId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  relationship,
}: CellSuccessProps<EditRelationshipById>) => {
  const [updateRelationship, { loading, error }] = useMutation(
    UPDATE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Relationship updated')
        navigate(routes.relationships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRelationshipInput,
    id: EditRelationshipById['relationship']['id']
  ) => {
    updateRelationship({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Relationship {relationship?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RelationshipForm
          relationship={relationship}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
