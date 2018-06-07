const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();


/*  create keypair by openssl in terminal
  openssl genrsa -out private.pem -aes256 1024
  openssl rsa -in private.pem -pubout -out public.pem
*/

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';
var constants = require('constants');


var path = require("path");
var fs = require("fs");

function encrypt(text, password){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','base64')
  crypted += cipher.final('base64');
  return crypted;
}

function decrypt(text, password){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));



var base58 = require('base58-native');
//base58.encode(base58.decode('mqqa8xSMVDyf9QxihGnPtap6Mh6qemUkcu'));

var base58Check = require('base58-native').base58Check;
//base58Check.encode(base58Check.decode('mqqa8xSMVDyf9QxihGnPtap6Mh6qemUkcu'));


app.get('/',function(req,res){

  res.sendfile("AgentsEditor.html");

});

app.post('/',function(req,res){

  if( req.body.action == "StoreToLocal" ){

    var _collection = req.body._collection;
    var _relationships = req.body._relationships;

    var hash = crypto.createHash('sha256');
    hash.update(_collection);
    var _collection_passphrase=hash.digest('base64');
    var _collection_encrypted=encrypt( _collection, _collection_passphrase );

    var hash = crypto.createHash('sha256');
    hash.update(_relationships);
    var _relationships_passphrase=hash.digest('base64');
    var _relationships_encrypted=encrypt( _relationships, _relationships_passphrase );

    fs.writeFile("AgentCollection.encrypted", _collection_encrypted );
    fs.writeFile("AgentRelationships.encrypted", _relationships_encrypted );
    fs.writeFile("AgentCollection.passphrase", encryptStringWithRsaPublicKey( _collection_passphrase, "public.pem") );
    fs.writeFile("AgentRelationships.passphrase", encryptStringWithRsaPublicKey( _relationships_passphrase, "public.pem") );
    res.end("data stored");
  }

  if( req.body.action == "GetLocalPublicKey" ){

      // append public key in hashed form
      var absolutePath = path.resolve("public.pem");
      var publicKey = fs.readFileSync(absolutePath, "utf8");
      var hash = crypto.createHash('SHA256');
      hash.update(publicKey.replace(/\n/g,''));
      var publicKeyHashed=hash.digest('hex');

      res.end(publicKeyHashed);

  }

  if( req.body.action == "LoadFromLocal" ){

    var passphrase = req.body.passphrase;

    var _collection_passphrase = "";
    fs.readFile('AgentCollection.passphrase', 'utf8', function read(err, data) {
      if (err) res.end("");
      _collection_passphrase = decryptStringWithRsaPrivateKey ( data, "private.pem", passphrase );
      console.log( "CPs", _collection_passphrase );
    });

    var DATA={};
    fs.readFile('AgentCollection.encrypted', 'utf8', function read(err, data) {
      if (err) res.end("");
      content = JSON.parse( decrypt(  data , _collection_passphrase ) );
      // Invoke the next step here however you like


      // append public key in hashed form
      var absolutePath = path.resolve("public.pem");
      var publicKey = fs.readFileSync(absolutePath, "utf8");
      var hash = crypto.createHash('SHA256');
      hash.update(publicKey.replace(/\n/g,''));
      var publicKeyHashed=hash.digest('hex');
      DATA["_collection"]=content;
      DATA["id"]=publicKeyHashed;

      //res.end(JSON.stringify(content));

    });


    var _relationships_passphrase = "";
    fs.readFile('AgentRelationships.passphrase', 'utf8', function read(err, data) {
      if (err) res.end("");
      _relationships_passphrase = decryptStringWithRsaPrivateKey ( data, "private.pem", passphrase );
    });

    fs.readFile('AgentRelationships.encrypted', 'utf8', function read(err, data) {
      if (err) res.end("");
      content = JSON.parse( decrypt(  data , _relationships_passphrase ) );
      // Invoke the next step here however you like
      DATA["_relationships"]=content;
      res.end(JSON.stringify(DATA));

    });

  }

  if( req.body.action == "PrepareForPost" ){

    var DATA={};

    var index=req.body.index;
    var passphrase = req.body.passphrase;

    var password = "";
    fs.readFile('AgentCollection.passphrase', 'utf8', function read(err, data) {
      if (err) res.end("");
      password = decryptStringWithRsaPrivateKey ( data, "private.pem" );
    });

    fs.readFile('AgentCollection.encrypted', 'utf8', function read(err, data) {
      if (err) res.end("");

      content = JSON.parse( decrypt(  data , password ) );

      const sign = crypto.createSign('RSA-SHA256');

      var absolutePath = path.resolve("private.pem");
      var privateKey = fs.readFileSync(absolutePath, "utf8");

      var absolutePath = path.resolve("public.pem");
      var publicKey = fs.readFileSync(absolutePath, "utf8");

      DATA["data"]=JSON.stringify(content[index]);
      sign.update(DATA["data"]);
      var signature = sign.sign({key: privateKey, passphrase: passphrase }, 'base64');

      DATA["id"]=publicKey;
      DATA["signature"]=signature;

      res.end( JSON.stringify(DATA));

    });

  }


});
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})



var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt({key: publicKey, padding:constants.RSA_PKCS1_OAEP_PADDING }, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey, passphrase) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var options={ key: privateKey, passphrase: passphrase, padding:constants.RSA_PKCS1_OAEP_PADDING };

    try {
      var decrypted = crypto.privateDecrypt(options, buffer);
      console.log( "passphrase OK" );
      return decrypted.toString("utf8");

    } catch(err) {
      console.log( "passphrase NOK" );
      return "";
    }
};

module.exports = {
    encryptStringWithRsaPublicKey: encryptStringWithRsaPublicKey,
    decryptStringWithRsaPrivateKey: decryptStringWithRsaPrivateKey
}

/*
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
