import React from "react";

const Houre = ({IsChose,IsChose2,setIsChose2,setHoure,houre}) => {
  const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <div className={`dates ${IsChose && 'dates-after'} ${IsChose2 && 'dates-after-2'}`}>
      {hours.map((houre, key) => {
        return <div key={key} className="date-box" onClick={() => { setIsChose2(true); setHoure(houre + ':00:00') }}>{houre}:00 - {houre + 1}:00</div>
      })}
    </div>
  );
}

export default Houre;
