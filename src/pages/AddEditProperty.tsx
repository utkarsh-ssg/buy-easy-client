import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

const AddEditProperty = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    type: '',
    status: '',
    imageUrl: '',
    description: '',
    amenities: '',
    featured: false,
    coordinates: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/properties/${id}`)
        .then(res => res.json())
        .then((data) => {
          setForm({
            title: data.title || '',
            price: data.price || '',
            location: data.location || '',
            area: data.area || '',
            bedrooms: data.bedrooms || '',
            bathrooms: data.bathrooms || '',
            type: data.type || '',
            status: data.status || '',
            imageUrl: data.images && data.images[0] ? data.images[0] : '',
            description: data.description || '',
            amenities: (data.amenities || []).join(', '),
            featured: !!data.featured,
            coordinates: data.coordinates ? `${data.coordinates.lat},${data.coordinates.lng}` : ''
          });
        });
    }
  }, [id, isEdit]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title) return alert('Title is required');
    setLoading(true);
    const payload = {
      title: form.title,
      price: form.price ? Number(form.price) : undefined,
      location: form.location,
      area: form.area ? Number(form.area) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      type: form.type,
      status: form.status,
      images: form.imageUrl ? [form.imageUrl] : [],
      description: form.description,
      amenities: form.amenities ? form.amenities.split(',').map((a) => a.trim()) : [],
      featured: form.featured,
      coordinates: form.coordinates ? (() => {
        const [lat, lng] = form.coordinates.split(',').map(Number);
        return { lat, lng };
      })() : undefined
    };
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_URL}/projects/${id}` : `${API_URL}/projects`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    setLoading(false);
    navigate('/builder-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Property' : 'Add New Property'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block font-medium mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" type="number" min="0" />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Bedrooms</label>
              <select name="bedrooms" value={form.bedrooms} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {[...Array(7)].map((_, i) => <option key={i} value={i}>{i === 6 ? '6+' : i}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Bathrooms</label>
              <select name="bathrooms" value={form.bathrooms} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                {[...Array(7)].map((_, i) => <option key={i} value={i}>{i === 6 ? '6+' : i}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Area (sq ft)</label>
              <input name="area" value={form.area} onChange={handleChange} className="w-full border rounded px-3 py-2" type="number" min="0" />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="https://..." />
          </div>
          {/* For file upload, you can add a file input and handle upload logic in the future */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Amenities (comma separated)</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Coordinates (lat,lng)</label>
            <input name="coordinates" value={form.coordinates} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="19.0596,72.8295" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" />
            <label htmlFor="featured">Featured</label>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" onClick={() => navigate('/builder-dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : isEdit ? 'Update Property' : 'Add Property'}</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddEditProperty; 