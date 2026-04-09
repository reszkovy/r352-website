import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'r352-studio',
  title: 'r352 Studio',

  // ⚠️ REPLACE with your Sanity project ID after running: npx sanity init
  projectId: 'pi8mx0t0',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projects')),
            S.listItem()
              .title('Journal')
              .schemaType('article')
              .child(S.documentTypeList('article').title('Articles')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['project', 'article'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
