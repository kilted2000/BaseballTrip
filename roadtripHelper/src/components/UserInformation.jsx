import { useUser } from "@clerk/clerk-react";

export const UserInformation = () => {
    const { user } = useUser();

    if (!user) return <p>Loading...</p>;

    const username = user.username || user.firstName || "Unknown User";
    const email = user.primaryEmailAddress?.emailAddress;
    const firstName = user.firstName;
    const lastName = user.lastName;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Profile Info</h2>

            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Name:</strong> {firstName} {lastName}</p>

            {/* Fill in later when "favoriteTeams" is a real field */}
            <p><strong>Favorite Teams:</strong> Coming Soon</p>
        </div>
    );
};
