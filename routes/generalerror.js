/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-expressions */
const log = require('loglevel');


// errors needed for call is 404, class no longer available, major no longer available, concentration no longer available.

// function to get the URI of the page and tries to fetch it and if it fails it catches it and messages out ERROR 404.
  function Error404NOTFOUND(getID, getURI){

    const fetch = require('node-fetch');
    const message = document.getElementById(getID);
    message.innerHTML = "";
    const x = document.URL;

    fetch(getURI)
      .then(function error404Bool(getURI) {
          message.innerHTML = "200 OK";
      }).catch(function error404Bool(getURI) {
        message.innerHTML = "ERROR 404 NOT FOUND";
        log.error(err);
        return false;
      })
    return true;
  }

  function error404Bool(getURI){
    if(getURI != "" || getURI == NULL){
      return false;
    }
    else{
      return true;
    }
  }

  // get the id of the element for getting the class. If the class is Null or is the empty set than the class is not there and
  // throws that the class in not available.
  function ClassNotAvailable(getID){
    const message = document.getElementById(getID);
    message.innerHTML = "";
    const x = document.documentURI;
    
    try{
      if(x == "") throw "Class Not Available";
      if(x == NULL) throw "Class Not Available";
    }
    catch(err){
      message.innerHTML = err;
      log.error(err);
      return false;
    }
    return true;
  }


  // get the id of the element for getting the major. If the major is Null or is the empty set than the major is not there and
  // throws that the major in not available.
  function MajorNotAvailable(getID){
    const message = document.getElementById(getID);
    message.innerHTML = "";
    const x = document.documentURI;
    
    try{
      if(x == "") throw "Major Not Available";
      if(x == NULL) throw "Major Not Available";
    }
    catch(err){
      message.innerHTML = err;
      log.error(err);
      return false;
    }

    message.innerHTML;
    return true;
  }

  // get the id of the element for getting the concentration. If the concentration is Null or is the empty set than the concentration is not there and
  // throws that the concentration in not available.  
  function ConcentrationNotAvailable(){
    const message = document.getElementById("message");
    message.innerHTML = "";
    const x = document.URL;
    fetch(getURI)
    try{
      if(x == "") throw "Concentration Not Available";
      if(x == NULL) throw "Concentration Not Available";
    }
    catch(err){
      message.innerHTML = err;
      log.error(err);
      return false; 
    }
    return true;
  }
