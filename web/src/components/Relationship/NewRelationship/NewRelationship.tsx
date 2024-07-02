import type {
  CreateRelationshipMutation,
  CreateRelationshipInput,
  CreateRelationshipMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { GraphRedrawContext } from '@/context/GraphRedrawContext'
import { useContext } from 'react'

import RelationshipForm from 'src/components/Relationship/RelationshipForm'

const CREATE_RELATIONSHIP_MUTATION: TypedDocumentNode<
  CreateRelationshipMutation,
  CreateRelationshipMutationVariables
> = gql`
  mutation CreateRelationshipMutation($input: CreateRelationshipInput!) {
    createRelationship(input: $input) {
      id
    }
  }
`

const NewRelationship = () => {
  const { setRedraw } = useContext(GraphRedrawContext)

  const [createRelationship, { loading, error }] = useMutation(
    CREATE_RELATIONSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Relationship created')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateRelationshipInput) => {
    createRelationship({ variables: { input } })
    setRedraw(true)
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Relationship</h2>
      </header>
      <div className="rw-segment-main">
        <RelationshipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRelationship
