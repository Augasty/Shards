import { useCallback } from "react";
// => Tiptap packages
import { useEditor, EditorContent } from "@tiptap/react";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Link from "@tiptap/extension-link";
// import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
// import Italic from "@tiptap/extension-italic";
// import Strike from "@tiptap/extension-strike";
// import Code from "@tiptap/extension-code";
// import History from "@tiptap/extension-history";
// Custom
import * as Icons from "./Icons";
import StarterKit from "@tiptap/starter-kit";

// eslint-disable-next-line react/prop-types
export function TextEditor({ content = '<p></p>', handleChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            // Document,
            // History,
            // Paragraph,
            // Text,
            // Link.configure({
            //     openOnClick: false
            // }),
            // Bold,
            Underline,
            // Italic,
            // Strike,
            // Code
        ],
        content,
        onUpdate({ editor }) {
            const htmlContent = editor.getHTML();
            console.log(htmlContent)
            handleChange('content', htmlContent)

        },
    });

    const toggleBold = useCallback((event) => {
        event.preventDefault();
        editor.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleUnderline = useCallback((event) => {
        event.preventDefault();
        editor.chain().focus().toggleUnderline().run();
    }, [editor]);

    const toggleItalic = useCallback((event) => {
        event.preventDefault();
        editor.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleStrike = useCallback((event) => {
        event.preventDefault();
        editor.chain().focus().toggleStrike().run();
    }, [editor]);

    const toggleCode = useCallback((event) => {
        event.preventDefault();
        editor.chain().focus().toggleCode().run();
    }, [editor]);



    if (!editor) {
        return null;
    }

    return (
        <div className="editor">
            <div className="menu">
                <button
                    className="menu-button"
                    onClick={(event) => {
                        event.preventDefault(); editor.chain().focus().undo().run()
                    }}
                    disabled={!editor.can().undo()}
                >
                    <Icons.RotateLeft />
                </button>
                <button
                    className="menu-button"
                    onClick={(event) => {
                        event.preventDefault(); editor.chain().focus().redo().run()
                    }}
                    disabled={!editor.can().redo()}
                >
                    <Icons.RotateRight />
                </button>

                <button
                    className={`menu-button ${editor.isActive("bold") ? "is-active" : ""}`}
                    onClick={toggleBold}
                >
                    <Icons.Bold />
                </button>
                <button
                    className={`menu-button ${editor.isActive("underline") ? "is-active" : ""}`}
                    onClick={toggleUnderline}
                >
                    <Icons.Underline />
                </button>
                <button
                    className={`menu-button ${editor.isActive("italic") ? "is-active" : ""}`}
                    onClick={toggleItalic}
                >
                    <Icons.Italic />
                </button>
                <button
                    className={`menu-button ${editor.isActive("strike") ? "is-active" : ""}`}
                    onClick={toggleStrike}
                >
                    <Icons.Strikethrough />
                </button>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    {editor.isActive('bulletList') ?  <Icons.DecreaseBulletList/> : <Icons.BulletList /> }
                </button>

                <button
                    onClick={(event) => {

                        event.preventDefault();
                        editor.chain().focus().sinkListItem('listItem').run()
                    }}
                    disabled={!editor.can().sinkListItem('listItem')}
                >
                    <Icons.IncreaseBulletList />
                </button>
                <button
                    className={`menu-button ${editor.isActive("code") ? "is-active" : ""}`}
                    onClick={toggleCode}
                >
                    <Icons.Code />
                </button>

            </div>



            <EditorContent editor={editor} />


        </div>
    );
}
