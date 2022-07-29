import React from 'react';
import VideoListItem from './video-list-item';

const VideoList = (props) => {
    const videoItems = props.videos.map((element) =>{
        return (
            <VideoListItem 
                onVideoSelect={props.onVideoSelect}
                key={element.etag} 
                video={element} />
        );
    });

    return (
        <div className="col-md-4">
            <ul className="list-group">
                {videoItems}
            </ul>
        </div>
    );
}

export default VideoList;