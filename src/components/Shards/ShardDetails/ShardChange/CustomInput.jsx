
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const CustomDocument = Document.extend({
  content: 'heading block*',
})

const CustomInput = ({title,content}) => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
    ],
    content: `
      <h1>
        ${title}
      </h1>
      <p>
        ${content}
      </p>
    `,
    onUpdate({editor}){
      console.log(editor.getHTML())
    },
    
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default CustomInput