import type {
  QueryResolvers,
  MutationResolvers,
  TypeRelationshipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const typeRelationships: QueryResolvers['typeRelationships'] = () => {
  return db.typeRelationship.findMany()
}

export const typeRelationship: QueryResolvers['typeRelationship'] = ({
  id,
}) => {
  return db.typeRelationship.findUnique({
    where: { id },
  })
}

export const createTypeRelationship: MutationResolvers['createTypeRelationship'] =
  ({ input }) => {
    return db.typeRelationship.create({
      data: input,
    })
  }

export const updateTypeRelationship: MutationResolvers['updateTypeRelationship'] =
  ({ id, input }) => {
    return db.typeRelationship.update({
      data: input,
      where: { id },
    })
  }

export const deleteTypeRelationship: MutationResolvers['deleteTypeRelationship'] =
  ({ id }) => {
    return db.typeRelationship.delete({
      where: { id },
    })
  }

export const TypeRelationship: TypeRelationshipRelationResolvers = {
  Relationship: (_obj, { root }) => {
    return db.typeRelationship
      .findUnique({ where: { id: root?.id } })
      .Relationship()
  },
}
