import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    // ⚠️ REPLACE with your Sanity project ID
    projectId: 'pi8mx0t0',
    dataset: 'production',
  },
  studioHost: 'r352',
})
