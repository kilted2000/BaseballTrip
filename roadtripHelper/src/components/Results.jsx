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
                
                 <th>{result.teamOne.HomeTeam}</th>
                 <th>{result.teamTwo.HomeTeam}</th>
                 <th>{result.teamThree.HomeTeam}</th>
                 <th>{result.teamFour.HomeTeam}</th>
               </tr>
               
             </thead>
          <tbody>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.teamOne.DateTime)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.teamTwo.DateTime)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.teamThree.DateTime)}</p>
              </td>
            </tr>
            <tr className="hover">
              <td className=" text-2xl">
                <p>{formatDate(result.teamFour.DateTime)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
