const axios = require('axios')
var fs = require('fs')

axios
  .get('http://localhost:8081/search?title=us', {
    todo: ''
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(`statusText: ${res.statusText}`);
    fs.writeFile('omdb.html',res.data,function(err){
      if (err){
        return console.error(err);
      }
      console.log("Data Written Successfully")
    })
    // console.log(res)
  })
  .catch(error => {
    console.error(error)
    fs.writeFile('error.html',JSON.stringify(error.response.data),function(err){
      if (err){
        return console.error(err);
      }
      console.log("Error Written Successfully")
    })
  })