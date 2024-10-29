import { SoundWaves } from "../components/SoundWaves";

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
      imgPath: "https://blog.landr.com/wp-content/uploads/2024/04/Top-10-Best-DAW-Apps-for-Production-in-20242024Featured.png",
    },
    {
      title: "Audio Postproduction",
      description: "Editing and refining recorded audio to achieve clarity and quality, including mixing, mastering, and adding effects for final production.",
      imgPath: "https://recorder.easeus.com/images/en/screen-recorder/resource/adobe-audition.jpg",
    },
    {
      title: "Audio Recording",
      description: "Capturing sound through various techniques and equipment, whether in a studio or live setting, to produce high-quality audio tracks.",
      imgPath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMVRs5-RiHfDr6pwVzM_BhVg77W9eEH-dVMw&s",
    },
    {
      title: "Composition / Film Scoring",
      description: "Writing original music for film, television, and other media, tailored to enhance storytelling and emotional impact.",
      imgPath: "https://www.premiumbeat.com/blog/wp-content/uploads/2015/10/love-score.jpg?w=875&h=490&crop=1",
    },
    {
      title: "Audio Engineering / Installations",
      description: "Designing and implementing audio systems for various environments, ensuring optimal sound quality for events, venues, or installations.",
      imgPath: "https://images.squarespace-cdn.com/content/v1/62013be1bef1e95a2d5c406d/1649969430252-K48N2WSAJ9ZH39IA0F66/sound-image-touring-banner-pa-systems-v2.jpg",
    },
  ];

  return (
    <div>
      <div className="flex justify-between gap-4 ml-10 mr-10">
        <div>
          <h1 className="text-white text-5xl font-bold">Projects</h1>
          <p className="text-white mt-4">Check out my projects where beats meet creativity. From raw recordings to slick soundscapes, each piece tells a story. Dive in and feel the vibe!</p>
        </div>
        <iframe
          width="100%"
          height="166"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1486995763&color=%23080808&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          className="w-full h-40 bg-gray-900 rounded-lg shadow-md transition-transform transform hover:scale-105"
        ></iframe>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
  {categories.map((category, index) => (
    <div
      key={index}
      className="bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
    >
      <img
        src={category.imgPath}
        alt={category.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-2">{category.title}</h2>
        <p className="text-gray-300">{category.description}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};
