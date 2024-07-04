import type { TypeRelationship } from '@prisma/client'

import {
  typeRelationships,
  typeRelationship,
  createTypeRelationship,
  updateTypeRelationship,
  deleteTypeRelationship,
} from './typeRelationships'
import type { StandardScenario } from './typeRelationships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('typeRelationships', () => {
  scenario(
    'returns all typeRelationships',
    async (scenario: StandardScenario) => {
      const result = await typeRelationships()

      expect(result.length).toEqual(
        Object.keys(scenario.typeRelationship).length
      )
    }
  )

  scenario(
    'returns a single typeRelationship',
    async (scenario: StandardScenario) => {
      const result = await typeRelationship({
        id: scenario.typeRelationship.one.id,
      })

      expect(result).toEqual(scenario.typeRelationship.one)
    }
  )

  scenario('creates a typeRelationship', async () => {
    const result = await createTypeRelationship({
      input: { label: 'String3597326', color: 'String4194324' },
    })

    expect(result.label).toEqual('String3597326')
    expect(result.color).toEqual('String4194324')
  })

  scenario('updates a typeRelationship', async (scenario: StandardScenario) => {
    const original = (await typeRelationship({
      id: scenario.typeRelationship.one.id,
    })) as TypeRelationship
    const result = await updateTypeRelationship({
      id: original.id,
      input: { label: 'String46943782' },
    })

    expect(result.label).toEqual('String46943782')
  })

  scenario('deletes a typeRelationship', async (scenario: StandardScenario) => {
    const original = (await deleteTypeRelationship({
      id: scenario.typeRelationship.one.id,
    })) as TypeRelationship
    const result = await typeRelationship({ id: original.id })

    expect(result).toEqual(null)
  })
})
