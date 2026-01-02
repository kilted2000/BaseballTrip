// import { useUser } from "@clerk/clerk-react";
// import { useState, useEffect } from "react";

// const API_URL = import.meta.env.VITE_BACKEND_URL;

// export const UserInformation = ({ onCrewIdLoad }) => {
//   const { user } = useUser();

//   const [crewId, setCrewId] = useState(null);
//   const [favTeam, setFavTeam] = useState("");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     favTeam: "",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const getOrCreateCrew = async () => {
//       if (!user) return;

//       const email = user.primaryEmailAddress?.emailAddress;
//       if (!email) return;

//       try {
//         let res = await fetch(`${API_URL}/api/crews/by-email/${email}`);
//         let data = null;

//         if (res.ok) {
//           data = await res.json();
//         }

//         if (!data || !data.id) {
//           res = await fetch(`${API_URL}/api/crews`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               email,
//               clerkUserId: user.id,
//             }),
//           });

//           if (!res.ok) {
//             throw new Error("Failed to create crew");
//           }

//           data = await res.json();
//         }

//         setCrewId(data.id);
//         setFavTeam(data.favTeam || "");
        
//         // Notify parent component
//         if (onCrewIdLoad) {
//           onCrewIdLoad(data.id);
//         }

//         setFormData({
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           username: user.username || "",
//           favTeam: data.favTeam || "",
//         });
//       } catch (err) {
//         console.error("Failed to load crew info:", err);
//       }
//     };

//     getOrCreateCrew();
//   }, [user, onCrewIdLoad]);

//   const handleEdit = () => setIsEditing(true);

//   const handleCancel = () => {
//     setIsEditing(false);
//     setFormData({
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       username: user.username || "",
//       favTeam: favTeam || "",
//     });
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSave = async () => {
//     if (crewId === null) {
//       console.error("Cannot save: crewId is null");
//       return;
//     }

//     setIsSaving(true);

//     try {
//       // Update backend crew (favTeam)
//       const res = await fetch(`${API_URL}/api/crews/${crewId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ favTeam: formData.favTeam }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update crew");
//       }

//       const updatedCrew = await res.json();
//       setFavTeam(updatedCrew.favTeam || "");
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Failed to save profile:", err);
//       alert("Failed to save profile. Please try again.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (!user) return <p>Loading user...</p>;
//   if (crewId === null) return <p>Loading profile...</p>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Profile Info</h2>
//         {!isEditing && (
//           <button
//             onClick={handleEdit}
//             className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       {!isEditing ? (
//         <>
//           <p className="mb-2">
//             <strong>Username:</strong> {user.username}
//           </p>
//           <p className="mb-2">
//             <strong>Email:</strong>{" "}
//             {user.primaryEmailAddress?.emailAddress}
//           </p>
//           <p className="mb-2">
//             <strong>Name:</strong> {user.firstName} {user.lastName}
//           </p>
//           <p className="mb-2">
//             <strong>Favorite Teams:</strong> {favTeam}
//           </p>
//         </>
//       ) : (
//         <div className="space-y-4">
//           <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
//             <strong>Note:</strong> To change your name or username, please use the account settings on the right.
//           </div>

//           <input
//             name="favTeam"
//             value={formData.favTeam}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             placeholder="Favorite teams (comma-separated)"
//           />

//           <div className="flex gap-2">
//             <button
//               onClick={handleSave}
//               disabled={isSaving || crewId === null}
//               className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
//             >
//               {isSaving ? "Saving..." : "Save"}
//             </button>

//             <button
//               onClick={handleCancel}
//               disabled={isSaving}
//               className="px-4 py-2 bg-gray-500 text-white rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };