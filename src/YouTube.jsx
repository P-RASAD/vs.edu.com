import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Heart, Share2, Eye } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "careerguide2763";
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Fallback: Popular videos from the channel based on actual uploads
const fallbackVideos = [
  {
    id: "03eGvuyMQjI",
    title: "Career Guidance - Video 1",
    thumbnail: "https://img.youtube.com/vi/03eGvuyMQjI/maxresdefault.jpg",
    videoId: "03eGvuyMQjI",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Watch this career guidance video from our channel.",
  },
  {
    id: "j4E-PU-Wiz8",
    title: "Career Guidance - Video 2",
    thumbnail: "https://img.youtube.com/vi/j4E-PU-Wiz8/maxresdefault.jpg",
    videoId: "j4E-PU-Wiz8",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Learn professional skills and career tips from industry experts.",
  },
  {
    id: "hw-gyKF2EoI",
    title: "Career Guidance - Video 3",
    thumbnail: "https://img.youtube.com/vi/hw-gyKF2EoI/maxresdefault.jpg",
    videoId: "hw-gyKF2EoI",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Expert guidance for career advancement and growth.",
  },
  {
    id: "KWSQpN7p9BY",
    title: "Career Guidance - Video 4",
    thumbnail: "https://img.youtube.com/vi/KWSQpN7p9BY/maxresdefault.jpg",
    videoId: "KWSQpN7p9BY",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Professional development tips and strategies.",
  },
  {
    id: "yG6zQACeqgU",
    title: "Career Guidance - Video 5",
    thumbnail: "https://img.youtube.com/vi/yG6zQACeqgU/maxresdefault.jpg",
    videoId: "yG6zQACeqgU",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Comprehensive career guidance and mentoring.",
  },
  {
    id: "S3VcPv9rwEQ",
    title: "Career Guidance - Video 6",
    thumbnail: "https://img.youtube.com/vi/S3VcPv9rwEQ/maxresdefault.jpg",
    videoId: "S3VcPv9rwEQ",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Build your career with expert guidance.",
  },
  {
    id: "IF6q1wn4_OE",
    title: "Career Guidance - Video 7",
    thumbnail: "https://img.youtube.com/vi/IF6q1wn4_OE/maxresdefault.jpg",
    videoId: "IF6q1wn4_OE",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Professional skills and career development.",
  },
  {
    id: "vAPkOJ0T8eA",
    title: "Career Guidance - Video 8",
    thumbnail: "https://img.youtube.com/vi/vAPkOJ0T8eA/maxresdefault.jpg",
    videoId: "vAPkOJ0T8eA",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Career tips from industry professionals.",
  },
  {
    id: "LmNdtjy7ObU",
    title: "Career Guidance - Video 9",
    thumbnail: "https://img.youtube.com/vi/LmNdtjy7ObU/maxresdefault.jpg",
    videoId: "LmNdtjy7ObU",
    duration: "Video",
    views: "Recommended",
    likes: "Popular",
    uploadedAt: "Recent",
    description: "Master career planning and development strategies.",
  },
  {
    id: "Wy-_idAGHxc",
    title: "Featured Career Guide Video",
    thumbnail: "https://img.youtube.com/vi/Wy-_idAGHxc/maxresdefault.jpg",
    videoId: "Wy-_idAGHxc",
    duration: "Featured",
    views: "Recommended",
    likes: "⭐ Featured",
    uploadedAt: "Latest",
    description: "Featured career guidance video from our channel.",
  },
];

// Function to fetch videos from YouTube API
const fetchYouTubeVideos = async (channelId, apiKey) => {
  if (!apiKey) {
    console.log("No YouTube API key provided, using fallback videos");
    return fallbackVideos;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=12&order=date&type=video&key=${apiKey}`
    );
    const data = await response.json();

    if (data.items) {
      return data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId: item.id.videoId,
        duration: "Video",
        views: "Loading...",
        likes: "Loading...",
        uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        description: item.snippet.description,
      }));
    }
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
  }

  return fallbackVideos;
};

export default function YouTube() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleLike = (videoId) => {
    const newLiked = new Set(likedVideos);
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
    }
    setLikedVideos(newLiked);
  };

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const fetchedVideos = await fetchYouTubeVideos(CHANNEL_ID, YOUTUBE_API_KEY);
      setVideos(fetchedVideos);
      setLoading(false);
    };
    loadVideos();
  }, []);

  const shareVideo = (video) => {
    const url = `https://youtube.com/watch?v=${video.videoId}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert("Video URL copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030712] via-[#0a0e27] to-[#030712]">
      <Header />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-20 px-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 h-96 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl"></div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Career Guide Videos
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-lg max-w-2xl mx-auto"
        >
          Learn professional skills and career tips from industry experts
        </motion.p>
      </motion.section>

      {/* Videos Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
              <div
                onClick={() => setSelectedVideo(video)}
                className="relative cursor-pointer rounded-lg overflow-hidden bg-slate-900 hover:bg-slate-800 transition-all duration-300 h-48"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/50 transition-colors flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-red-600 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="fill-white text-white" size={28} />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <span className="text-sm font-bold text-white bg-black/60 px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="mt-4">
                <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{video.uploadedAt}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={14} />
                    <span>{video.likes}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleLike(video.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all ${
                      likedVideos.has(video.id)
                        ? "bg-red-600/20 text-red-400"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={likedVideos.has(video.id) ? "currentColor" : "none"}
                    />
                    <span className="text-xs font-semibold">Like</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => shareVideo(video)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
                  >
                    <Share2 size={16} />
                    <span className="text-xs font-semibold">Share</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-xl overflow-hidden max-w-4xl w-full"
            >
              {/* Video Player */}
              <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-slate-300 text-sm">{selectedVideo.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedVideo(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex gap-6 text-sm text-slate-400">
                    <span>👁️ {selectedVideo.views} views</span>
                    <span>❤️ {selectedVideo.likes} likes</span>
                    <span>📅 {selectedVideo.uploadedAt}</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleLike(selectedVideo.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        likedVideos.has(selectedVideo.id)
                          ? "bg-red-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={likedVideos.has(selectedVideo.id) ? "currentColor" : "none"}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => shareVideo(selectedVideo)}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all"
                    >
                      <Share2 size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Watch on YouTube Link */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href={`https://youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Watch on YouTube
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
