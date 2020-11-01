import {SEARCH_SONG,SEARCH_ARTIST,SEARCH_LYRICS} from './actionTypes';
import axios from 'axios'


export const  searchSong= searchItem => dispatch => {
      axios
        .post("https://lyricalmern.herokuapp.com/api/song/search", searchItem)
        .then(req => {
            dispatch({
                type:SEARCH_SONG,
                payload:req.data
            })
        })
        .catch(err =>
            console.log(err)
        );
    }

export const  selectSong = songID => dispatch => {
      console.log(songID);
    }

export const  searchArtist= artistId => dispatch => {
      axios
        .post("https://lyricalmern.herokuapp.com/api/song/artist", artistId)
        .then(req => {
            dispatch({
                type:SEARCH_ARTIST,
                payload:req.data
            })
        })
        .catch(err =>
            console.log(err)
        );
    }

    export const  searchLyrics= songId => dispatch => {
      axios
        .post("https://lyricalmern.herokuapp.com/api/song/lyrics", songId)
        .then(req => {
            dispatch({
                type:SEARCH_LYRICS,
                payload:req.data
            })
        })
        .catch(err =>
            console.log(err)
        );
    }

