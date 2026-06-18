import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "hquxk5ou"

export default defineConfig({
  name: 'default',
  title: 'whizkids',

  projectId: projectId,
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
