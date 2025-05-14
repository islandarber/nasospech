// utils/thumbnailUtils.js

export const getThumbnail = (videoUrl) => {
  if (!videoUrl) return null;

  const youtubePattern = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/|.+\?v=))([^?&/"'>]+)/;
  const vimeoPattern = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;

  const youtubeMatch = videoUrl.match(youtubePattern);
  const vimeoMatch = videoUrl.match(vimeoPattern);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1] || youtubeMatch[2];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // YouTube thumbnail
  }

  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return `https://vumbnail.com/${videoId}.jpg`; // Vimeo thumbnail
  }

  return null;
};

export const processProjects = (projects) => {
  return projects.map((project) => {
    if (!project.img && project.video) {
      const thumbnail = getThumbnail(project.video);
      project.img = thumbnail;
    }
    return project;
  });
};
