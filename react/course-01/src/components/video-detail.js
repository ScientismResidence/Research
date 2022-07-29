import React from "react";

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Select the video</div>;
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    
    return (
        <div className="video-detail col-md-8">
            <div className="ratio ratio-16x9">
                <iframe className="" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;