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
        <div class="navbar bg-base-300 mt-0">
        <a class="btn btn-ghost text-xl">Baseball Bucketlist</a>
        <div className="ml-auto">
        <UserButton className="absolute top-0 right-0 mt-4 mx-4 text-sky-500" />
        <a href="/GameFinder.jsx" className="mx-3">Back</a>
      </div>
      </div>
      {results.map((result, index) => (
        <table key={index} className="table-auto table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Day Played</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>
                <h3>{result.HomeTeam}</h3>
              </td>
              <td className=" text-2xl">
                <p>{formatDate(result.Day)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
//change how data is sorted then redo results table