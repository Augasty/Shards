import { useCallback, useEffect } from "react";
// => Tiptap packages
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
// Custom
import * as Icons from "./Icons";
import StarterKit from "@tiptap/starter-kit";
import styles from "./styles.module.css";

// eslint-disable-next-line react/prop-types
export function TextEditor({ content = "<p></p>", handleChange, isEditable = true }) {


  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate({ editor }) {
      const htmlContent = editor.getHTML();
      handleChange(htmlContent);
    },
    autofocus: "end",

    editable: isEditable
  });

  const toggleBold = useCallback(
    (event) => {
      event.preventDefault();
      editor.chain().focus().toggleBold().run();
    },
    [editor]
  );

  const toggleUnderline = useCallback(
    (event) => {
      event.preventDefault();
      editor.chain().focus().toggleUnderline().run();
    },
    [editor]
  );

  const toggleItalic = useCallback(
    (event) => {
      event.preventDefault();
      editor.chain().focus().toggleItalic().run();
    },
    [editor]
  );

  const toggleStrike = useCallback(
    (event) => {
      event.preventDefault();
      editor.chain().focus().toggleStrike().run();
    },
    [editor]
  );

  const toggleCode = useCallback(
    (event) => {
      event.preventDefault();
      editor.chain().focus().toggleCode().run();
    },
    [editor]
  );

  // this, along with the autofocus:'end' makes the autofocus work
  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);
  if (!editor) {
    return null;
  }

  return (
    <>
    <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
    
      <div className={styles.menuContainer}>
          <button
            className={`${styles["menu-button"]} ${
              editor.isActive("bold") && styles["is-active"]
            }`}
            onClick={toggleBold}
          >
            <Icons.Bold />
          </button>
          <button
            className={`${styles["menu-button"]} ${
              editor.isActive("underline") && styles["is-active"]
            }`}
            onClick={toggleUnderline}
          >
            <Icons.Underline />
          </button>
          <button
            className={`${styles["menu-button"]} ${
              editor.isActive("italic") && styles["is-active"]
            }`}
            onClick={toggleItalic}
          >
            <Icons.Italic />
          </button>
          <button
            className={`${styles["menu-button"]} ${
              editor.isActive("strike") && styles["is-active"]
            }`}
            onClick={toggleStrike}
          >
            <Icons.Strikethrough />
          </button>

          <button
            onClick={(event) => {
              event.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={`${styles["menu-button"]} ${
              editor.isActive("bulletList") && styles["is-active"]
            }`}
          >
            {editor.isActive("bulletList") ? (
              <Icons.DecreaseBulletList />
            ) : (
              <Icons.BulletList />
            )}
          </button>

          <button
            onClick={(event) => {
              event.preventDefault();
              editor.chain().focus().sinkListItem("listItem").run();
            }}
            disabled={!editor.can().sinkListItem("listItem")}
            className={styles["menu-button"]}
          >
            <Icons.IncreaseBulletList />
          </button>
          <button
            className={`${styles["menu-button"]} ${
              editor.isActive("code") && styles["is-active"]
            }`}
            onClick={toggleCode}
          >
            <Icons.Code />
          </button>

          <button
            onClick={(event) => {
              // these preventdefault prevents these clicks from triggerig submission
              event.preventDefault();
              editor.chain().focus().setParagraph().run();
            }}
            className={`${styles["menu-button"]} ${
              editor.isActive("paragraph") && styles["is-active"]
            }`}
          >
            Text
          </button>
          <button
            onClick={(event) => {
              // these preventdefault prevents these clicks from triggerig submission
              event.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={`${styles["menu-button"]} ${
              editor.isActive("heading", { level: 1 }) && styles["is-active"]
            }`}
          >
            H1
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`${styles["menu-button"]} ${
              editor.isActive("heading", { level: 2 }) && styles["is-active"]
            }`}
          >
            H2
          </button>

          <button
            onClick={(event) => {
              event.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run(); 
              }}
            className={`${styles["menu-button"]} ${
              editor.isActive("heading", { level: 3 }) && styles["is-active"]
            }`}
          >
            H3
          </button>
          
        
      </div>
      </BubbleMenu>
      <EditorContent className={styles.EditorContent} editor={editor} />
    </>
  );
}
