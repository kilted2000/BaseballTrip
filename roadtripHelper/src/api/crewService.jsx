const API_URL = import.meta.env.VITE_BACKEND_URL;

// Get a crew by email
export const getCrewByEmail = async (email) => {
  const res = await fetch(`${API_URL}/crews/by-email/${email}`);

  if (!res.ok) return null;

  const text = await res.text();
  if (!text) return null;

  return JSON.parse(text);
};

// Create a new crew
export const createCrew = async (email, clerkUserId) => {
  const res = await fetch(`${API_URL}/crews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, clerkUserId }),
  });

  if (!res.ok) {
    throw new Error("Failed to create crew");
  }

  return res.json();
};

// Get existing crew or create a new one
export const getOrCreateCrewId = async (user) => {
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress;
  if (!email) return null;

  const clerkUserId = user.id;

  let crew = await getCrewByEmail(email);

  if (!crew) {
    crew = await createCrew(email, clerkUserId);
  }

  return crew.id;
};


