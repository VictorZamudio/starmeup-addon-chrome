window.onload = function(){
  // StarmeupAddonFacebook.isVisible = false;

  chrome.tabs.getSelected(null, function(tab){
    // chrome.tabs.onUpdated.addListener(null, function(){
    //   alert('hi');
    // });
  });



  $('#logOut').on('click', function(e){
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {'remove': true});
    });
  });

  $('#logIn').on('click', function(e){
    _starmeup_userName = $('#username').val();
    _starmeup_passWord = $('#password').val();

    var xhr = new XMLHttpRequest();
    // var url = 'https://qa.starmeup.com/starmeup-api/v2/stellar/leaderboard?organizationValue=0&organizationOffice=0&cityId=0&countryId=0&o=SMU_WEB&v=2&size=10&fromStringDate=0&toStringDate=' + date;
    var url = 'https://qa.starmeup.com/starmeup-api/v2/sec/authenticateuser/?email='+ _starmeup_userName + '&password=' + _starmeup_passWord;
    // var token = 'eyJleHBpcmVUaW1lIjoxNDgyMDkzMDE3NzQ0LCJ1c2VySWQiOjMzNjM4fQ.dE6_3PMDD706p374TUE07Y2BHyCccPdg_hqbTQJwBMhXjMuGgBX6lM7iR__NoREGCpGv67o06gSrlCIPR6OwxxfptbGPAaiMhHZyv2pd5nsEBgfMxe-A_I_7YRmfw1X7ihMb2GduwNtmcLPaSrHK56RGRux2r7S1aLIzacFiCRk1SX_XKjtppzWKprDnoRhGoiPTNF5vrBusxAFup3jjwH3plWwZAL1SHLQh9U7oOvfPQbQ0V_LKBJDBiPba82lahvRAnGf_eHsx4VzQVHPh9Ny-gkh7kH-xsqqYHE34ObgPuhasFOSmOw6sLjsvuwPTO1Zyp0qkbbPvbN4B7-qxDg';
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data = JSON.parse(xhr.responseText);
        var profile = data.result;
        // localStorage.setItem('profileLS', profile);
        // console.log("localStorage['profileLS']: ", localStorage['profileLS']);
        StarmeupAddonFacebook.addProfile(profile);

        // chrome.storage.local.set({
        //   'logged': true
        // }, function(){
        //   if(StarmeupAddonFacebook.isVisible === false){
        //     StarmeupAddonFacebook.isVisible = true;
        //     console.log('--------------------------------------');
        //     console.log('popup.js');
        //     console.log('profile: ', profile);
        //     // console.log('profile.company: ', profile.organizationName);
        //     // console.log('profile.position: ', profile.job);
        //     // console.log('profile.ofice.name: ', profile.office.name);
        //     // console.log('profile.area: ', profile.area);
        //     // console.log('profile.project: ', profile.project);
        //     // console.log('profile.account: ', profile.account);
        //
        //     StarmeupAddonFacebook.addProfile(profile);
        //   }
        // });
      }else{
        // alert('Error');
        // console.log('Error');
      }
    }
    xhr.send();

  });
};
