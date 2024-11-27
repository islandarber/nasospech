import SoundWaves from "../components/SoundWaves";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import soundDesignImage from "../assets/Categories/sounddesign4.jpg";
import postProdImage from "../assets/Categories/postprod 2.jpg"
import audioRecordImage from "../assets/Categories/rec 1.jpg"
import compositionImage from "../assets/Categories/composition 2.jpg"
import audioEngineerImage from "../assets/Categories/install 2.jpg"

export const Projects = () => {
  const projects = [
    {
      title: "''Insektensterben - Alles wird gut'' \n @Natural History Museum of Bern / Exhibition",
      info: "Audio design, Foley design, Ambience and Soundtrack\nImportant info: Exhibition running from 03.11.2023 to 31.05.2025",
      video: "https://www.youtube.com/embed/N1AXKNIDlzg",
    },
    {
      title: "A Pia (The Sink) [2023] Short film / Audio Postproduction",
      info: "Audio cleanup, Audio and Foley design, Stereo and 5.1 Mixing/Mastering",
      video: "https://player.vimeo.com/video/837296390",
    },
    {
      title: "RIAS choir performance @ Philharmonie Berlin / Commercial video",
      info: "Audio recording, Audio design and postproduction, Stereo and 5.1 Mixing/Mastering Important info: Aired in all Yorck Kinos Berlin for 2 months",
      video: "https://www.youtube.com/watch?v=j5rS3qjs3aw&list=LL&index=17",
    },
  ];

  const categories = [
    {
      title: "Audio Design",
      description: "Creating soundscapes and sound effects to enhance visual media, ensuring audio complements the intended mood and atmosphere.",
      imgPath: soundDesignImage,
    },
    {
      title: "Audio Postproduction",
      description: "Editing and refining recorded audio to achieve clarity and quality, including mixing, mastering, and adding effects for final production.",
      imgPath: postProdImage,
    },
    {
      title: "Audio Recording",
      description: "Capturing sound through various techniques and equipment, whether in a studio or live setting, to produce high-quality audio tracks.",
      imgPath: audioRecordImage,
    },
    {
      title: "Composition / Film Scoring",
      description: "Writing original music for film, television, and other media, tailored to enhance storytelling and emotional impact.",
      imgPath: compositionImage,
    },
    {
      title: "Audio Engineering / Installations",
      description: "Designing and implementing audio systems for various environments, ensuring optimal sound quality for events, venues, or installations.",
      imgPath: audioEngineerImage,
    },
  ];

  return (
    <div className="bg-custom-gradient min-h-screen">

      <div className="sm:flex justify-between gap-20 mr-4 sm:ml-10 sm:mr-10">
        <div className="ml-4 sm:ml-12">
          <h1 className="text-white text-center sm:text-left text-4xl font-bold">Projects</h1>
          <p className="text-white text-center sm:text-left text-md w-full mt-2">
          Explore my portfolio by browsing projects tailored to each of my specialized services.
          </p>
        </div>
        <SoundWaves />
      </div>

      <div className="p-2 mt-4">
        {categories.map((category, index) => (
          <Link to={`/projects/${index}`} key={index}>
            <motion.div
              className={`bg-transparent rounded-lg shadow-md p-4 flex items-center 
                ${index % 2 === 0 ? 'justify-start' : 'justify-end'}
                min-h-12 md:min-h-36 lg:min-h-48`}
              style={{
                cursor: "pointer",
                background: `
                  linear-gradient(
                    to ${index % 2 === 0 ? 'left' : 'right'}, 
                    rgba(0, 0, 0, 0) 20%, 
                    rgba(0, 0, 0, 0.6) 30%,
                    rgba(0, 0, 0, 0.9) 50%,
                    rgba(0, 0, 0, 1) 100%
                  ),
                  url(${category.imgPath})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            whileHover={{
              scale: 0.90, // Makes the div 5% larger on hover
            }}
            transition={{
              duration: 0.2, // Smooth transition duration
              ease: "easeInOut", // Easing effect
            }}
            
            >
              <h2
                className={`text-4xl text-white mb-1`} 
                >{category.title}</h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
