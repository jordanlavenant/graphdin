export const schema = gql`
  type Relationship {
    id: Int!
    typeRelationship: TypeRelationship!
    entityOne: Entity!
    entityTwo: Entity!
    entityOneId: Int!
    entityTwoId: Int!
    typeRelationshipId: Int!
  }

  type Query {
    relationships: [Relationship!]! @requireAuth
    relationship(id: Int!): Relationship @requireAuth
  }

  input CreateRelationshipInput {
    entityOneId: Int!
    entityTwoId: Int!
    typeRelationshipId: Int!
  }

  input UpdateRelationshipInput {
    entityOneId: Int
    entityTwoId: Int
    typeRelationshipId: Int
  }

  type Mutation {
    createRelationship(input: CreateRelationshipInput!): Relationship!
      @requireAuth
    updateRelationship(
      id: Int!
      input: UpdateRelationshipInput!
    ): Relationship! @requireAuth
    deleteRelationship(id: Int!): Relationship! @requireAuth
  }
`
