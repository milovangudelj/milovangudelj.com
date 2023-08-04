import type { PortableTextBlock } from '@portabletext/types'

export const toPlainText = (blocks: PortableTextBlock[] = []): string => {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return (block.children as any[]).map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}
