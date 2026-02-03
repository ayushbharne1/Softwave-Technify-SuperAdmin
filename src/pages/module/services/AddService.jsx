import { Upload, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border border-gray-300 rounded-t-xl bg-gray-50 p-2 flex flex-wrap gap-1">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
          editor.isActive('bold') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors italic ${
          editor.isActive('italic') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors underline ${
          editor.isActive('underline') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors line-through ${
          editor.isActive('strike') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Strikethrough"
      >
        S
      </button>

      <div className="w-px bg-gray-300 mx-1"></div>

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
          editor.isActive('heading', { level: 1 }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
          editor.isActive('heading', { level: 2 }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${
          editor.isActive('heading', { level: 3 }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive('bulletList') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Bullet List"
      >
        •
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive('orderedList') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Numbered List"
      >
        1.
      </button>

      <div className="w-px bg-gray-300 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Align Left"
      >
        ⫴
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Align Center"
      >
        ⫶
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Align Right"
      >
        ⫵
      </button>

      <div className="w-px bg-gray-300 mx-1"></div>

      {/* Link & Image */}
      <button
        type="button"
        onClick={addLink}
        className={`px-3 py-1.5 rounded-lg transition-colors ${
          editor.isActive('link') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'
        }`}
        title="Insert Link"
      >
        🔗
      </button>
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-200"
        title="Insert Image"
      >
        🖼️
      </button>

      <div className="w-px bg-gray-300 mx-1"></div>

      {/* Clear Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-200 text-red-600"
        title="Clear Formatting"
      >
        ✕
      </button>
    </div>
  )
}

const AddService = () => {
  const [formData, setFormData] = useState({
    projectName:'',
    projectType: '',
    description: '',
    price: '',
    image: null,
  })

  const [previewImage, setPreviewImage] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, description: editor.getHTML() })
    },
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      const file = files[0]
      setFormData({ ...formData, image: file })
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewImage(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewImage(null)
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Here you can make API call to send data
  }

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r mt-4 from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <PlusCircle className="w-7 h-7" />
              Add New Project
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Dashboard</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/services" className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="bg-white/20 px-3 py-1 rounded-lg">Projects</span>
              </NavLink>
              <span className="text-white/60">›</span>
              <span className="text-white font-medium">Add Project</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">Fill all required details below</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Project Information</h2>
          <p className="text-gray-600">Enter all required project details to create a new project</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Project Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
              />
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Project Type <span className="text-orange-500">*</span>
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
              >
                <option value="">Select Project Type</option>
                <option value="website-development">Website Development</option>
                <option value="mobile-app-development">Mobile App Development</option>
                <option value="ecommerce-development">Ecommerce Development</option>
                <option value="ERP-development">ERP Development</option>
                <option value="CMS-development">CMS Development</option>
                <option value="CRM-development">CRM Development</option>
                <option value="custom-software-development">Custom Software Development</option>
                <option value="product-development">Product Development</option>
                <option value="digital-transformation">Digital Transformation</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Price <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter project price"
                  required
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Rich Text Editor for Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description <span className="text-orange-500">*</span>
            </label>
            <div className="tiptap-editor-wrapper">
              <MenuBar editor={editor} />
              <EditorContent 
                editor={editor}
                className="border border-t-0 border-gray-300 rounded-b-xl bg-white focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-orange-400 transition-all duration-300"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Project Image <span className="text-orange-500">*</span>
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 bg-orange-50 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors duration-300">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label htmlFor="image-upload" className="cursor-pointer text-center">
                  <Upload className="w-12 h-12 text-orange-400 mb-4 mx-auto" />
                  <p className="text-gray-700 font-medium mb-2">Click to upload project image</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </label>
              </div>

              {/* Preview Area */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Image Preview</h3>
                {previewImage ? (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Project preview" 
                      className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium text-gray-700">
                      Preview
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl">
                    <p className="text-gray-400">No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
              onClick={() => {
                setFormData({
                  projectName:'',
                  projectType: '',
                  description: '',
                  price: '',
                  image: null,
                })
                setPreviewImage(null)
                editor?.commands.setContent('')
              }}
            >
              Clear All
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Create Project
            </button>
          </div>
        </form>
      </div>

      {/* Form Guidelines */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            📋 Form Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• All fields marked with <span className="text-orange-500 font-medium">*</span> are required</li>
            <li>• Use clear and descriptive project names for easy identification</li>
            <li>• Select the appropriate project type for accurate categorization</li>
            <li>• Upload high-quality images (recommended: 1200x800 pixels)</li>
            <li>• Provide accurate pricing and duration estimates</li>
            <li>• Use the rich text editor to format your project description with headers, lists, and links</li>
          </ul>
        </div>
      </div>

      {/* Custom Styles for Tiptap Editor */}
      <style>{`
        .tiptap-editor-wrapper .ProseMirror {
          padding: 1rem;
          min-height: 250px;
          outline: none;
        }

        .tiptap-editor-wrapper .ProseMirror:focus {
          outline: none;
        }

        .tiptap-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: 'Enter detailed project description, requirements, and objectives...';
          float: left;
          height: 0;
          pointer-events: none;
        }

        .tiptap-editor-wrapper .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .tiptap-editor-wrapper .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .tiptap-editor-wrapper .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .tiptap-editor-wrapper .ProseMirror ul,
        .tiptap-editor-wrapper .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .tiptap-editor-wrapper .ProseMirror ul {
          list-style-type: disc;
        }

        .tiptap-editor-wrapper .ProseMirror ol {
          list-style-type: decimal;
        }

        .tiptap-editor-wrapper .ProseMirror a {
          color: #fb923c;
          text-decoration: underline;
        }

        .tiptap-editor-wrapper .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }

        .tiptap-editor-wrapper .ProseMirror strong {
          font-weight: bold;
        }

        .tiptap-editor-wrapper .ProseMirror em {
          font-style: italic;
        }

        .tiptap-editor-wrapper .ProseMirror u {
          text-decoration: underline;
        }

        .tiptap-editor-wrapper .ProseMirror s {
          text-decoration: line-through;
        }
      `}</style>
    </>
  )
}

export default AddService