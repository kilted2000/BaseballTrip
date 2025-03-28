import { UserButton } from "@clerk/clerk-react";

 export const Results = ({ results }) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };


  return (
    <div
      id="result"
      className="bg-emerald-900 text-slate-200  rounded-lg table-auto w-full"
    >
        <div className="navbar bg-base-300 mt-0">
        <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
        <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
        <a href="/GameFinder.jsx" className="mx-3">Back</a>
      </div>
      </div>
      {/* table-auto  */}
             {results.map((result, index) => (
             <table key={index} className="table table-pin-cols">
             <thead>
               <tr>
                
                 <th>{result.HomeTeam.teamOne}</th>
                 <th>{result.HomeTeam.teamTwo}</th>
                 <th>{result.HomeTeam.teamThree}</th>
                 <th>{result.HomeTeam.teamFour}</th>
               </tr>
               
             </thead>
          <tbody>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.DateTime.teamOne)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.DateTime.teamTwo)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.DateTime.teamThree)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.DateTime.teamFour)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
