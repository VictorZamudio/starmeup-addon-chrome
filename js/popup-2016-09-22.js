window.onload = function(){
  StarmeupAddonFacebook.isVisible = false;

  // chrome.storage.local.set({
  //   'logged': false,
  // }, function(){
  //   console.log('logged false');
  // });
  //
  $('#logOut').on('click', function(e){
    chrome.storage.local.remove(['logged', 'profile'], function(data){
      console.log('data removed: ', data);
    });
  });

  $('#gotoStarmeUp').on('click', function(e){
    _starmeup_userName = $('#username').val();
    _starmeup_passWord = $('#password').val();

    var xhr = new XMLHttpRequest();
    // var url = 'https://qa.starmeup.com/starmeup-api/v2/stellar/leaderboard?organizationValue=0&organizationOffice=0&cityId=0&countryId=0&o=SMU_WEB&v=2&size=10&fromStringDate=0&toStringDate=' + date;
    var url = 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateuser/?email='+ _starmeup_userName + '&password=' + _starmeup_passWord;
    // var token = 'eyJleHBpcmVUaW1lIjoxNDgyMDkzMDE3NzQ0LCJ1c2VySWQiOjMzNjM4fQ.dE6_3PMDD706p374TUE07Y2BHyCccPdg_hqbTQJwBMhXjMuGgBX6lM7iR__NoREGCpGv67o06gSrlCIPR6OwxxfptbGPAaiMhHZyv2pd5nsEBgfMxe-A_I_7YRmfw1X7ihMb2GduwNtmcLPaSrHK56RGRux2r7S1aLIzacFiCRk1SX_XKjtppzWKprDnoRhGoiPTNF5vrBusxAFup3jjwH3plWwZAL1SHLQh9U7oOvfPQbQ0V_LKBJDBiPba82lahvRAnGf_eHsx4VzQVHPh9Ny-gkh7kH-xsqqYHE34ObgPuhasFOSmOw6sLjsvuwPTO1Zyp0qkbbPvbN4B7-qxDg';
    xhr.open('POST', url, true);
    // xhr.setRequestHeader("TOKEN", token);
    // alert(xhr);
    // return;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // innerText does not let the attacker inject HTML elements.
        // alert(xhr.responseText);
        // console.log('hi from background.js');
        // leaderBoardData = xhr.responseText;
        // alert(xhr.responseText);

        // chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
          // console.log('message: ', message);
        // });



        var data = JSON.parse(xhr.responseText);
        var profile = data.result;

        // StarmeupAddonFacebook.port = chrome.extension.connect({ name: "starmeup-port" });
        // StarmeupAddonFacebook.port.postMessage({ 'profile': profile});
        // var starmeupPort = chrome.runtime.connect({name: 'starmeup-port'});
        // starmeupPort.postMessage(profile);

        chrome.storage.local.set({
          'logged': true,
          'profile': profile
        }, function(){

        if(StarmeupAddonFacebook.isVisible === false){
          StarmeupAddonFacebook.isVisible = true;
          StarmeupAddonFacebook.addProfile(profile);
          // alert('visible');
          // $('#pagelet_welcome_box').after('<div><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong style="text-align:center">StarmeUp</strong><br><br><strong>Office:</strong> '+data.profile.office+'<br><strong>Area:</strong> '+data.profile.area+'<br><strong>Project:</strong> '+data.profile.project+'<br><br></div>');
        }

        });

        // StarmeupAddonFacebook.render(profile);
        // alert(JSON.stringify(leaderBoardData));
        // return;
        // chrome.tabs.getSelected(null, function(tab){
          // alert(JSON.stringify(leaderBoardData));
          // return;
            // chrome.tabs.sendMessage(tab.id, {type: "starmeup", leaderboard: leaderBoardData});
            // setting a badge
            // chrome.browserAction.setBadgeText({text: "BLUE"});
        // });


      }else{
        // alert('Error');
        // console.log('Error');
      }
    }
    xhr.send();


    // alert(_starmeup_userName + ' : ' + _starmeup_passWord);
    // alert('hi + ' + this.name);
    // chrome.tabs.executeScript(null, {file: url});
    // chrome.tabs.executeScript(null, {file: "js/content.js"});
    // alert(StarmeupAddonFacebook.userStarmeup);
    // alert(StarmeupAddonFacebook.passwordStarmeup);

    // return;

    // $.ajax({
    //   url      : 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateuser/?email='+ _starmeup_userName + '&password=' + _starmeup_passWord,
    //   // url      : 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateUserFromExternalToken?externalToken=' + externalToken, //
    //   type: 'POST',
    //   dataType : 'json',
    //   // async: false,
    //   success  : function(data){
    //     // alert(JSON.stringify(data.result));
    //     chrome.tabs.executeScript(null, {file: "/js/starmeup.js"});
    //     StarmeupAddonFacebook.addProfile(data.result);
    //   },
    //   error: function (err) {
    //     // $()
    //     console.log(err);
    //   }
    // });


    // if (_starmeup_userName === 'victor.zamudio@hotmail.com' && _starmeup_passWord === 'Globant1!') {
    //   $('.error').removeClass('show');
    //   chrome.tabs.executeScript(null, {file: "js/content.js"});
    // }else{
    //   $('.error').addClass('show');
    // }

  });
  // alert('hi');
};
