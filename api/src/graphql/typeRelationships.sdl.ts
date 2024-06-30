export const schema = gql`
  type TypeRelationship {
    id: Int!
    label: String!
    Relationship: [Relationship]!
  }

  type Query {
    typeRelationships: [TypeRelationship!]! @requireAuth
    typeRelationship(id: Int!): TypeRelationship @requireAuth
  }

  input CreateTypeRelationshipInput {
    label: String!
  }

  input UpdateTypeRelationshipInput {
    label: String
  }

  type Mutation {
    createTypeRelationship(
      input: CreateTypeRelationshipInput!
    ): TypeRelationship! @requireAuth
    updateTypeRelationship(
      id: Int!
      input: UpdateTypeRelationshipInput!
    ): TypeRelationship! @requireAuth
    deleteTypeRelationship(id: Int!): TypeRelationship! @requireAuth
  }
`
