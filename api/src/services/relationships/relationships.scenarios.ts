import type { Prisma, Relationship } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RelationshipCreateArgs>({
  relationship: {
    one: {
      data: {
        typeRelationship: { create: { label: 'String' } },
        entityOne: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-06-30T21:22:21.407Z',
          },
        },
        entityTwo: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-06-30T21:22:21.407Z',
          },
        },
      },
    },
    two: {
      data: {
        typeRelationship: { create: { label: 'String' } },
        entityOne: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-06-30T21:22:21.407Z',
          },
        },
        entityTwo: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-06-30T21:22:21.408Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Relationship, 'relationship'>
