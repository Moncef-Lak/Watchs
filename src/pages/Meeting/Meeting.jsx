import React, { useState, useRef, useEffect } from "react";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import './Meeting.css'
import MoreWacths from "../../components/more-watchs/morWacths";
import { MyDate, Houre, Form } from './components/imp-exp-all'

const Meeting = () => {
  const [IsChose, setIsChose] = useState(false);
  const [IsChose2, setIsChose2] = useState(false);
  const [date, setDate] = useState(new Date());
  const [houre, setHoure] = useState('10:00:00');
  const [done, setDone] = useState(false);

  let pick_box = useRef(null);

  const chose = () => {
    if (IsChose2) {
      setIsChose2(false)
    }
    else {
      setIsChose(false)
    }
  }

  // fucntion of height
  useEffect(() => {
    if (!done) {
      const childBox1 = pick_box.children[0].getBoundingClientRect().height;
      const childBox2 = pick_box.children[1].getBoundingClientRect().height;
      const childBox3 = pick_box.children[2].getBoundingClientRect().height;

      (!IsChose && !IsChose2) && (pick_box.style.height = childBox1 + 'px');
      IsChose && (pick_box.style.height = childBox2 + 'px');
      IsChose2 && (pick_box.style.height = childBox3 + 'px');
    }
  }, [IsChose, IsChose2, done])


  return (
    <>
      <section className="meeting">
        {done ?
          <section className="mini-intro">
            <div className="title">Appointment saved</div>
            <div className="text text2">
              Your appointment request has been received.
            </div>
          </section>
          :
          <>
            <section className="mini-intro">
              <div className="title">Let's meet up</div>
              <div className="text">
                Online sales, without intermediaries,
                gives us the opportunity to meet you
                and answer all your questions about
                watches from our collections, the values they embody
                the beliefs that drive us. Do not hesitate
                contact us, we will always be happy to discuss with you.
              </div>
            </section>
            <section className="mini-contact">
              <div className="left">
                <div className="title">By telephone</div>
                <a href="tel:+213656711226" className="lien">+213 6 56 71 12 26</a>
              </div>
              <div className="right">
                <div className="title">Over a coffee</div>
                <a href="https://www.google.com/maps/place/Alger
            /@36.7386901,2.8591443,10z/data=!3m1!4b1!4m5!3m4!
            1s0x128fb26977ea659f:0x4231102d38a36f49!8m2!3
            d36.753768!4d3.0587561" className="lien">Alger Algeria route 58...</a>
              </div>
            </section>
            <section className="cal">
              <div className="mini-text">By appointment or by videoconference</div>
              <div className="text">
                Choose the time and date that suits you using the calendar
                below, we will be happy to welcome you to our showroom
                or during our travels in the region.
              </div>
              <div className="title-bar">
                {(!IsChose) && 'Select a date'}
                {(IsChose && !IsChose2) && 'Select a time slot'}
                {IsChose2 && 'Your personal information'}
              </div>
              <div className={`return-btn ${(IsChose || IsChose2) && 'return-btn-after'}`} onClick={chose} >
                <HiOutlineArrowNarrowRight className="arrow" />
                Return
              </div>

              <div className="pick-date-box" ref={e => pick_box = e}>
                <MyDate date={date} setIsChose={setIsChose} setDate={setDate} IsChose={IsChose} />
                <Houre setHoure={setHoure} IsChose={IsChose} IsChose2={IsChose2} setIsChose2={setIsChose2} houre={houre} />
                <Form IsChose2={IsChose2} date={date} houre={houre} setDone={setDone} />

                {/* <div className={`anwser ${IsChose2 && 'anwser-after'}`}>
              No time available for the selected date
            </div> */}
              </div>
            </section>
          </>
        }
      </section>
      <MoreWacths />
    </>
  );
}

export default Meeting;
