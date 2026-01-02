// import { UserProfile } from '@clerk/clerk-react';

// import SavedSearchCard from './SavedSearchCard';
// import { useState } from 'react';
// import CustomProfile from './CustomProfile';

// const UserProfilePage = () => {
//   const [crewId, setCrewId] = useState(null);

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         <div className="lg:col-span-1 space-y-6">
      
//           <div className="bg-white rounded-lg shadow">
//             <CustomProfile />
//           </div>
//         </div>

//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-lg shadow">
//             <SavedSearchCard crewId={crewId} />
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <UserProfile 
//               appearance={{
//                 elements: {
//                   rootBox: 'w-full',
//                   card: 'shadow-none'
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
   
//   );
// };

// export default UserProfilePage;