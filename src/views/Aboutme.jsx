import React, { useState } from "react";
import photo1 from "../assets/Aboutme/profilephoto.jpg";
import photo2 from "../assets/Aboutme/3.jpg";
import photo3 from "../assets/Aboutme/4.jpg";
import photo4 from "../assets/Aboutme/5.jpg";
import photo5 from "../assets/Aboutme/6.jpg";
import photo6 from "../assets/Aboutme/7.jpg";
import photo7 from "../assets/Aboutme/2.jpg";

export const Aboutme = () => {
  const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-custom-gradient flex flex-col items-center text-white ml-10 mr-10 font-poiretone tracking-wider">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* First Paragraph: On Top */}
        <div className="flex flex-col gap-6 sm:w-full mb-6">
          <h1 className="text-3xl font-bold item-center">About Me</h1>
          <p className="text-lg">
            Audio recording, editing, dialogue clean-up, sound design, film scoring, mixing and mastering for music, films, commercials, and any other audio material.
          </p>
        </div>

        {/* Second Paragraph and Image */}
        <div className="flex flex-col sm:flex-row w-full items-start">
          {/* Second Paragraph */}
          <div className="flex flex-col sm:w-1/2">
            <p className="text-lg leading-loose">
              Coming from Thessaloniki in Greece, I started my audio journey by playing bass guitar and producing trip hop and lo-fi instrumentals, self-tutoring on audio design, mixing and mastering techniques. I moved to Berlin, Germany, where I studied <strong>Audio Design at SRH Berlin</strong>, expanding my vision, technique, creativity, and goals.
              <br />
              Since then, I started connecting with filmmakers and worked in various projects as <strong>recordist, audio designer, and foley artist</strong>.
              <br />
              <br />
              My project list includes:
              <br />
              designing soundscapes and foley for <strong>“Insektensterben – Alles wird gut” at the Natural History Museum of Bern</strong>,
              <br />
              recording and mixing in 2nd order Ambisonics for <strong>“Mädchenmorde::Brunke”, VR theatre production of the Braunschweig State Theatre</strong>,
              <br />
              being audio director for the promo of <strong>RIAS choir’s performance at the Berlin Philharmonie</strong>.
              <br />
              <br />
              I work proficiently on Ableton Live 11 Suite, Pro Tools Studio, Reaper, RX 11 Advanced and WaveLab- depending on the project’s needs-, at my mixing desk and/or at SRH Berlin SOPA studios, using plugins from UA, SSL, Waves, Izotope, NI, Soundtoys, and others.
              <br />
              <br />
              Recording: Zoom F8n Pro, Neumann KMR81i shotgun mic, 2 Sennheiser G4 lavalier systems, Neumann TLM 102 condenser.
              <br />
              Monitoring: Focal Alpha 50s, AKG K702 open-back, and AKG K240 Studio semi-open.
            </p>
          </div>

          {/* Right: Main Image and Thumbnails */}
          <div className="flex flex-col sm:w-1/2 items-center sm:ml-4 mt-4 sm:mt-0">
            <div className="main-image-container mb-4">
              <img
                src={photos[activeIndex]}
                alt={`About me photo ${activeIndex + 1}`}
                className="main-image rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`About me photo ${index + 1}`}
                  className={`w-20 h-16 rounded-md cursor-pointer transition-transform duration-200 ${
                    activeIndex === index ? "border-2 border-white scale-105" : "border border-gray-600"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
