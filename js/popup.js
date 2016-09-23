window.onload = function(){
  console.log('POPUP.JS');

  $('#logOut').on('click', function(e){
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {'type': 'remove'});
    });
  });

  $('#logIn').on('click', function(e){
    _starmeup_userName = $('#username').val();
    _starmeup_passWord = $('#password').val();

    var xhr = new XMLHttpRequest();
    // var url = 'https://qa.starmeup.com/starmeup-api/v2/stellar/leaderboard?organizationValue=0&organizationOffice=0&cityId=0&countryId=0&o=SMU_WEB&v=2&size=10&fromStringDate=0&toStringDate=' + date;
    // var url = 'https://starmeup.com/starmeup-api/v2/sec/authenticateuser/?email='+ _starmeup_userName + '&password=' + _starmeup_passWord;
    var url = 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateuser/?email='+ _starmeup_userName + '&password=' + _starmeup_passWord;
    // var token = 'eyJleHBpcmVUaW1lIjoxNDgyMDkzMDE3NzQ0LCJ1c2VySWQiOjMzNjM4fQ.dE6_3PMDD706p374TUE07Y2BHyCccPdg_hqbTQJwBMhXjMuGgBX6lM7iR__NoREGCpGv67o06gSrlCIPR6OwxxfptbGPAaiMhHZyv2pd5nsEBgfMxe-A_I_7YRmfw1X7ihMb2GduwNtmcLPaSrHK56RGRux2r7S1aLIzacFiCRk1SX_XKjtppzWKprDnoRhGoiPTNF5vrBusxAFup3jjwH3plWwZAL1SHLQh9U7oOvfPQbQ0V_LKBJDBiPba82lahvRAnGf_eHsx4VzQVHPh9Ny-gkh7kH-xsqqYHE34ObgPuhasFOSmOw6sLjsvuwPTO1Zyp0qkbbPvbN4B7-qxDg';
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // console.log('xhr.responseText: ', xhr.responseText);
        var data = JSON.parse(xhr.responseText);
        // console.log('data.errorCode: ', data.errorCode);
        if (data.errorCode == 100) { // fail validation
          $('#formStarmeUp .error').addClass('show');
        }else{
          $('#formStarmeUp .error').removeClass('show');
          var profile = data.result;
          StarmeupAddonFacebook.addProfile(profile);
        }
      }
    }
    xhr.send();

  });
};
