/* eslint-disable react/prop-types */

import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, EditorProvider, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar/MenuBar'



const CustomDocument = Document.extend({
  content: 'heading block*',
})

const CustomInput = ({title,content, handleChange}) => {
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
      const htmlContent = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const titleElement = doc.querySelector('h1');
      const titleText = titleElement ? titleElement.textContent.trim() : '';
      handleChange('title',titleText)
      
      const contentElement = doc.querySelector('p');
      const contentText = contentElement ? contentElement.textContent?.trim():'';
      handleChange('content',contentText)

    },
    
  })

  return (
    <div>
      {/* <MenuBar editor={editor}/> */}
      <EditorContent slotBefore={<MenuBar/>} editor={editor} />
    </div>
  )
}

export default CustomInput