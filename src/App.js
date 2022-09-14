import React,{useState} from 'react';
import './App.css';
import youtube from './api/youtube';
import { Grid } from "@material-ui/core"
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';


function App() {
  const [videos,setVideos] = useState([]);
  const [selectedVideos,setSelectedVideos] = useState({ id:{}, snippet:{}});
  return (
    <Grid style={{justifyContent: 'center'}} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar  onSubmit = {handleSubmit}/>
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideos}/>
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideos}/>
          
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function handleSubmit(searchItem){
    const {data: { items: videos}} = await youtube.get("search",{
      params:{
        part:"snippet",
        maxResults:5,
        key:"AIzaSyBQfTymLUBHcxDfD3waO_zfISMBqhVcUHo",
        q: searchItem,
      }
    });
    setVideos(videos);
    setSelectedVideos(videos[0]);
  }
}

export default App;
