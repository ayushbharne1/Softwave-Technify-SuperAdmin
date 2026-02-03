import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderPlus, 
  Upload, 
  Tag, 
  Hash, 
  FileText, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryCode: '',
    description: '',
    parentCategory: '',
    status: 'active',
    image: null,
    color: '#F97316', // Default orange color
    features: [''],
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const parentCategories = [
    { id: 'software', name: 'Software Development' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'consulting', name: 'Business Consulting' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'none', name: 'No Parent (Main Category)' },
  ];

  const colorOptions = [
    { name: 'Orange', value: '#F97316' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Teal', value: '#14B8A6' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.categoryHeading.trim()) {
      newErrors.categoryHeading = 'Category heading is required';
    }
    

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Filter out empty features
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== '');
    
    const categoryData = {
      ...formData,
      features: filteredFeatures,
      createdDate: new Date().toISOString(),
      totalProjects: 0,
    };

    console.log('Category Data:', categoryData);
    
    // Here you would make an API call
    // navigate('/categories'); // Navigate to categories list after success
  };

  const generateCodeFromName = () => {
    if (!formData.categoryName) return;
    const code = formData.categoryName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    setFormData({ ...formData, categoryCode: code });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FolderPlus className="w-7 h-7" />
              Add New Category
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
              <span className="text-white font-medium">Add Category</span>
            </div>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <p className="text-white text-sm">Organize your projects with categories</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Category Details</h2>
            <p className="text-gray-600">Create a new category to organize your projects</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-500" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>Category Name</span>
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="categoryName"
                      value={formData.categoryName}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      className={`w-full px-4 py-3 pl-11 rounded-xl border ${errors.categoryName ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300`}
                    />
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  {errors.categoryName && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.categoryName}
                    </p>
                  )}
                </div> 

                   <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>Category Heading</span>
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="categoryHeading"
                      value={formData.categoryHeading}
                      onChange={handleChange}
                      placeholder="Enter category heading"
                      className={`w-full px-4 py-3 pl-11 rounded-xl border ${errors.categoryHeading ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300`}
                    />
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  {errors.categoryHeading && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.categoryHeading}
                    </p>
                  )}
                </div>

                {/* Category Code */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>Category Code</span>
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        name="categoryCode"
                        value={formData.categoryCode}
                        onChange={handleChange}
                        placeholder="e.g., WEB_DEV"
                        className={`w-full px-4 py-3 pl-11 rounded-xl border ${errors.categoryCode ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 transition-all duration-300`}
                      />
                      <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <button
                      type="button"
                      onClick={generateCodeFromName}
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Generate
                    </button>
                  </div>
                  {errors.categoryCode && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.categoryCode}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Use uppercase letters, numbers, and underscores only</p>
                </div> */}

                {/* Parent Category */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Parent Category
                  </label>
                  <select
                    name="parentCategory"
                    value={formData.parentCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm text-gray-600 transition-all duration-300"
                  >
                    <option value="">Select Parent Category</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Status */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>Status</span>
                    <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Active
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-400"
                      />
                      <span className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500" />
                        Inactive
                      </span>
                    </label>
                  </div>
                </div> */}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span>Description</span>
                  <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter category description..."
                  className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm placeholder-gray-400 resize-none transition-all duration-300`}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Category Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Category Features
              </h3>
              
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white shadow-sm placeholder-gray-400"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-colors w-full justify-center"
                >
                  <FolderPlus className="w-5 h-5" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Visual Styling */}
             {/* <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Visual Styling</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        type="button"
                        key={color.value}
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`relative p-4 rounded-xl border-2 ${formData.color === color.value ? 'border-gray-800' : 'border-gray-200'}`}
                        style={{ backgroundColor: color.value }}
                      >
                        {formData.color === color.value && (
                          <CheckCircle className="absolute -top-2 -right-2 w-6 h-6 text-white bg-gray-800 rounded-full p-1" />
                        )}
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg border"
                      style={{ backgroundColor: formData.color }}
                    />
                    <span className="text-sm font-mono">{formData.color}</span>
                  </div>
                </div>


                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors duration-300">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                      id="category-image"
                    />
                    <label htmlFor="category-image" className="cursor-pointer text-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-4 mx-auto" />
                      <p className="text-gray-700 font-medium mb-2">Click to upload category image</p>
                      <p className="text-sm text-gray-500">Recommended: 400x300px, PNG/JPG</p>
                    </label>
                  </div>
                  
                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                onClick={() => navigate('/categories')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-2"
              >
                <FolderPlus className="w-5 h-5" />
                Create Category
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-6 bg-linear-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            📋 Category Creation Guidelines
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Category names should be clear and descriptive</li>
            <li>• Use unique category codes for easy identification</li>
            <li>• Assign colors to differentiate categories visually</li>
            <li>• Add relevant features to help users understand category scope</li>
            <li>• Active categories will be immediately visible in the system</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;