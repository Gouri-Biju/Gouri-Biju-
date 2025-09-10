import React, { useEffect } from "react";
import { User, Share2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
      {/* Title + subtitle */}
      <div className="text-center lg:mt-[5%] mt-10 mb-2">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          Let’s Connect
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          I’d love to hear from you! You can connect with me directly on LinkedIn or explore my projects on GitHub.
        </p>
      </div>

      {/* Connect Buttons */}
      <div
        className="h-auto py-10 flex items-center justify-center"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/gouri-biju/"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-right"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-[#6366f1]/20"
          >
            <User className="w-12 h-12 text-[#6366f1] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
            <p className="text-gray-400 mb-4">Let’s connect and grow together.</p>
            <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold transition-all hover:scale-105">
              Connect
            </span>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/Gouri-Biju"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="fade-left"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-[#a855f7]/20"
          >
            <Share2 className="w-12 h-12 text-[#a855f7] mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
            <p className="text-gray-400 mb-4">Check out my latest projects & code.</p>
            <span className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#6366f1] text-white font-semibold transition-all hover:scale-105">
              Explore
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
