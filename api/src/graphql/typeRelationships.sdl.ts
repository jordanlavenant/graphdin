export const schema = gql`
  type TypeRelationship {
    id: Int!
    label: String!
    color: String!
    Relationship: [Relationship]!
  }

  type Query {
    typeRelationships: [TypeRelationship!]! @requireAuth
    typeRelationship(id: Int!): TypeRelationship @requireAuth
  }

  input CreateTypeRelationshipInput {
    label: String!
    color: String!
  }

  input UpdateTypeRelationshipInput {
    label: String
    color: String
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
