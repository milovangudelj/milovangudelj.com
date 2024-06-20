import {
  Desktop,
  File,
  Folder,
  Gear,
  Image,
  Link,
  Palette,
  PencilLine,
  Tag,
} from '@phosphor-icons/react'
import { DefaultDocumentNodeResolver, StructureBuilder, StructureResolver } from 'sanity/structure'

import { LANGUAGES } from '~/sanity/utils/languages'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form()])
}

const translatedTypeList = (S: StructureBuilder, type: string, title: string) => [
  S.listItem()
    .title('🌐 All')
    .showIcon(false)
    .schemaType(type)
    .child(
      S.documentList()
        .id('all-languages')
        .title(`🌐 ${title}`)
        .schemaType(type)
        .filter(`_type == "${type}"`)
    ),
  S.divider(),
  ...LANGUAGES.map((language) => {
    return S.listItem()
      .title(`${language.flag} ${language.title}`)
      .showIcon(false)
      .schemaType(type)
      .child(
        S.documentList()
          .id(language.id)
          .title(`${language.flag} ${title}`)
          .schemaType(type)
          .filter(`_type == "${type}" && language == $lang`)
          .params({ lang: language.id })
      )
  }),
]

export const structure: StructureResolver = (S, context) => {
  // console.log(context); // returns { currentUser, dataset, projectId, schema, getClient, documentStore }

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(Folder)
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document()
                    .title('Site Settings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                )
                .icon(Gear),
              S.listItem()
                .title('Site Navigation')
                .child(
                  S.document()
                    .title('Site Navigation')
                    .schemaType('siteNavigation')
                    .documentId('siteNavigation')
                )
                .icon(Link),
              S.listItem()
                .title('Site Colors')
                .child(
                  S.document()
                    .title('Site Colors')
                    .schemaType('siteColors')
                    .documentId('siteColors')
                )
                .icon(Palette),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages'))
        .icon(Desktop),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(
          S.list()
            .title('Projects')
            .items(translatedTypeList(S, 'project', 'Projects'))
        )
        .icon(File),
      S.listItem()
        .title('Case Studies')
        .schemaType('caseStudy')
        .child(
          S.list()
            .title('Case Studies')
            .items(translatedTypeList(S, 'caseStudy', 'Case Studies'))
        )
        .icon(File),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.list()
            .title('Posts')
            .items(translatedTypeList(S, 'post', 'Posts'))
        )
        .icon(PencilLine),
      S.divider(),
      S.listItem()
        .title('Project Tags')
        .schemaType('projectTag')
        .child(S.documentTypeList('projectTag').title('Project Tags'))
        .icon(Tag),
      S.listItem()
        .title('Post Tags')
        .schemaType('postTag')
        .child(S.documentTypeList('postTag').title('Post Tags'))
        .icon(Tag),
      S.divider(),
      S.listItem()
        .title('Poster')
        .schemaType('poster')
        .child(S.documentTypeList('poster').title('Poster'))
        .icon(Image),
    ])
    .showIcons(true)
}
