import type { Prisma, Relationship } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RelationshipCreateArgs>({
  relationship: {
    one: {
      data: {
        typeRelationship: {
          create: { label: 'String5374871', color: 'String3228933' },
        },
        entityOne: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-07-02T17:12:13.458Z',
          },
        },
        entityTwo: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-07-02T17:12:13.458Z',
          },
        },
      },
    },
    two: {
      data: {
        typeRelationship: {
          create: { label: 'String676581', color: 'String870277' },
        },
        entityOne: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-07-02T17:12:13.458Z',
          },
        },
        entityTwo: {
          create: {
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2024-07-02T17:12:13.458Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Relationship, 'relationship'>
