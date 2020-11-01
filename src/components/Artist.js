import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {searchArtist} from '../Actions/songActions'
import { Grid } from '@material-ui/core'; 
import SongCard from './shared/SongCard/SongCard';
import Loading from './shared/Loading/Loading';



export class Artist extends Component {
    
    constructor(){
        super();
        this.state={
            isLoading:false
        }
    }

    componentDidMount() {
            const artistId = this.props.match.params.artistId;
            this.setState({isLoading:true})
            this.props.searchArtist({artistId:artistId});
    }

    componentDidUpdate(prevProps){
        if (prevProps.store.artist !== this.props.store.artist) {
            this.setState({isLoading:false})
        }
    }
    checkIsLoading(){
        if (this.state.isLoading) {
            return <Loading/>           
        }
    }
    renderSongs(artistSongs){
        if (artistSongs) {
            return (
                Object.keys(artistSongs).map((item, i) => (
                 ( 
                    <Grid  item xs={12} lg={4} md={6} >
                        <SongCard item={artistSongs[item]}/>
                    </Grid>
                )             
            ))
            )
        }
    }

   
    renderArtistDetail(artist){
        if (artist) {
            return(
                <Grid xs={12} >
                <img src={artist.header_image_url} alt="header" width="100%" height="350px" style={{objectFit:"cover"}} />
                <img src={artist.image_url} alt="artist" height="180px" width="180px" style={{ marginTop:"-100px",borderRadius:"50%",border: "3px solid white", display: "block", marginLeft: "auto", marginRight: "auto" }} />      
                <h3 style={{color: "#212121",fontSize: "35px",marginTop: "15px",textAlign:"center"}}>{artist.name}</h3>
                
                </Grid>
            )
            
        }
    }
    render() {
    const { artistSongs } = this.props.store.artist;
    const { artist } = this.props.store.artist;


        return (
            <div>
                    <Grid container>
                        {this.checkIsLoading()}
                        {this.renderArtistDetail(artist)}
                        {this.renderSongs(artistSongs)}
                    </Grid>
            </div>
        )
    }
}
Artist.propTypes = {
  searchArtist: PropTypes.func.isRequired,
  store:PropTypes.object.isRequired
};

const mapState = (state) => {
    return {
        store: state.store
    }
}

export default connect(mapState,{searchArtist}) (Artist);
