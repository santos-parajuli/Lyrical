import {SEARCH_SONG,SEARCH_ARTIST,SEARCH_LYRICS} from '../Actions/actionTypes';

const initialState = {
    searchSong:{},
    artist:{},
    lyrics:{},
    song:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SEARCH_SONG:
        return { ...state, searchSong:payload }

    case SEARCH_ARTIST:
        return { ...state, artist:payload }

    case SEARCH_LYRICS:
        return { ...state, lyrics:{lyrics:payload.lyrics},song:{song:payload.songDetails}}
    
    default:
        return state
    }
} 
