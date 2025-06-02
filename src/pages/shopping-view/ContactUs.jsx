import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white px-10 pt-20 py-10 md:flex md:items-start md:justify-center md:gap-4 text-[#81504D]">
      {/* Left: Contact Text Section */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="mb-6 text-bas leeading-relaxed">
          We are here to help! Contact our friendly team 24/7 and get set up and ready to go!!
        </p>

        <div className="space-y-4 text-xl pl-10">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[#f4ada5]" />
            <a href="">Give us a call</a>
            {/* <span>Give us a call</span> */}
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[#f4ada5]" />
            <a href="">Shoot us on email</a>
            {/* <span>Shoot us on email</span> */}
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="text-[#f4ada5]" />
            <a href="">Message us on Instagram</a>
            {/* <span>Message us on Instagram</span> */}
          </div>
        </div>
      </div>

      {/* Right: Google Map */}
      <div className="md:w-1/2">
        <iframe
          title="Gyalpozhing College of IT"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.855357105853!2d89.66422177524738!3d27.535952476281235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e19566fa54c4df%3A0x82f8fd359c78d7f5!2sGyalpozhing%20College%20of%20Information%20Technology%20-%20Kabesa%20Campus!5e0!3m2!1sen!2sbt!4v1743923102592!5m2!1sen!2sbtt"
          width="100%"
          height="300"
          className="rounded-lg shadow-md border-2 border-[#f4ada5]"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
