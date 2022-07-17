import { useState, useEffect } from "react";
import { getFirestore, onSnapshot, collection } from "../firbaseConfig";

function VideoList() {
  // video source state
  const [videosSource, setVideoSources] = useState([]);

  // get videos from firebase data base
  useEffect(() => {
    let fetchVideos = onSnapshot(
      collection(getFirestore(), "videos-collection"),
      (snapShot) => {
        setVideoSources(snapShot.docs.map((doc) => doc.data()));
      }
    );

    return fetchVideos;
  }, []);

  return (
    <div className="videos-container">
      <h2>Videos</h2>
      {videosSource &&
        videosSource.map((video, i) => {
          return (
            <video
              key={i}
              src={video.videoUrl}
              alt={video.name}
              controls
            ></video>
          );
        })}
    </div>
  );
}

export default VideoList;
