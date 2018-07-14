import React from "react";

class Contact extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="contact" class="contact">
          <div class="container">
            <div class="w3l-heading">
              <h3>Contact</h3>
              <div class="w3ls-border"> </div>
            </div>
            <div class="contact-row agileits-w3layouts">
              <div class="col-md-6 col-sm-6 contact-w3lsright">
                <h6>
                  Sed interdum interdum accumsan nec purus ac orci finibus
                  facilisis.
                </h6>
                <div class="address-row">
                  <div class="col-xs-2 address-left">
                    <span class="glyphicon glyphicon-home" aria-hidden="true" />
                  </div>
                  <div class="col-xs-10 address-right">
                    <h5>Visit Us</h5>
                    <p>Bmr St, Canada, New York, USA</p>
                  </div>
                  <div class="clearfix"> </div>
                </div>
                <div class="address-row w3-agileits">
                  <div class="col-xs-2 address-left">
                    <span
                      class="glyphicon glyphicon-envelope"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="col-xs-10 address-right">
                    <h5>Mail Us</h5>
                    <p>
                      <a href="mailto:info@example.com"> mail@example.com</a>
                    </p>
                  </div>
                  <div class="clearfix"> </div>
                </div>
                <div class="address-row">
                  <div class="col-xs-2 address-left">
                    <span
                      class="glyphicon glyphicon-phone"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="col-xs-10 address-right">
                    <h5>Call Us</h5>
                    <p>+01 222 333 4444</p>
                  </div>
                  <div class="clearfix"> </div>
                </div>

                <div class="map agileits">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.948805392833!2d-73.99619098458929!3d40.71914347933105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a27e2f24131%3A0x64ffc98d24069f02!2sCANADA!5e0!3m2!1sen!2sin!4v1479793484055" />
                </div>
              </div>
              <div class="clearfix"> </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Contact
