import { defineCliConfig } from 'sanity/cli'


const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "hquxk5ou"

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
