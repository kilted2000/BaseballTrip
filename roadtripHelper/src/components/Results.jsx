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

  const uniqueDates = [...new Set(results.map(result => formatDate(result.DateTime)))].sort();
  const uniqueTeams = [...new Set(results.map(result => result.HomeTeam))];

  return (
    <div
      id="result"
      className="bg-emerald-900 text-slate-200  rounded-lg overflow-x-auto w-full"
    >
        <div className="navbar bg-base-300 mt-0">
        <a className="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
        <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
        <a href="/GameFinder.jsx" className="mx-3">Back</a>
      </div>
      </div>
      <div className="p-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th> 
              {uniqueTeams.map((team, index) => (
                <th key={index} className="text-center">{team}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueDates.map((date, dateIndex) => (
              <tr key={dateIndex} className="hover">
                <td className="font-bold">{date}</td>
                {uniqueTeams.map((team, teamIndex) => {
                  const hasGame = results.some(
                    result => 
                      result.HomeTeam === team && 
                      formatDate(result.DateTime) === date
                  );
                  return (
                    <td key={teamIndex} className="text-center">
                      {hasGame ? "✓" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      
    </div>
  );
};
