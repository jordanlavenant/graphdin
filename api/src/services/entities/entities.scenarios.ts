import type { Prisma, Entity } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EntityCreateArgs>({
  entity: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2024-06-30T21:21:22.963Z',
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2024-06-30T21:21:22.963Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Entity, 'entity'>
