import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YoutubeSearch from 'youtube-api-search';
//import components
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';
//youtube api key
const API_KEY = 'AIzaSyDgeiOuDXQFjZ96lofJQGG3LdKe7kZFFwE';

//Create a new component this component should produce some html.
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YoutubeSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(
      (term) => { this.videoSearch(term); },
      300
    );
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo }) } videos={this.state.videos} />
      </div>
    );
  }
};

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
