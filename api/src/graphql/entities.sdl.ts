export const schema = gql`
  type Entity {
    id: Int!
    firstName: String!
    lastName: String!
    visible: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    RelationshipsAsOne: [Relationship]!
    RelationshipsAsTwo: [Relationship]!
  }

  type Query {
    entities: [Entity!]! @requireAuth
    entity(id: Int!): Entity @requireAuth
  }

  input CreateEntityInput {
    firstName: String!
    lastName: String!
    visible: Boolean!
  }

  input UpdateEntityInput {
    firstName: String
    lastName: String
    visible: Boolean
  }

  type Mutation {
    createEntity(input: CreateEntityInput!): Entity! @requireAuth
    updateEntity(id: Int!, input: UpdateEntityInput!): Entity! @requireAuth
    deleteEntity(id: Int!): Entity! @requireAuth
  }
`
