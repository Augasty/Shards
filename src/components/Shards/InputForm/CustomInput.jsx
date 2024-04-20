
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


// eslint-disable-next-line react/prop-types
export const CustomInput = ({ title='<h1></h1>', content='<p></p>', handleChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      
    ], content: `
      ${title}
      ${content}
  `,
    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const titleElement = doc.querySelector('h1');
      handleChange('title', titleElement)

      const contentElement = doc.querySelector('p');
      handleChange('content', contentElement)

      // console.log(titleElement, contentElement)
    },
  })

  return (
    <>
{editor && (
  <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
    <button
      onClick={(event) => {
        event.preventDefault();
        editor.chain().focus().toggleBold().run();
      }}
      className={editor.isActive('bold') ? 'is-active' : ''}
    >
      Bold
    </button>
    <button
      onClick={(event) => {
        event.preventDefault();
        editor.chain().focus().toggleItalic().run();
      }}
      className={editor.isActive('italic') ? 'is-active' : ''}
    >
      Italic
    </button>
    <button
      onClick={(event) => {
        event.preventDefault();
        editor.chain().focus().toggleStrike().run();
      }}
      className={editor.isActive('strike') ? 'is-active' : ''}
    >
      Strike
    </button>
  </BubbleMenu>
)}

{editor && (
  <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
    <button
      onClick={(event) => {

        // these preventdefault prevents these clicks from triggerig submission
        event.preventDefault();
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      }}
      className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
    >
      H1
    </button>
    <button
      onClick={(event) => {
        event.preventDefault();
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      }}
      className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
    >
      H2
    </button>
    <button
      onClick={(event) => {
        event.preventDefault();
        editor.chain().focus().toggleBulletList().run();
      }}
      className={editor.isActive('bulletList') ? 'is-active' : ''}
    >
      Bullet List
    </button>
  </FloatingMenu>
)}


      <EditorContent editor={editor} />
    </>
  )
}