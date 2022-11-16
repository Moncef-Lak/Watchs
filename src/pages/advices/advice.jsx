import React, { useEffect } from "react";
import MoreWacths from "../../components/more-watchs/morWacths";
import "./advice.css";

const Advice = () => {
  useEffect(() => {
    document.title = "ADVICE";
  }, []);
  return (
    <>
      <section className="advice">
        <div className="title">Advice & maintenance</div>
        <div className="intro">
          Self-winding mechanical watches are particularly robust but
          nevertheless sensitive to certain external aggressions. As a general
          rule, your LM watch, which is meant to be with you at all times, will
          take what you can take.
        </div>

        <div className="groupe">
          <div className="pargh-title">Precautions</div>
          <div className="list">
            <div className="mini-title">
              Be careful not to subject your LM watch to:
            </div>
            <ul>
              <li>significant thermal shocks</li>
              <li>severe or repeated physical shocks</li>
              <li>abrasive substances or surfaces</li>
              <li>extreme temperatures</li>
              <li>high amplitude radiation or magnetic fields</li>
              <li>aggressive chemical agents</li>
              <li>extreme pressures</li>
              <li>prolonged immersions</li>
              <li>prolonged humid environments</li>
            </ul>
          </div>
        </div>
        <div className="groupe">
          <div className="pargh-title">Waterproofing</div>
          <div className="text">
            LM watches, indicating 3 ATM (3 atmospheres), are waterproof. We
            also say 3 ATM / 30 meters. This measurement specific to watchmaking
            actually means that your watch will withstand splashes or rain
            without any problem. Do not make him take showers or baths. The
            radiance of LM elegance is only terrestrial!
          </div>
          <div className="text">
            The crown of an LM has an aesthetic vocation and a technical
            mission: By pulling the crown, you can adjust the time by rotation.
            Take care to push back the crown immediately, otherwise the seal
            will not be respected.
          </div>
          <div className="text">
            Watchmaking gaskets are delicate parts that provide watertightness
            but wear naturally. We recommend that you have the water resistance
            of your watch checked once a year.
          </div>
        </div>

        <div className="groupe">
          <div className="pargh-title">Interview</div>
          <div className="text">
            Your LM watch requires very simple regular maintenance. To ensure
            that your watch retains its original shine for a long time, you just
            need to clean it regularly using a synthetic microfiber cloth
            without wetting it. Lightly dampen the same type of microfiber cloth
            to occasionally clean the case and the rubber strap.
          </div>
          <div className="text">
            Your LM is equipped with an automatic movement which produces the
            energy necessary for its operation by capturing the energy of your
            movements. So you don't need to wind it up. If you don't wear your
            LM watch, it will run for 44 hours and then stop. This is called its
            power reserve. If it is inactive for longer, reset your watch then
            wind it up by rotating the crown after pushing it back. It will
            immediately resume normal operation on your wrist.
          </div>
        </div>

        <div className="groupe">
          <div className="pargh-title">Revision</div>
          <div className="text">
            We advise you to entrust your LM watch to us every 4 years for a
            complete and careful overhaul which will ensure its longevity.
          </div>
          <div className="list">
            <div className="mini-title">Simply return your LM watch to us:</div>
            <ul>
              <li>with its original strap</li>
              <li>in its original packaging</li>
            </ul>
          </div>
          <div className="text">
            Accompanied by the return slip available on the warranty page. It
            will be immediately taken care of and we will inform you of our
            interventions and the date of return.
          </div>
        </div>

        <div className="groupe">
          <div className="pargh-title">contingencies</div>
          <div className="text">
            For all situations that we have not provided for on this page, do
            not hesitate to contact us. We will always be happy to improve and
            make your life easier with LM.
          </div>
        </div>
      </section>
      <MoreWacths />
    </>
  );
};

export default Advice;
