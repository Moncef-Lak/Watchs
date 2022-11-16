import React from "react";
import Calendar from "react-calendar";

function MyDate({date,setIsChose,IsChose,setDate}) {

  return (
    <Calendar
      maxDate={new Date((new Date().getTime()) + 1 * 30 * 24 * 3600 * 1000)}
      minDate={new Date()}
      value={date}
      nextLabel={'Next'}
      prevLabel={'Prev'}
      next2Label={null}
      prev2Label={null}
      calendarType={"Arabic"}
      className={`calender ${IsChose && 'calender-after'} `}
      onChange={setDate}
      onClickDay={() => { setIsChose(true) }}
    />
  );
}

export default MyDate;
