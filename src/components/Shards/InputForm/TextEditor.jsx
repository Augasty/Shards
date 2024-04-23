import { useCallback } from "react";
// => Tiptap packages
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
// Custom
import * as Icons from "./Icons";
import StarterKit from "@tiptap/starter-kit";
import styles from './styles.module.css'


// eslint-disable-next-line react/prop-types
export function TextEditor({ content = '<p></p>', handleChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content,
        onUpdate({ editor }) {
            const htmlContent = editor.getHTML();
            console.log(htmlContent)
            console.log(editor.getText())
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
        <>
            <div className={styles.menu}>
                <button
                    className={`${styles["menu-button"]} ${!editor.can().undo() && styles["disabled"]}`}
                    onClick={(event) => {
                        event.preventDefault(); editor.chain().focus().undo().run()
                    }}
                    disabled={!editor.can().undo()}
                >
                    <Icons.RotateLeft />
                </button>
                <button
                    className={`${styles["menu-button"]} ${!editor.can().redo() && styles["disabled"]}`}
                    onClick={(event) => {
                        event.preventDefault(); editor.chain().focus().redo().run()
                    }}
                    disabled={!editor.can().redo()}
                >
                    <Icons.RotateRight />
                </button>

                <button
                    className={`${styles["menu-button"]} ${editor.isActive("bold") && styles["is-active"]}`}
                    onClick={toggleBold}
                >
                    <Icons.Bold />
                </button>
                <button
                    className={`${styles["menu-button"]} ${editor.isActive("underline") && styles["is-active"]}`}
                    onClick={toggleUnderline}
                >
                    <Icons.Underline />
                </button>
                <button
                    className={`${styles["menu-button"]} ${editor.isActive("italic") && styles["is-active"]}`}
                    onClick={toggleItalic}
                >
                    <Icons.Italic />
                </button>
                <button
                    className={`${styles["menu-button"]} ${editor.isActive("strike") && styles["is-active"]}`}
                    onClick={toggleStrike}
                >
                    <Icons.Strikethrough />
                </button>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={`${styles["menu-button"]} ${editor.isActive('bulletList') && styles["is-active"]}`}
                >
                    {editor.isActive('bulletList') ?  <Icons.DecreaseBulletList/> : <Icons.BulletList /> }
                </button>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        editor.chain().focus().sinkListItem('listItem').run()
                    }}
                    disabled={!editor.can().sinkListItem('listItem')}
                    className={styles["menu-button"]}
                >
                    <Icons.IncreaseBulletList />
                </button>
                <button
                    className={`${styles["menu-button"]} ${editor.isActive("code") && styles["is-active"]}`}
                    onClick={toggleCode}
                >
                    <Icons.Code />
                </button>

            </div>

            <EditorContent className={styles.EditorContent} editor={editor} />
        </>
    );
}