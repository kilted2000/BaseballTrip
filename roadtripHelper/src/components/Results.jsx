
import {formatDate} from "./GameFinder"
const Results = () => {
return(
    <div
    id="result"
    className="bg-emerald-900 text-slate-200 p-3 rounded-lg table-auto"
  >

      {results.map((result, index) => (
                <table key={index} className="table-auto">
                <thead>
            <tr>
              <th>Team</th>
              <th>Day Played</th>
            </tr>
          </thead>
        <tbody >
        <tr  className=" border  border-8 border-b-sky-400 border-double border-spacing-y-0.5 border-t-transparent border-r-transparent border-l-transparent">
          <td><h3>{result.HomeTeam}</h3></td>  
          <td className=" text-2xl text-red-600"><p>{formatDate(result.Day)}</p></td>
          </tr>
        </tbody>
        </table>
      ))}
   
  </div>
)
}

export default Results;