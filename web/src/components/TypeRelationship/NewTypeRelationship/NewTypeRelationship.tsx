import type {
  CreateTypeRelationshipMutation,
  CreateTypeRelationshipInput,
  CreateTypeRelationshipMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { GraphRedrawContext } from '@/context/GraphRedrawContext'
import { useContext } from 'react'

import TypeRelationshipForm from 'src/components/TypeRelationship/TypeRelationshipForm'

const CREATE_TYPE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  CreateTypeRelationshipMutation,
  CreateTypeRelationshipMutationVariables
> = gql`
  mutation CreateTypeRelationshipMutation(
    $input: CreateTypeRelationshipInput!
  ) {
    createTypeRelationship(input: $input) {
      id
    }
  }
`

const NewTypeRelationship = () => {
  const { setRedraw } = useContext(GraphRedrawContext)

  const [createTypeRelationship, { loading, error }] = useMutation(
    CREATE_TYPE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('TypeRelationship created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTypeRelationshipInput) => {
    createTypeRelationship({ variables: { input } })
    setRedraw(true)
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New TypeRelationship
        </h2>
      </header>
      <div className="rw-segment-main">
        <TypeRelationshipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTypeRelationship
