import type { Prisma, TypeRelationship } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TypeRelationshipCreateArgs>({
  typeRelationship: {
    one: { data: { label: 'String116734', color: 'String3568178' } },
    two: { data: { label: 'String8405202', color: 'String2199100' } },
  },
})

export type StandardScenario = ScenarioData<
  TypeRelationship,
  'typeRelationship'
>
