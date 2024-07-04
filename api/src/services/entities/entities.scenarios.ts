import type { Prisma, Entity } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EntityCreateArgs>({
  entity: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2024-07-02T17:11:49.478Z',
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2024-07-02T17:11:49.479Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Entity, 'entity'>
