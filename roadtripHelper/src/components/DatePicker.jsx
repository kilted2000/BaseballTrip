import {useState} from 'react'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';

export const DatePicker = ({ onChange }) => {
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          key: 'selection'
        }
      ]);

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setDates([selection]);
    onChange(ranges); 
  };
 
  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={dates}
    />
      )
}