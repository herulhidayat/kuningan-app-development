'use client'


import { ArrowUturnLeftIcon, ArrowUturnRightIcon, BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon, StrikethroughIcon } from '@heroicons/react/20/solid'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'

interface ITextEditor {
  content?: string
  callbackContent?: (content: string) => void
}

export default function TextEditor({ content, callbackContent }: ITextEditor) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, TextAlign],
  })

  useEffect(() => {
    if (editor && callbackContent) {
      const html = editor.getHTML()
      callbackContent(html)
    }
  }, [editor])

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [content])

  return (
    <>
      <div className='rounded-lg border border-gray-300'>
        <div className='border-b border-gray-300 flex items-center justify-between p-3 gap-3'>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={
                !editor?.can()
                  .chain()
                  .focus()
                  .toggleBold()
                  .run()
              }
              className={`${editor?.isActive('bold') ? 'rounded bg-gray-200' : ''} p-1`}
            >
              <BoldIcon className='h-4 w-4' />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              disabled={
                !editor?.can()
                  .chain()
                  .focus()
                  .toggleItalic()
                  .run()
              }
              className={`${editor?.isActive('italic') ? 'rounded bg-gray-200' : ''} p-1`}
            >
              <ItalicIcon className='h-4 w-4' />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              disabled={
                !editor?.can()
                  .chain()
                  .focus()
                  .toggleStrike()
                  .run()
              }
              className={`${editor?.isActive('strike') ? 'rounded bg-gray-200' : ''} p-1`}
            >
              <StrikethroughIcon className='h-4 w-4' />
            </button>
            {/* <button
              onClick={() => editor?.chain().focus().setParagraph().run()}
              className={`${editor?.isActive('paragraph') ? 'rounded bg-gray-200' : ''} h-6 w-6 flex items-center justify-center`}
            >
              <span className='text-lg p-2'>
                ¶
              </span>
            </button> */}
            <button onClick={() => editor?.chain().focus().toggleHighlight().run()} className={`${editor?.isActive('highlight') ? 'rounded bg-gray-200' : ''} p-1`}>
              Highlight
            </button>
            <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className={`${editor?.isActive({ textAlign: 'left' }) ? 'rounded bg-gray-200' : ''} p-1`}>
              Left
            </button>
            <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className={`${editor?.isActive({ textAlign: 'center' }) ? 'rounded bg-gray-200' : ''} p-1`}>
              Center
            </button>
            <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className={`${editor?.isActive({ textAlign: 'right' }) ? 'rounded bg-gray-200' : ''} p-1`}>
              Right
            </button>
            <button onClick={() => editor?.chain().focus().setTextAlign('justify').run()} className={`${editor?.isActive({ textAlign: 'justify' }) ? 'rounded bg-gray-200' : ''} p-1`}>
              Justify
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`${editor?.isActive('bulletList') ? 'rounded bg-gray-200' : ''} p-1`}
            >
              <ListBulletIcon className='h-4 w-4' />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`${editor?.isActive('orderedList') ? 'rounded bg-gray-200' : ''} p-1`}
            >
              <NumberedListIcon className='h-4 w-4' />
            </button>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={
                !editor?.can()
                  .chain()
                  .focus()
                  .undo()
                  .run()
              }
            >
              <ArrowUturnLeftIcon className='h-4 w-4' />
            </button>
            <button
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={
                !editor?.can()
                  .chain()
                  .focus()
                  .redo()
                  .run()
              }
            >
              <ArrowUturnRightIcon className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='p-3 min-h-80 cursor-text' onClick={() => editor?.chain().focus().run()}>
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  )
}