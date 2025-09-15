import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import city from './city'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, city, project],
}