window.onload = function(){
  console.log('POPUP.JS');
  var StarmeUpAddonChromePopUp = StarmeUpAddonChromePopUp || {};

  StarmeUpAddonChromePopUp.authenticateUserSMU = function(){
    // console.log(StarmeUpAddonChromePopUp.username);
    // console.log(StarmeUpAddonChromePopUp.password);
    var requestUserSMUData = new XMLHttpRequest();
    var url = 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateuser/?email=' + StarmeUpAddonChromePopUp.username + '&password=' + StarmeUpAddonChromePopUp.password;
    requestUserSMUData.open('POST', url, true);
    requestUserSMUData.onreadystatechange = function(){
      if (requestUserSMUData.readyState == 4) {
        var data = JSON.parse(requestUserSMUData.responseText);
        // console.log('data: ', data);
        // console.log('data.errorCode: ', data.errorCode);
        if (data.errorCode == 100) { // fail validation
          $('#formStarmeUp .error').addClass('show');
        }else{
          $('#formStarmeUp .error').removeClass('show');
          var profileUserSMULogged = data.result;
          var tokenSMULogged = data.token;
          chrome.tabs.query({'active': true}, function(Tabs){
            // console.log(Tabs);
            // chrome.tabs.sendMessage(Tabs[1].id, {'type': 'profile', 'profile': profile});
            chrome.tabs.sendMessage(Tabs[1].id, {'type': 'userLogged', 'token': tokenSMULogged, 'profileUserSMULogged': profileUserSMULogged});
          });
        }
      }
    };
    requestUserSMUData.send();
  };

  $('#logOut').on('click', function(e){
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {'type': 'remove'});
    });
  });

  $('#logIn').on('click', function(e){
    StarmeUpAddonChromePopUp.username = $('#username').val();
    StarmeUpAddonChromePopUp.password = $('#password').val();
    // If user is already logged
    if (localStorage.getItem('userSMULogged') === null) {
      StarmeUpAddonChromePopUp.authenticateUserSMU();
    }else{
      // Do something
    }
  });
};
