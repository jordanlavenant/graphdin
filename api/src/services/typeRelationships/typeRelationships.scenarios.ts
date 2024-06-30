import type { Prisma, TypeRelationship } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TypeRelationshipCreateArgs>({
  typeRelationship: {
    one: { data: { label: 'String' } },
    two: { data: { label: 'String' } },
  },
})

export type StandardScenario = ScenarioData<
  TypeRelationship,
  'typeRelationship'
>
