import { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import CustomProfile from './CustomProfile';
import SavedSearchCard from './SavedSearchCard';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfilePage = () => {
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);

  useEffect(() => {
    const getCrewId = async () => {
      if (!user) return;

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return;

      try {
        const res = await fetch(`${API_URL}/api/crews/by-email/${email}`);
        if (res.ok) {
          const data = await res.json();
          setCrewId(data.id);
        }
      } catch (err) {
        console.error("Failed to load crew ID:", err);
      }
    };

    getCrewId();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <CustomProfile />
        </div>

        {/* Saved Searches Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg sticky top-6">
            <SavedSearchCard crewId={crewId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;