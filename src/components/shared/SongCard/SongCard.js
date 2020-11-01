import React from 'react'
import { Link } from 'react-router-dom'
import './Songcard.css'

export default function SongCard(props) {
    return (
        <div className="card">
            <div className="card_left">
                <img src={props.item.song_art_image_url} alt="Song"/>
            </div>
            <div className="card_right">
                <div className="card_right__review">
                    <p>{props.item.title}</p>
                    <a className="artist_name" href={`${props.item.primary_artist.api_path}`}>{props.item.primary_artist.name}</a>
                    <div className="card_right__button">
                    <Link to={{pathname:`${props.item.api_path}`,state:{
                        musicData:props.item
                    }}}>SEE LYRICS</Link>
                </div>
                </div>
            </div>
        </div>
    )
}
