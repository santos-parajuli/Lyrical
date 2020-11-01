import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import SearchSong from './components/SearchSong/SearchSong'
import SearchSongList from './components/SearchSongList'
import Artist from './components/Artist';
import Lyrics from './components/Lyrics';
function App() {
  return (
    <Router>
      <Route exact path='/' component={SearchSong}/>
      <Route exact path='/search/:searchItem' component={SearchSongList}/>
      <Route exact path='/artists/:artistId' component={Artist}/>
      <Route exact path='/songs/:songId' component={Lyrics}/>

    </Router>
  );
}

export default App;
