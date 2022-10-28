const express = require('express');
const app = express();
var cors = require('cors');;
const port = process.env.PORT || 8080;
var http = require('http');

var corsOptions = {
  origin: function (origin, callback) {
    // db.loadOrigins is an example call to load
    // a list of origins from a backing database
    db.loadOrigins(function (error, origins) {
      callback(error, origins)
    })
  }
}

// Cria um servidor HTTP e uma escuta de requisições para a porta 8000
app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.get('/verify_static/', cors(), (req, res) =>{
  
  var url = {
    "valid":true,
    "number":"5543996680646",
    "local_format":"0, 0XX43996680646",
    "international_format":"+5543996680646",
    "country_prefix":"+55","country_code":"BR",
    "country_name":"Brazil (Federative Republic of)",
    "location":"Parana' (PR)",
    "carrier":"TIM SA",
    "line_type":"mobile"
  }
  
  res.send(url);
})

app.get('/verify_phone_number/',cors(), (req, res)=> {

  var phone_number = req.query.number;
  var country_code = 'BR';
  var access_key = 'b3d08459cc491ec85e3c895bd6712289';

  var url = 'http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + phone_number + '&country_code='+ country_code + '&format=1'; 

  
  http.get(url, (resp) => {
      let data = '';

        // Concatinate each chunk of data
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // Once the response has finished, do something with the result
        resp.on('end', () => {
          res.json(JSON.parse(data));
          console.log(JSON.parse(data))
        });

        // If an error occured, return the error to the user
      }).on("error", (err) => {
        res.json("Error: " + err.message);
  })    

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = express;