var express = require('express');
var router = express.Router();
var keys = require("../../config/keys");
var axios = require('axios');
var cheerio = require('cheerio');

router.post('/search', function(req, res, next) {  
  axios.get("http://api.genius.com/search?q="+req.body.searchItem,{
  headers: {'Authorization': `Bearer ${keys.clientAccessToken}` }
  }).then((response)=>{
    res.json(response.data.response.hits);
  }).catch((err)=>{
    console.log(err)
  })
});


router.post('/artist', function(req, res, next) {  
  const one="http://api.genius.com/artists/"+req.body.artistId+"?text_format=plain";
  const two="http://api.genius.com/artists/"+req.body.artistId+"/songs";
  const requestOne = axios.get(one,{headers: {'Authorization': `Bearer ${keys.clientAccessToken}`}});
  const requestTwo = axios.get(two,{headers: {'Authorization': `Bearer ${keys.clientAccessToken}`}});
  axios.all([requestOne, requestTwo])
    .then(axios.spread((...responses) => {
      const artist = responses[0].data.response.artist
      const artistSongs = responses[1].data.response.songs
      res.json({artist:artist,artistSongs:artistSongs});
    })).catch(errors => {
    console.log(errors)
  })
});

router.post('/lyrics', function(req, res, next) {
  axios.get("http://api.genius.com/songs/"+req.body.songId,{
  headers: {'Authorization': `Bearer ${keys.clientAccessToken}` }
  }).then((response) => {
      axios.get(response.data.response.song.url).then((result)=>{
         const html = result.data;
        const $ = cheerio.load(html); 
        const lyrics = $('div.lyrics').text()
        const lyrics1 = $('.Lyrics__Container-sc-1ynbvzw-2')
        var data="";
        const l = lyrics1.map((i,items)=>{
            items.children.map(x=>{
                if(x.data){
                    data=data+x.data+"\n";
                }
            })                
        })
        if(data===""){
          res.json({lyrics:lyrics,songDetails:response.data.response.song})
        }else{
          res.json({lyrics:data,songDetails:response.data.response.song})
        }
      })
    }, (error) => console.log(error) );
 
});

router.post('/test', function(req, res, next) {
      axios.get(req.body.url).then((result)=>{
        const html = result.data;
        res.json({html:html})  
      })
    }, (error) => console.log(error) 
  );
module.exports = router;
