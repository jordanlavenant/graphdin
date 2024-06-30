import type {
  QueryResolvers,
  MutationResolvers,
  RelationshipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const relationships: QueryResolvers['relationships'] = () => {
  return db.relationship.findMany()
}

export const relationship: QueryResolvers['relationship'] = ({ id }) => {
  return db.relationship.findUnique({
    where: { id },
  })
}

export const createRelationship: MutationResolvers['createRelationship'] = ({
  input,
}) => {
  return db.relationship.create({
    data: input,
  })
}

export const updateRelationship: MutationResolvers['updateRelationship'] = ({
  id,
  input,
}) => {
  return db.relationship.update({
    data: input,
    where: { id },
  })
}

export const deleteRelationship: MutationResolvers['deleteRelationship'] = ({
  id,
}) => {
  return db.relationship.delete({
    where: { id },
  })
}

export const Relationship: RelationshipRelationResolvers = {
  typeRelationship: (_obj, { root }) => {
    return db.relationship
      .findUnique({ where: { id: root?.id } })
      .typeRelationship()
  },
  entityOne: (_obj, { root }) => {
    return db.relationship.findUnique({ where: { id: root?.id } }).entityOne()
  },
  entityTwo: (_obj, { root }) => {
    return db.relationship.findUnique({ where: { id: root?.id } }).entityTwo()
  },
}
