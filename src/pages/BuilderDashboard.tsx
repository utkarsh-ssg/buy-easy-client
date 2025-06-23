import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

const BuilderDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("userName") + '@'; // crude way to get email

  useEffect(() => {
    if (!token || role !== 'builder') navigate('/login-builder');
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/properties`);
    const data = await res.json();
    setProperties(data.filter((p: any) => p.seller_email.startsWith(email)));
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await fetch(`${API_URL}/projects/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleteId(null);
      fetchProperties();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <Button asChild size="lg">
            <Link to="/builder-dashboard/add">Add New Property</Link>
          </Button>
        </div>
        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property: any) => (
              <div key={property.id} className="relative border rounded-lg shadow bg-white p-4">
                <PropertyCard property={property} />
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => navigate(`/builder-dashboard/edit/${property.id}`)} size="sm">Edit</Button>
                  <Button onClick={() => handleDelete(property.id)} size="sm" variant="destructive">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete this property?</p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white border-t py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} BuyEasy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BuilderDashboard; 