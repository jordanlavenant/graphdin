import type { Entity } from '@prisma/client'

import {
  entities,
  entity,
  createEntity,
  updateEntity,
  deleteEntity,
} from './entities'
import type { StandardScenario } from './entities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('entities', () => {
  scenario('returns all entities', async (scenario: StandardScenario) => {
    const result = await entities()

    expect(result.length).toEqual(Object.keys(scenario.entity).length)
  })

  scenario('returns a single entity', async (scenario: StandardScenario) => {
    const result = await entity({ id: scenario.entity.one.id })

    expect(result).toEqual(scenario.entity.one)
  })

  scenario('creates a entity', async () => {
    const result = await createEntity({
      input: {
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2024-07-02T17:11:49.447Z',
      },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-07-02T17:11:49.447Z'))
  })

  scenario('updates a entity', async (scenario: StandardScenario) => {
    const original = (await entity({ id: scenario.entity.one.id })) as Entity
    const result = await updateEntity({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a entity', async (scenario: StandardScenario) => {
    const original = (await deleteEntity({
      id: scenario.entity.one.id,
    })) as Entity
    const result = await entity({ id: original.id })

    expect(result).toEqual(null)
  })
})
