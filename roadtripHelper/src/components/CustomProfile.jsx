import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

import { updateCrewProfile } from "../api/crewApi";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CustomProfile() {
  const { user } = useUser();

  const [crewId, setCrewId] = useState(null);
  const [favTeam, setFavTeam] = useState("");
  const [username, setUsername] = useState("");

  const [foodAllergies, setFoodAllergies] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterests] = useState([]);

  const [teamInput, setTeamInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [foodAllergiesInput, setFoodAllergiesInput] = useState("");
  const [foodPreferencesInput, setFoodPreferencesInput] = useState("");
  const [hobbiesInput, setHobbiesInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");

  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  
  useEffect(() => {
    const getOrCreateCrew = async () => {
      if (!user) return;

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) return;

      try {
       
        let res = await fetch(`${API_URL}/api/crews/by-email/${email}`);
        let data = res.ok ? await res.json() : null;

        
        if (!data || !data.id) {
          res = await fetch(`${API_URL}/api/crews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              clerkUserId: user.id,
              username: user.username || user.firstName || "user",
            }),
          });
          if (!res.ok) throw new Error("Failed to create crew");
          data = await res.json();
        }

        setCrewId(data.id);
        setFavTeam(data.favTeam || "");
        setTeamInput(data.favTeam || "");
        setUsername(data.username || user.username || "");
        setUsernameInput(data.username || user.username || "");

        
        setFoodAllergies(data.foodAllergies || []);
        setFoodPreferences(data.foodPreferences || []);
        setHobbies(data.hobbies || []);
        setInterests(data.interests || []);

        setFoodAllergiesInput((data.foodAllergies || []).join(", "));
        setFoodPreferencesInput((data.foodPreferences || []).join(", "));
        setHobbiesInput((data.hobbies || []).join(", "));
        setInterestsInput((data.interests || []).join(", "));
      } catch (err) {
        console.error("Failed to load crew info:", err);
      }
    };

    getOrCreateCrew();
  }, [user]);

  const handleSaveProfile = async () => {
  setIsSaving(true);
  try {
    const updated = await updateCrewProfile(crewId, {
      foodAllergies: foodAllergiesInput.split(",").map(s => s.trim()).filter(Boolean),
      foodPreferences: foodPreferencesInput.split(",").map(s => s.trim()).filter(Boolean),
      hobbies: hobbiesInput.split(",").map(s => s.trim()).filter(Boolean),
      interests: interestsInput.split(",").map(s => s.trim()).filter(Boolean),
    });

    setFoodAllergies(updated.foodAllergies || []);
    setFoodPreferences(updated.foodPreferences || []);
    setHobbies(updated.hobbies || []);
    setInterests(updated.interests || []);

    setIsEditingProfile(false);
    document.getElementById("editProfile").showModal();
  } catch (err) {
    console.error(err);
    document.getElementById("errorProfile").showModal();
  } finally {
    setIsSaving(false);
  }
};






const handleSaveTeam = async () => {
  setIsSaving(true);
  try {
    const updated = await updateCrewProfile(crewId, {
      favTeam: teamInput,
    });

    setFavTeam(updated.favTeam);
    setTeamInput(updated.favTeam);
    setIsEditingTeam(false);

    document.getElementById("editTeam").showModal();
  } catch (err) {
    console.error(err);
    document.getElementById("errorTeam").showModal();
  } finally {
    setIsSaving(false);
  }
};


const handleSaveUsername = async () => {
  setIsSaving(true);
  try {
    const updated = await updateCrewProfile(crewId, {
      username: usernameInput,
    });

    setUsername(updated.username);
    setUsernameInput(updated.username);
    setIsEditingUsername(false);

    document.getElementById("editUser").showModal();
  } catch (err) {
    console.error(err);
    document.getElementById("errorUser").showModal();
  } finally {
    setIsSaving(false);
  }
};


  if (!user) return <p className="p-8 text-center">Loading user...</p>;
  if (!crewId) return <p className="p-8 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
       
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

       
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          <div className="space-y-4">
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

        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Favorite Team(s)</h2>
          <div className="space-y-4">
            <div>
              {!isEditingTeam && (
                <button
                  onClick={() => setIsEditingTeam(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-2"
                >
                  Edit
                </button>
              )}
              {!isEditingTeam ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-100">
                  {favTeam ? (
                    <div className="flex flex-wrap gap-2">
                      {favTeam.split(",").map((team, idx) => (
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
                    placeholder="Enter team names separated by commas"
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

        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Additional Profile Info</h2>
          {!isEditingProfile && (
            <div className="space-y-2">
              <p><strong>Food Allergies:</strong> {foodAllergies.join(", ") || "None"}</p>
              <p><strong>Food Preferences:</strong> {foodPreferences.join(", ") || "None"}</p>
              <p><strong>Hobbies:</strong> {hobbies.join(", ") || "None"}</p>
              <p><strong>Interests:</strong> {interests.join(", ") || "None"}</p>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            </div>
          )}
          {isEditingProfile && (
            <div className="space-y-3">
              <label>Food Allergies</label>
              <input
                value={foodAllergiesInput}
                onChange={(e) => setFoodAllergiesInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Comma-separated values"
              />
              <label>Food Preferences</label>
              <input
                value={foodPreferencesInput}
                onChange={(e) => setFoodPreferencesInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Comma-separated values"
              />
              <label>Hobbies</label>
              <input
                value={hobbiesInput}
                onChange={(e) => setHobbiesInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Comma-separated values"
              />
              <label>Interests</label>
              <input
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Comma-separated values"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setIsEditingProfile(false);
                    setFoodAllergiesInput(foodAllergies.join(", "));
                    setFoodPreferencesInput(foodPreferences.join(", "));
                    setHobbiesInput(hobbies.join(", "));
                    setInterestsInput(interests.join(", "));
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

        
        <dialog id="editProfile" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Profile Updated!</h3>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => document.getElementById("editProfile").close()}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="errorProfile" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error updating profile</h3>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn"
                  onClick={() => document.getElementById("errorProfile").close()}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}


