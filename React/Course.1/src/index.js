import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Youtube from 'youtube-api-search';

import SearchBar from './components/search-bar';
import VideoDetail from './components/video-detail';
import VideoList from './components/video-list';

console.log("Application is started");
console.log("Youtube data API", process.env.YOUTUBE_DATA_API);

class App extends Component {
  constructor(props) {
    super(props);

    Youtube({key: process.env.YOUTUBE_DATA_API, term: 'Science'}, (videos) => {
      this.setState({ videos });
    });

    this.state = { 
      videos: [],
      selectedVideo: null
    };
  }

  render() {
    return (
      <div>
        <SearchBar/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'));