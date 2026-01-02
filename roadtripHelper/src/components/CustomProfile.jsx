
// CustomProfile.jsx - Main consolidated profile component
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CustomProfile() {
  const { user } = useUser();
  const [crewId, setCrewId] = useState(null);
  const [favTeam, setFavTeam] = useState("");
  const [username, setUsername] = useState("");
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [teamInput, setTeamInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load crew data once the user is available
  useEffect(() => {
    const getOrCreateCrew = async () => {
      if (!user) return;

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return;

      try {
        let res = await fetch(`${API_URL}/api/crews/by-email/${email}`);
        let data = null;

        if (res.ok) {
          data = await res.json();
        }

        if (!data || !data.id) {
          res = await fetch(`${API_URL}/api/crews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              clerkUserId: user.id,
            }),
          });

          if (!res.ok) throw new Error("Failed to create crew");
          data = await res.json();
        }

        setCrewId(data.id);
        setFavTeam(data.favTeam || "");
        setTeamInput(data.favTeam || "");
        setUsername(user.username || "");
        setUsernameInput(user.username || "");
      } catch (err) {
        console.error("Failed to load crew info:", err);
      }
    };

    getOrCreateCrew();
  }, [user]);

  const handleSaveTeam = async () => {
    if (crewId === null) return;

    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/crews/${crewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favTeam: teamInput }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedCrew = await res.json();
      setFavTeam(updatedCrew.favTeam || "");
      setIsEditingTeam(false);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveUsername = async () => {
    setIsSaving(true);
    try {
      await user.update({
        username: usernameInput,
      });
      setUsername(usernameInput);
      setIsEditingUsername(false);
    } catch (err) {
      console.error("Failed to update username:", err);
      alert("Failed to update username. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <p className="p-8 text-center">Loading user...</p>;
  if (crewId === null) return <p className="p-8 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-white flex items-center gap-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={username || "User"}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">@{username || "user"}</h1>
              <p className="text-blue-200 text-sm mt-1">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <span className="text-2xl">👤</span> Profile Settings
          </h2>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-500">Username</label>
                {!isEditingUsername && (
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingUsername ? (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-100">
                  <p className="text-gray-800 font-medium">@{username}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveUsername}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingUsername(false);
                        setUsernameInput(username);
                      }}
                      disabled={isSaving}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Baseball Preferences */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <span className="text-2xl">⚾</span> Baseball Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-500">Favorite Teams</label>
                {!isEditingTeam && (
                  <button
                    onClick={() => setIsEditingTeam(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingTeam ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-100">
                  {favTeam ? (
                    <div className="flex flex-wrap gap-2">
                      {favTeam.split(',').map((team, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                        >
                          {team.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No favorite teams set</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={teamInput}
                    onChange={(e) => setTeamInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter team names separated by commas (e.g., Yankees, Red Sox, Dodgers)"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveTeam}
                      disabled={isSaving}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingTeam(false);
                        setTeamInput(favTeam);
                      }}
                      disabled={isSaving}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}