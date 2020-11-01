import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {searchSong} from '../Actions/songActions'
import SongCard from './shared/SongCard/SongCard';
import { Grid } from '@material-ui/core'; 
import TextEffect from './shared/TextEffect/TextEffect';
import Loading from './shared/Loading/Loading';


export class SearchSongList extends Component {
    constructor(){
        super();
        this.state={
            isLoading:false
        }
    }
    componentDidMount() {
            const searchName = this.props.match.params.searchItem;
            this.setState({isLoading:true})
            this.props.searchSong({searchItem:searchName});
    }
    componentDidUpdate(prevProps){
        if (prevProps.store.searchSong !== this.props.store.searchSong) {
            this.setState({isLoading:false})
        }
    }
    checkIsLoading(){
        if (this.state.isLoading) {
            return <Loading/>           
        }
    }

    render() {
    const { searchSong } = this.props.store;

        return (
            
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextEffect text={this.props.match.params.searchItem}/>
                </Grid>
                
                {this.checkIsLoading()}
                
                {
                    Object.keys(searchSong).map((item, i) => (
                    <Grid item xs={12} lg={4} md={6} >
                        <SongCard item={searchSong[item].result}/>
                    </Grid>
                    ))
                }
            </Grid>
        )
    }
}
SearchSongList.propTypes = {
  searchSong: PropTypes.func.isRequired,
  store:PropTypes.object.isRequired
};


const mapState = (state) => {
    return {
        store: state.store
    }
}

export default connect(mapState,{searchSong}) (SearchSongList);
