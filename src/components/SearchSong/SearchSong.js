import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './SearchSong.css';
import {searchSong} from '../../Actions/songActions';



export class SearchSong extends Component {
    constructor(){
        super();
        this.state ={search:""}
    }
    onChange = (e)=> {
        e.preventDefault();
        this.setState({search:e.target.value})
    };
    onSubmit=(e)=>{
        e.preventDefault();
        this.props.history.push("/search/"+this.state.search)
    }
    listenSongs=(e)=>{
        e.preventDefault();
        console.log("Listen Songs");
    }
    render() {
        return (
          <div className="container">
                   <form className="search__container" onSubmit={this.onSubmit}>
                        <input className="search__input" onChange={this.onChange} placeholder="Search Music" required autoComplete="true" type="text" />
                        <IconButton type="submit" onClick={this.onSubmit} >
                            <SearchIcon className="search__icon" />
                        </IconButton>
                    </form>
        </div>
        )
    }
}

SearchSong.propTypes = {
  searchSong: PropTypes.func.isRequired,
  store:PropTypes.object.isRequired
};


const mapState = (state) => {
    return {
        store: state.store
    }
}

export default connect(mapState,{searchSong}) (SearchSong);