import SoundWaves from "../components/SoundWaves";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      imgPath: "https://www.newaudiotechnology.com/wp-content/uploads/2021/10/banner-professional.jpg",
    },
    {
      title: "Audio Postproduction",
      description: "Editing and refining recorded audio to achieve clarity and quality, including mixing, mastering, and adding effects for final production.",
      imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaaK9IP4ieFeSw7-8Xp5C8_BsNT9n5OPpFZQ&s",
    },
    {
      title: "Audio Recording",
      description: "Capturing sound through various techniques and equipment, whether in a studio or live setting, to produce high-quality audio tracks.",
      imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTR1ZQ_mgMACsHoOJyyvfvxOjpSZ4hUBV6kQ&s",
    },
    {
      title: "Composition / Film Scoring",
      description: "Writing original music for film, television, and other media, tailored to enhance storytelling and emotional impact.",
      imgPath: "/src/assets/sink.jpg",
    },
    {
      title: "Audio Engineering / Installations",
      description: "Designing and implementing audio systems for various environments, ensuring optimal sound quality for events, venues, or installations.",
      imgPath: "/src/assets/sink.jpg",
    },
  ];

  return (
    <div className="bg-custom-gradient h-screen">
      <div className="flex justify-between gap-10 ml-10 mr-10">
        <div className="ml-12">
          <h1 className="text-white text-xl font-bold">Projects</h1>
          <p className="text-white text-xs w-3/4 mt-2">
          Explore my portfolio by browsing projects tailored to each of my specialized services.
          </p>
        </div>
        <SoundWaves />
      </div>

      <div className="p-4">
        {categories.map((category, index) => (
          <Link to={`/projects/${index}`} key={index}>
            <motion.div
              className={`bg-transparent rounded-lg shadow-md p-2 flex flex-col justify-between hover:border-2 border-white 
                min-h-12 md:min-h-16 lg:min-h-24`}
              style={{
                minHeight: '70px',
                cursor: "pointer",
                background: `
                  linear-gradient(
                    to ${index % 2 === 0 ? 'left' : 'right'}, 
                    rgba(0, 0, 0, 0) 40%, 
                    rgba(0, 0, 0, 0.7) 50%,
                    rgba(0, 0, 0, 1) 60%
                  ),
                  url(${category.imgPath})
                `,
                backgroundSize: 'contain, cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            
            >
              <h2
                className={`text-lg text-white mb-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`} 
                >{category.title}</h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
