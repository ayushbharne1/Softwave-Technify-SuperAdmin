import { UserPlus, PlusCircle } from 'lucide-react'
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

// MenuBar for the Tiptap Editor
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-t-xl bg-gray-50 p-2 flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors font-bold ${editor.isActive('bold') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'}`}
      > B </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors italic ${editor.isActive('italic') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'}`}
      > I </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'}`}
      > • </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1.5 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-orange-200 text-orange-800' : 'hover:bg-gray-200'}`}
      > 1. </button>
      <div className="w-px bg-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-200 text-red-600"
      > ✕ </button>
    </div>
  )
}

const AddLead = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      TextStyle,
      Color,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, message: editor.getHTML() }))
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lead Data Submitted:', formData)
    // Add your API logic here
  }

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: '',
      message: '',
    })
    editor?.commands.setContent('')
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r mt-4 from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <UserPlus className="w-7 h-7" />
              Add New Lead
            </h1>
            <div className="text-sm text-orange-100 flex items-center gap-2 mt-3">
              <NavLink to="/dashboard" className="bg-white/20 px-3 py-1 rounded-lg hover:text-white transition-colors">Dashboard</NavLink>
              <span className="text-white/60">›</span>
              <NavLink to="/leads" className="bg-white/20 px-3 py-1 rounded-lg hover:text-white transition-colors">Leads</NavLink>
              <span className="text-white/60">›</span>
              <span className="font-medium text-white">Add Lead</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg text-sm">
            Capture new business inquiry details
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Add new Lead</h2>
          <p className="text-gray-600">Please fill in the client's contact and project requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Name <span className="text-orange-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Phone <span className="text-orange-500">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address <span className="text-orange-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
              />
            </div>

            {/* Project Type Select */}
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="text-sm font-semibold text-gray-700">Project Type <span className="text-orange-500">*</span></label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white text-gray-600 transition-all"
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
          </div>

          {/* Message Field (Rich Text) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Message / Requirements</label>
            <div className="tiptap-editor-wrapper">
              <MenuBar editor={editor} />
              <EditorContent 
                editor={editor}
                className="border border-t-0 border-gray-300 rounded-b-xl bg-white focus-within:ring-2 focus-within:ring-orange-400 min-h-[200px]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Save Lead
            </button>
          </div>
        </form>
      </div>

      {/* Global Tiptap Styles */}
      <style>{`
        .tiptap-editor-wrapper .ProseMirror {
          padding: 1rem;
          min-height: 200px;
          outline: none;
        }
        .tiptap-editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: 'Enter client requirements or message here...';
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap-editor-wrapper .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; }
        .tiptap-editor-wrapper .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; }
      `}</style>
    </>
  )
}

export default AddLead;