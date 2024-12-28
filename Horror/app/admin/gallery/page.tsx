'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { artworks } from '@/lib/data';
import { Artwork } from '@/lib/types';
import { ImageLoader } from '@/components/ui/ImageLoader';
import Cookies from 'js-cookie';

interface GalleryImages {
  [key: string]: string[];
}

export default function AdminGallery() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [artworkList, setArtworkList] = useState<Artwork[]>(artworks);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [galleries, setGalleries] = useState<string[]>([
    'nowayhome',
    'echoes-of-fear',
    'silent-screams'
  ]);
  const [galleryImages, setGalleryImages] = useState<GalleryImages>({});
  const [newGallery, setNewGallery] = useState('');
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [formData, setFormData] = useState<Artwork>({
    title: '',
    description: '',
    image: '',
    iconName: 'skull',
    link: '',
    category: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    const adminStatus = Cookies.get('isAdmin');
    if (!adminStatus) {
      router.push('/admin');
    } else {
      setIsAdmin(true);
      
      // Load saved galleries from localStorage
      const savedGalleries = localStorage.getItem('galleries');
      if (savedGalleries) {
        const parsedGalleries = JSON.parse(savedGalleries);
        setGalleries(parsedGalleries);
      } else {
        // If no saved galleries, initialize with default ones
        const defaultGalleries = ['nowayhome', 'echoes-of-fear', 'silent-screams', 'the-midnight'];
        setGalleries(defaultGalleries);
        localStorage.setItem('galleries', JSON.stringify(defaultGalleries));
      }
      
      // Load saved artworks from localStorage
      const savedArtworks = localStorage.getItem('artworks');
      if (savedArtworks) {
        const parsedArtworks = JSON.parse(savedArtworks);
        setArtworkList(parsedArtworks);
      } else {
        // If no saved artworks, use the ones from data.ts
        setArtworkList(artworks);
        localStorage.setItem('artworks', JSON.stringify(artworks));
      }
      
      // Load gallery images when component mounts
      loadGalleryImages();
    }
  }, [router]);

  // Save artworks whenever they change
  useEffect(() => {
    if (artworkList.length > 0) {
      localStorage.setItem('artworks', JSON.stringify(artworkList));
    }
  }, [artworkList]);

  const loadGalleryImages = async () => {
    try {
      const images: GalleryImages = {};
      
      // First, get all galleries from the filesystem
      const response = await fetch('/api/list-galleries');
      if (!response.ok) {
        throw new Error('Failed to load galleries');
      }
      const galleryList = await response.json();
      
      // Update galleries state with the actual directories
      const updatedGalleries = [...new Set([...galleries, ...galleryList])];
      setGalleries(updatedGalleries);
      localStorage.setItem('galleries', JSON.stringify(updatedGalleries));

      // Load images for each gallery
      for (const gallery of updatedGalleries) {
        const artworksInGallery = artworkList.filter(art => art.category === gallery);
        images[gallery] = artworksInGallery.map(art => art.image);
      }

      setGalleryImages(images);
      console.log('Loaded galleries:', updatedGalleries);
      console.log('Loaded images:', images);
    } catch (err) {
      console.error('Error loading gallery images:', err);
    }
  };

  // Add useEffect to reload galleries when artworkList changes
  useEffect(() => {
    if (isAdmin) {
      loadGalleryImages();
    }
  }, [artworkList, isAdmin]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      if (!formData.category) {
        alert('Please select a gallery before uploading an image');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      try {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('gallery', formData.category);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        const imagePath = data.path;

        // Update form data with the new image path
        setFormData(prev => ({ ...prev, image: imagePath }));

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGallery.trim()) {
      const gallerySlug = newGallery.toLowerCase().replace(/\s+/g, '-');
      if (!galleries.includes(gallerySlug)) {
        try {
          // Create gallery directory if it doesn't exist
          const galleryPath = `/images/gallery/${gallerySlug}`;
          const response = await fetch('/api/create-directory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: galleryPath }),
          });

          if (!response.ok) {
            throw new Error('Failed to create gallery directory');
          }

          // Update galleries list
          const updatedGalleries = [...galleries, gallerySlug];
          setGalleries(updatedGalleries);
          localStorage.setItem('galleries', JSON.stringify(updatedGalleries));

          // Initialize empty gallery images
          setGalleryImages(prev => ({
            ...prev,
            [gallerySlug]: []
          }));

          // Create gallery page
          const createPageResponse = await fetch('/api/create-gallery-page', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              gallery: gallerySlug
            }),
          });

          if (!createPageResponse.ok) {
            throw new Error('Failed to create gallery page');
          }

          setNewGallery('');
          setShowGalleryForm(false);
          
          // Force refresh of gallery list
          setSelectedFilter('all');
          
          alert('Gallery created successfully! You can now upload images to this gallery.');
        } catch (error) {
          console.error('Error creating gallery:', error);
          alert('Failed to create gallery. Please try again.');
        }
      } else {
        alert('Gallery already exists!');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!formData.title || !formData.description || !formData.image || !formData.category) {
        alert('Please fill in all required fields and select a gallery');
        return;
      }

      // Use the actual uploaded image path
      const correctImagePath = formData.image;
      const updatedFormData = {
        ...formData,
        image: correctImagePath,
        link: `/gallery/${formData.category}`
      };

      // Update gallery images
      const updatedGalleryImages = { ...galleryImages };
      if (isEditing && selectedArtwork && selectedArtwork.category) {
        // Remove old image from previous gallery if category changed
        if (selectedArtwork.category !== formData.category) {
          const oldGalleryImages = updatedGalleryImages[selectedArtwork.category] || [];
          updatedGalleryImages[selectedArtwork.category] = oldGalleryImages.filter(
            img => img !== selectedArtwork.image
          );
        }
      }

      // Add new image to gallery
      if (!updatedGalleryImages[formData.category]) {
        updatedGalleryImages[formData.category] = [];
      }
      if (!updatedGalleryImages[formData.category].includes(updatedFormData.image)) {
        updatedGalleryImages[formData.category].push(updatedFormData.image);
      }

      // Update artwork list
      let updatedList;
      if (isEditing && selectedArtwork) {
        updatedList = artworkList.map(art => 
          art.title === selectedArtwork.title ? updatedFormData : art
        );
      } else {
        updatedList = [...artworkList, updatedFormData];
      }
      setArtworkList(updatedList);
      localStorage.setItem('artworks', JSON.stringify(updatedList));

      // Update data.ts file
      const updateDataResponse = await fetch('/api/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gallery: formData.category,
          artwork: updatedFormData,
          action: isEditing ? 'update' : 'add'
        }),
      });

      if (!updateDataResponse.ok) {
        throw new Error('Failed to update data file');
      }

      setGalleryImages(updatedGalleryImages);

      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        iconName: 'skull',
        link: '',
        category: ''
      });
      setIsEditing(false);
      setSelectedArtwork(null);
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      alert('Artwork saved successfully!');
    } catch (err) {
      console.error('Error saving artwork:', err);
      alert('Failed to save artwork. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setFormData({
      ...artwork,
      link: artwork.link || '',
      category: artwork.category || ''
    });
    setIsEditing(true);
    // Set the uploaded image preview
    setUploadedImage(artwork.image);
  };

  const handleDelete = (artwork: Artwork) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      // Remove image from gallery images
      if (artwork.category) {
        const updatedGalleryImages = { ...galleryImages };
        updatedGalleryImages[artwork.category] = updatedGalleryImages[artwork.category]?.filter(
          img => img !== artwork.image
        ) || [];
        setGalleryImages(updatedGalleryImages);
      }

      // Remove artwork from list and update localStorage
      const updatedList = artworkList.filter(art => art.title !== artwork.title);
      setArtworkList(updatedList);
      localStorage.setItem('artworks', JSON.stringify(updatedList));
    }
  };

  const handleLogout = () => {
    Cookies.remove('isAdmin');
    router.push('/admin');
  };

  const handleBulkMove = (targetGallery: string) => {
    const updatedList = artworkList.map(art => {
      if (!art.category || art.category === 'Uncategorized') {
        return { ...art, category: targetGallery };
      }
      return art;
    });
    setArtworkList(updatedList);
  };

  const handleDeleteGallery = async (gallery: string) => {
    if (window.confirm(`Are you sure you want to delete the "${gallery}" gallery? This will delete all images in this gallery and cannot be undone.`)) {
      try {
        // Delete images directory
        const response = await fetch('/api/delete-directory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: `public/images/gallery/${gallery}` }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to delete gallery directory:', errorText);
          throw new Error(`Failed to delete gallery directory: ${errorText}`);
        }

        // Delete gallery page directory
        const deletePageResponse = await fetch('/api/delete-directory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: `app/gallery/${gallery}` }),
        });

        if (!deletePageResponse.ok) {
          const errorText = await deletePageResponse.text();
          console.error('Failed to delete gallery page:', errorText);
          throw new Error(`Failed to delete gallery page: ${errorText}`);
        }

        // Update data.ts to remove gallery entries
        const updateDataResponse = await fetch('/api/update-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gallery,
            action: 'delete'
          }),
        });

        if (!updateDataResponse.ok) {
          console.error('Failed to update data.ts:', await updateDataResponse.text());
        }

        // Remove gallery from state and update UI
        const updatedGalleries = galleries.filter(g => g !== gallery);
        setGalleries(updatedGalleries);
        
        // Remove artworks associated with this gallery
        const updatedArtworks = artworkList.filter(art => art.category !== gallery);
        setArtworkList(updatedArtworks);

        // Update localStorage
        localStorage.setItem('galleries', JSON.stringify(updatedGalleries));
        localStorage.setItem('artworks', JSON.stringify(updatedArtworks));

        // Remove from galleryImages
        const updatedGalleryImages = { ...galleryImages };
        delete updatedGalleryImages[gallery];
        setGalleryImages(updatedGalleryImages);

        alert('Gallery deleted successfully');
      } catch (error) {
        console.error('Error deleting gallery:', error);
        alert(`Failed to delete gallery: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  const filteredArtworks = selectedFilter === 'all' 
    ? artworkList 
    : artworkList.filter(art => art.category === selectedFilter);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">Gallery Management</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Gallery Management Section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-red-500">Galleries</h2>
            <button
              onClick={() => setShowGalleryForm(!showGalleryForm)}
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition-colors"
            >
              {showGalleryForm ? 'Cancel' : 'Add New Gallery'}
            </button>
          </div>

          {showGalleryForm && (
            <form onSubmit={handleAddGallery} className="mb-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newGallery}
                  onChange={(e) => setNewGallery(e.target.value)}
                  placeholder="Enter gallery name"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition-colors"
                >
                  Add Gallery
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-full ${
                selectedFilter === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {galleries.map((gallery) => (
              <div key={gallery} className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFilter(gallery)}
                  className={`px-3 py-1 rounded-full ${
                    selectedFilter === gallery
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {gallery.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
                <button
                  onClick={() => handleDeleteGallery(gallery)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Gallery"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-red-500 mb-4">
            {isEditing ? 'Edit Artwork' : 'Add New Artwork'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Gallery Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Gallery</option>
                  {galleries.map((gallery) => (
                    <option key={gallery} value={gallery}>
                      {gallery.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Upload Image *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  disabled={isLoading}
                />
                <p className="text-gray-500 text-sm mt-1">Supported formats: JPG, PNG, GIF, WebP (max 5MB)</p>
              </div>
              {uploadedImage && (
                <div>
                  <label className="block text-gray-400 mb-2">Preview</label>
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-400 mb-2">Icon</label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value as 'skull' | 'brain' | 'ghost' })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  disabled={isLoading}
                >
                  <option value="skull">Skull</option>
                  <option value="brain">Brain</option>
                  <option value="ghost">Ghost</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Gallery Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white h-24"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedArtwork(null);
                    setFormData({
                      title: '',
                      description: '',
                      image: '',
                      iconName: 'skull',
                      link: '',
                      category: ''
                    });
                    setUploadedImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update' : 'Add')} Artwork
              </button>
            </div>
          </form>
        </motion.div>

        {/* Gallery List with Path Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <motion.div
              key={artwork.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="relative h-48 group">
                <ImageLoader
                  src={artwork.image}
                  alt={artwork.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(artwork)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-white bg-gray-800 px-3 py-1 rounded-full text-sm">
                      Gallery: {artwork.category ? artwork.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Uncategorized'}
                    </span>
                    <span className="text-white text-xs opacity-75">
                      Path: {artwork.image}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{artwork.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{artwork.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 