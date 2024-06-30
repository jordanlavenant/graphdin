import type { Relationship } from '@prisma/client'

import {
  relationships,
  relationship,
  createRelationship,
  updateRelationship,
  deleteRelationship,
} from './relationships'
import type { StandardScenario } from './relationships.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('relationships', () => {
  scenario('returns all relationships', async (scenario: StandardScenario) => {
    const result = await relationships()

    expect(result.length).toEqual(Object.keys(scenario.relationship).length)
  })

  scenario(
    'returns a single relationship',
    async (scenario: StandardScenario) => {
      const result = await relationship({ id: scenario.relationship.one.id })

      expect(result).toEqual(scenario.relationship.one)
    }
  )

  scenario('creates a relationship', async (scenario: StandardScenario) => {
    const result = await createRelationship({
      input: {
        entityOneId: scenario.relationship.two.entityOneId,
        entityTwoId: scenario.relationship.two.entityTwoId,
        typeRelationshipId: scenario.relationship.two.typeRelationshipId,
      },
    })

    expect(result.entityOneId).toEqual(scenario.relationship.two.entityOneId)
    expect(result.entityTwoId).toEqual(scenario.relationship.two.entityTwoId)
    expect(result.typeRelationshipId).toEqual(
      scenario.relationship.two.typeRelationshipId
    )
  })

  scenario('updates a relationship', async (scenario: StandardScenario) => {
    const original = (await relationship({
      id: scenario.relationship.one.id,
    })) as Relationship
    const result = await updateRelationship({
      id: original.id,
      input: { typeRelationshipId: scenario.relationship.two.entityOneId },
    })

    expect(result.typeRelationshipId).toEqual(
      scenario.relationship.two.entityOneId
    )
  })

  scenario('deletes a relationship', async (scenario: StandardScenario) => {
    const original = (await deleteRelationship({
      id: scenario.relationship.one.id,
    })) as Relationship
    const result = await relationship({ id: original.id })

    expect(result).toEqual(null)
  })
})
