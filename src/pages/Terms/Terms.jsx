import React, { useEffect } from "react";
import MoreWacths from "../../components/more-watchs/morWacths";
import "./Terms.css";

const Terms = () => {
  useEffect(() => {
    document.title = "TERMS";
  }, []);
  return (
    <>
      <section className="terms">
        <div className="title">Terms of Sales</div>
        <div className="intro">
          These General Conditions of Sales aim to define the relationships
          contractual between the Seller and the Customer as well as the
          applicable conditions in connection with the use of the site and the
          sale of products on the site. They apply, without restriction or
          reservation, to all sales of products offered by LM on his site.
        </div>
        <div className="groupe">
          <div className="pargh-title">Introduction</div>
          <div className="pargh-title">Last update : 14/02/2020</div>
          <div className="text">
            The Client/User is informed of the regulations concerning marketing
            communication, the law of June 21, 2014 for confidence in the
            Digital Economy, the Data Protection Act of August 6, 2004 as well
            as the General Data Protection Regulations (RGPD: no. 2016-679). The
            Seller processes the Customer's/User's data in accordance with the
            regulations on the protection of natural persons with regard to the
            processing of personal data and the free circulation of data called
            "general data protection regulations" (RGPD) .
          </div>
        </div>
        <div className="groupe">
          <div className="text">
            These General Conditions of Sale shall take precedence over any
            other document, any other general or specific conditions, except
            with the written agreement of LM.
          </div>
          <div className="text">
            In accordance with the regulations in force, the Seller reserves the
            right to derogate from certain clauses of these General Conditions
            of Sale, depending on the negotiations carried out with the
            Customer, by establishing Special Conditions of Sale.
          </div>
          <div className="text">
            In accordance with the regulations in force, the Seller reserves the
            right to derogate from certain clauses of these General Conditions
            of Sale, depending on the negotiations carried out with the
            Customer, by establishing Special Conditions of Sale.
          </div>
          <div className="text">
            Any order of Products placed on the site implies acceptance of all
            of these General Conditions of Sale, which the Customer acknowledges
            having read, understood and accepted in full knowledge of the facts.
          </div>
        </div>
        <div className="groupe">
          <div className="pargh-title">Definitions</div>
          <div className="list">
            <div className="mini-title">
              The terms used, both in the plural and in the singular, in these
              General Conditions of Sale have the following meaning:
            </div>
            <ul>
              <li>
                "Customer" means any adult natural or legal person, individual
                or professional, having the capacity to contract, ordering on
                the Seller's site.
              </li>
              <li>
                “General Terms and Conditions of Sale” means these General Terms
                and Conditions of Sale, the purpose and conditions of
                application of which are defined in the preamble and in Article
                1.
              </li>
              <li>
                "Order" means any acceptance by the Customer of the offers of
                Products made by the Seller through the website. It is usefully
                manifested by the online payment of the Products chosen by the
                Customer.
              </li>
              <li>
                "Order Confirmation" means the confirmation by the Seller, sent
                by e-mail and including the summary of the sale.
              </li>
              <li>
                "Party(ies)" means individually or collectively the Seller and
                the Customer.
              </li>
              <li>
                “Product(s)” means the Products offered for sale on the website.
              </li>
              <li>
                "Seller" means the company LM, identified in the preamble.
              </li>
              <li>
                "Sale", "Purchase" or "Contract" means each contract for the
                sale of Products resulting from the placing of an order by the
                Customer, accepted by the Seller through the website.
              </li>
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
      </section>
      <MoreWacths />
    </>
  );
};

export default Terms;
