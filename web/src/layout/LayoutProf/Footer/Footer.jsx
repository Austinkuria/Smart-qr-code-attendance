/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h3>Smart QR Attendance</h3>
            <p>
              Developed by Austin <br />
              Registration Number: PA106/G/14998/21 <br />
              Email: contact@smartqrattendance.com <br />
              Phone: (+XXX) XXX-XXX-XXXX
            </p>
          </div>
          <div className="col-md-7 ml-auto">
            <div className="row site-section pt-0">
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>Navigation</h3>
                <ul className="list-unstyled">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>Resources</h3>
                <ul className="list-unstyled">
                  <li><a href="#">Documentation</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">FAQs</a></li>
                </ul>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <h3>Downloads</h3>
                <ul className="list-unstyled">
                  <li><a href="#">Get from the App Store</a></li>
                  <li><a href="#">Get from the Play Store</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-md-7">
            <p className="copyright">
              © {new Date().getFullYear()} Smart QR Code Student Attendance System. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
