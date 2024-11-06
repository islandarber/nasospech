export const ProjectInfoModal = ({ project, handleCloseCard }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-black bg-opacity-90 p-6 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          onClick={handleCloseCard}
        >
          ×
        </button>
        <div className="flex-1 mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
          <iframe
            className="w-full h-full md:w-[800px] md:h-[537px] aspect-w-16 aspect-h-9"
            src={project.video}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Project Video"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-3xl text-white font-bold mb-4">
            {project.title}
          </h3>
          <p className="text-white text-lg">{project.info}</p>
        </div>
      </div>
    </div>
  );
};
