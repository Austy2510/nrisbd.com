import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './schemas/project'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectType],
}
