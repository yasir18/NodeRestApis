
//--------- Basic promise Example-----------------------

let promiseToCleanTheRoom = new Promise(function(resolve, reject) {

    //cleaning the room
  
    let isClean = false;
  
    if (isClean) {
      resolve('Clean');
    } else {
      reject('not Clean');
    }
  
  });
  
  promiseToCleanTheRoom.then(function(fromResolve) {
    console.log('the room is' + fromResolve);
  }).catch(function(fromReject){
      console.log('the room is' + fromReject);
  })


  //--------------------- Promises dependent on one another ------------------------

  let cleanRoom = function() {
    return new Promise(function(resolve, reject) {
      resolve('Cleaned The Room');
    });
  };
  
  let removeGarbage = function(message) {
    return new Promise(function(resolve, reject) {
      resolve(message + ' remove Garbage');
    });
  };
  
  let winIcecream = function(message) {
    return new Promise(function(resolve, reject) {
      resolve( message + ' won Icecream');
    });
  };
  
  cleanRoom().then(function(result){
      return removeGarbage(result);
  }).then(function(result){
      return winIcecream(result);
  }).then(function(result){
      console.log('finished ' + result);
  })

  



//--------------------------------------------------------------------------------------------------------
function addAsync(a, b) {
    var promise = new Promise(function (cb) {
        console.log("inside promise");
        if (a === 0)
            throw { errMsg: "Failed to calculate" };
        else cb(a + b);
    });

    return promise;
}

var prms = addAsync(5, 20);

prms.then(function (result) {
    console.log('result is ', result);
})
    .catch(function (err) {
        console.log('error ', err);
    }); 
//promise will be executed only once
prms.then(function (result) {
        console.log('result is ', result);
    })


// Traversy media tutorial code link
//  https://plnkr.co/4Pv2HhiWV4kiPHY9VrUw    