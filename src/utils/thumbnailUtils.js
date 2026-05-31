// utils/thumbnailUtils.js

export const getThumbnail = (videoUrl) => {
  if (!videoUrl) return null;

  const youtubePattern = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/|.+\?v=))([^?&/"'>]+)/;
  const vimeoPattern = /vimeo\.com\/(?:video\/)?(\d+)/;

  const youtubeMatch = videoUrl.match(youtubePattern);
  const vimeoMatch = videoUrl.match(vimeoPattern);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return `https://vumbnail.com/${videoId}.jpg`;
  }

  return null;
};

// Converts a YouTube/Vimeo link (in any common form) into an embeddable URL
// that works inside an <iframe>. Accepts normal "watch" links, short links,
// shorts, or already-embed links. Unknown URLs are returned unchanged.
export const toEmbedUrl = (url) => {
  if (!url) return url;

  // If a full <iframe ...> embed snippet was pasted, pull the src out of it.
  const iframeSrc = url.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  if (iframeSrc) url = iframeSrc[1];

  // Already an embed/player URL — leave it as-is.
  if (/youtube\.com\/embed\//.test(url) || /player\.vimeo\.com\/video\//.test(url)) {
    return url;
  }

  // YouTube: watch?v=ID, youtu.be/ID, shorts/ID, v/ID
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|v\/))([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  // Vimeo: vimeo.com/123456789
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Unknown provider — return unchanged (may already be embeddable).
  return url;
};

// Adds a `preview` thumbnail URL to each project (first image, else a video
// thumbnail). Used wherever the admin list is (re)set so images stay visible.
export const withPreviews = (projects = []) =>
  projects.map((project) => {
    const imageMedia = project.media?.find((item) => item.type === 'image');
    const videoMedia = project.media?.find((item) => item.type === 'video');
    return {
      ...project,
      preview: imageMedia?.url || getThumbnail(videoMedia?.url),
    };
  });
