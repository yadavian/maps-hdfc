const { default: axios } = require('axios')
const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json());
app.post('/', async function (req, res) {
  const {lat,long}=req.body
  const data= await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=3000&type=bank&keyword=hdfc&key=AIzaSyC68H9SdF9KiJWStgwPugHIgY_IILwefRo`)
  // console.log(data)
  let result=[]
  if(data){
    // console.log(data.data.results)
  
    for (let index = 0; index < data.data.results.length; index++) {
        if(data.data.results[index].name=="HDFC Bank")
        {
            // console.log(data.data.results[index].name )
            result.push({
                name:data.data.results[index].name,
                address:data.data.results[index].vicinity,
                id:data.data.results[index].place_id,
                location:data.data.results[index].geometry.location

            })
        }
    }
  }
  res.send(result)
})


app.post('/current', async function (req, res) {
  const {lat,long}=req.body
  var address;
  const data= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${lat}%2C${long}&key=AIzaSyC68H9SdF9KiJWStgwPugHIgY_IILwefRo`)
  // console.log(data)
  let result=[]
  if(data){
   address=data.data.results[0].formatted_address
  
  }
  res.send(address)
})



app.listen(4444)