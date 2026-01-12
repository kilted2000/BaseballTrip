const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getCrewByEmail = async (email) => {
  const encodedEmail = encodeURIComponent(email);

  const res = await fetch(
    `${API_URL}/api/crews/by-email/${encodedEmail}`
  );

  if (!res.ok) return null;

  const text = await res.text();
  if (!text) return null;

  return JSON.parse(text);
};

export const createCrew = async (email, clerkUserId) => {
  const res = await fetch(`${API_URL}/api/crews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, clerkUserId }),
  });

  if (!res.ok) throw new Error("Failed to create crew");
  return res.json();
};




export const updateCrewProfile = async (crewId, updates) => {
  const res = await fetch(
    `${API_URL}/api/crews/${crewId}/profile`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );

  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};


// Keep the old function for backward compatibility if needed
export const updateFavTeam = async (crewId, favTeam) => {
  return updateCrewProfile(crewId, { favTeam });
};

export const getOrCreateCrewId = async (user) => {
  if (!user) return null;
  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return null;
  const clerkUserId = user.id;

  let crew = await getCrewByEmail(email);
  if (!crew) crew = await createCrew(email, clerkUserId);
  return crew.id;
};
