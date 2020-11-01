import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {searchLyrics} from '../Actions/songActions'
import { Container, Grid, Paper } from '@material-ui/core'; 
import TextEffect from './shared/TextEffect/TextEffect';
import Loading from './shared/Loading/Loading';
import ReactPlayer from "react-player"

export class Lyrics extends Component {
    constructor(){
        super();
        this.state={
            isLoading:false
        }
    }
     componentDidUpdate(prevProps){
        if (prevProps.store.lyrics !== this.props.store.lyrics) {
            this.setState({isLoading:false})
        }
    }
    checkIsLoading(){
        if (this.state.isLoading) {
            return <Loading/>           
        }
    }

    componentDidMount() {
            const songId = this.props.match.params.songId;
            this.setState({isLoading:true})
            this.props.searchLyrics({songId:songId});
    }
      


    showLyrics(lyrics){
        if(lyrics!==undefined){
            return lyrics.split('\n').map(str => {
                if(str.includes('[')){
                   return <p style={{color:"black",fontFamily:'Dancing Script serif',fontWeight:"bold",fontSize:"26px"}}><br/><b>{str}</b></p>
                }else{
                    return    <p style={{color:"black",fontFamily:'Dancing Script serif',fontSize:"20pt"}}>{str}</p> 
                }
            });   
        }        
        
    }

    showMedia(song){
        if (song) {
            return (
                song.media.map((items)=>{   
                    if(items.provider==="soundcloud"){ 
                        return(
                            <Paper >
                                <ReactPlayer url={items.url} height="auto"/>
                            </Paper>
                        )
                    }
                    if(items.provider==="youtube"){ 
                        const arr=items.url.split("=");
                        return(
                            <Paper >
                                <iframe width="100%" title="youtube" height="315" src={"https://www.youtube.com/embed/"+arr[1]}/>
                            </Paper>
                        )
                    }   
               })
            )
        }
    }
    render() {
    const { lyrics } = this.props.store.lyrics;
    const { song } = this.props.store.song
    const {musicData} = this.props.location.state

    return (
            <div>
                <Grid >
                    <TextEffect text={musicData.title}/>
                </Grid>
                    {this.checkIsLoading()}
                    <Grid container spacing={2} justify="space-around" >

                        <Grid item xs={12} sm={8} >
                            <Container  >
                                    <Paper style={{paddingLeft:"20px",paddinRight:"auto"}}  >
                                            {this.showLyrics(lyrics)}
                                    </Paper> 
                            </Container>         
                        </Grid>   
                        <Grid item xs={12} sm={4}>
                            <Paper style={{paddingLeft:"20px",textAlign:"center"}}>
                                <ul>
                                    <li key="image"> <img alt="song" src={musicData.song_art_image_thumbnail_url} height="200px" width="80%" style={{objectFit:"cover"}}/></li>
                                    <li key="title"> {musicData.full_title}</li>
                                    <li key="singer name"> Singer Name : {musicData.primary_artist.name}</li>
                                    <li key="singer"> Singer Name : {musicData.primary_artist.name}</li>
                                </ul>
                            </Paper>  
                                {
                                    this.showMedia(song)
                                }
                        </Grid>   
                    </Grid>
            </div>
        )
    }
}
Lyrics.propTypes = {
  searchLyrics: PropTypes.func.isRequired,
  store:PropTypes.object.isRequired,
};

const mapState = (state) => {
    return {
        store: state.store,
    }
}

export default connect(mapState,{searchLyrics}) (Lyrics);

