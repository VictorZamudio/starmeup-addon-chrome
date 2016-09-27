/*content.js*/
console.log('CONTENT.JS');
var StarmeUpAddonChromeContent = StarmeUpAddonChromeContent || {};

StarmeUpAddonChromeContent.enabledLogger = true;

StarmeUpAddonChromeContent.getLogger = function(name){
  if (StarmeUpAddonChromeContent.enabledLogger) {
    return {
          debug: console.log.bind(console, '[' + name + ']: '),
          log: console.log.bind(console, '[' + name + ']: '),
          info: console.info.bind(console, '[' + name + ']: '),
          warn: console.warn.bind(console, '[' + name + ']: '),
          error: console.error.bind(console, '[' + name + ']: ') };
  } else {
    var dummyFunction = function() {};
    return {
          debug: dummyFunction,
          log: dummyFunction,
          info: dummyFunction,
          warn: dummyFunction,
          error: dummyFunction };
  }

};

StarmeUpAddonChromeContent.findUserSMU = function(userName, element){
  var locateUserSMU = new XMLHttpRequest();
  var url = 'https://qa.starmeup.com/starmeup-api/v2/smart/locateusers?searchString=' + userName;
  console.log('url: ', url);
  var token = localStorage.getItem('TokenUserSMULogged');
  locateUserSMU.open('GET', url, true);
  locateUserSMU.setRequestHeader('TOKEN', token);
  locateUserSMU.onreadystatechange = function(){
    if (locateUserSMU.readyState == 4) {
      var data = JSON.parse(locateUserSMU.responseText);
      if (data.result.length > 0) {
        console.log('dataUserFB: ', data);
        localStorage.setItem('ProfileUsersSMU', JSON.stringify(data.result));
        for (var i = 0; i < data.result.length; i++) {
          if (userName === data.result[i].firstName + ' ' + data.result[i].lastName) {
            console.log(data.result[i].firstName + ' ' + data.result[i].lastName);
            StarmeUpAddonChromeContent.renderProfile(data.result[i], element);
          }else{
            // console.log(i);
            // console.log(data.result.length);
            // console.log(i >= (data.result.length -1) );
            console.warn('The SMU user "' + data.result[i].firstName + ' ' + data.result[i].lastName + '" doesn\'t match with the Facebook user "' + userName + '"');
            // if (i >= (data.result.length -1) ) {
            //   console.log('**************************************');
            //   console.warn('No SMU users match the Facebook user "' + userName + '"');
            // }
          }
        }
        // console.log();
      }else{
        console.warn('No SMU users that match the Facebook user');
      }
    }
  };
  locateUserSMU.send();
};

StarmeUpAddonChromeContent.renderProfile = function(profile, element){
  console.log(element);

  switch(element){
    case '#pagelet_welcome_box':
    var profileUserLogged = JSON.parse(localStorage['ProfileUserSMULogged']);
    if ($('#StarmeUpAddonChromeContent').length === 0) {
      $('#pagelet_welcome_box').after('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profileUserLogged.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profileUserLogged.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profileUserLogged.office.name+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profileUserLogged.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profileUserLogged.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profileUserLogged.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
    }else{
      console.warn('The profile has been added');
    }
    break;

    case '#fbProfileCover':
    if ($('#StarmeUpAddonChromeContent').length === 0) {
      $('#fbProfileCover').after('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.organizationOfficeName+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
      console.info('The profile has added succesfully in #fbProfileCover :)');
    }else{
      console.warn('The profile has been added');
    }
    break;

    case '#pagelet_escape_hatch':
    if ($('#StarmeUpAddonChromeContent').length === 0) {
      $('#pagelet_escape_hatch').before('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.organizationOfficeName+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
      console.info('The profile has added succesfully in #pagelet_escape_hatch :)');
    }else{
      console.warn('The profile has been added');
    }
    break;

    case '#pagelet_pymk_timeline':
    if ($('#StarmeUpAddonChromeContent').length === 0) {
      $('#pagelet_pymk_timeline').before('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.organizationOfficeName+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
      console.info('The profile has added succesfully in #pagelet_escape_hatch :)');
    } else{
      console.warn('The profile has been added');
    }
    break;
  }



};


StarmeUpAddonChromeContent.render = function(){
  var logger = StarmeUpAddonChromeContent.getLogger('Rendering');
  var pagelet_welcome_box = $('#pagelet_welcome_box');
  var profile = JSON.parse(localStorage['profileLS']);
  /**/
  profile.office.name += ' - Buenos Aires, ARG';

  if (profile.job === '') {
    profile.job = 'Web UI Developer';
  }
  if (profile.account === '') {
    profile.account = 'Johnson & Johnson';
  }
  /**/
  if ($('#pagelet_welcome_box').length === 0) {
    logger.error('Can\'t find element container');
    return false;
  }else{
    // logger.log('pagelet_welcome_box: ', pagelet_welcome_box);
    if ($('#StarmeUpAddonChromeContent').length === 0) {
      $('#pagelet_welcome_box').after('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.office.name+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
      logger.info('StarmeUpAddonChromeContent added :)');
    }else{
      logger.warn('StarmeUpAddonChromeContent already added :(|)');
    }
    return true;
  }

};

StarmeUpAddonChromeContent.remove = function () {
  var logger = StarmeUpAddonChromeContent.getLogger('Remove Profile');
  $('#StarmeUpAddonChromeContent').slideUp(function(){
    $('#StarmeUpAddonChromeContent').remove();
    localStorage.removeItem('profileLS');
    localStorage.removeItem('profile_loaded');
    logger.info('StarmeUpAddonChromeContent removed');
  });
};

StarmeUpAddonChromeContent.renderElements = function(elements){
  var profileUserLogged = JSON.parse(localStorage['ProfileUserSMULogged']);
  var profile = profileUserLogged;

  console.log(elements);
  var numElements = elements.length;
  for (var i = 0; i < numElements; i++) {
    // $(elements[i]).hide();
    // console.log(elements[i]);
    switch(elements[i]){
      case '#pagelet_welcome_box':
      if ($('#StarmeUpAddonChromeContent').length === 0) {
        $('#pagelet_welcome_box').after('<div id="StarmeUpAddonChromeContent"></div>');
        $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profileUserLogged.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profileUserLogged.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profileUserLogged.office.name+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profileUserLogged.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profileUserLogged.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profileUserLogged.account+'</span><br></div>');
        $('#StarmeUpAddonChromeContent').slideDown();
      }
      break;

      case '#fbProfileCover':
      $('#fbProfileCover').after('<div id="StarmeUpAddonChromeContent"></div>');
      $('#StarmeUpAddonChromeContent').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.office.name+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#StarmeUpAddonChromeContent').slideDown();
      break;
    }
  }



};

StarmeUpAddonChromeContent.lookUpRenderElements = function(elements){
  var numElements = elements.length;

  var elements_str = elements.splice(',').join(', ');
  var elements_found = $('body').find($(elements_str));
  var elements_arr = elements_str.split(', ');

  // console.info('elements_found: ', elements_found);
  // console.log('Elements Arr: ', elements_arr);
  // console.log('Elements found: ', elements_found);
  // console.log('typeof elements_found: ', typeof elements_found);
  // console.log('elements_found.length: ', elements_found.length);

  if (elements_found.length > 0) {
    // var numElements = elements_found.length;
    // console.log('***********************');
    // console.log('elements.length: ', elements.length);
    for (var i = 0; i < elements_found.length; i++) {
      // console.warn(elements_found[i].id);
      // $(elements[i]).hide();
      switch(elements_found[i].id){
        case 'pagelet_welcome_box':
        var userName = $('#pageTitle').text();
        var element = '#pagelet_welcome_box';
        // alert('hi' + userName);
        StarmeUpAddonChromeContent.findUserSMU(userName, element);

        break;

        // case '#fbProfileCover':
        case 'pagelet_escape_hatch':
        var userName = $('#pageTitle').text();
        var element = '#pagelet_escape_hatch';
        // alert('hi' + userName);
        StarmeUpAddonChromeContent.findUserSMU(userName, element);
        break;

        case 'pagelet_pymk_timeline':
        var userName = $('#pageTitle').text();
        var element = '#pagelet_pymk_timeline';
        // alert('hi' + userName);
        StarmeUpAddonChromeContent.findUserSMU(userName, element);
        break;
      }
    }
    // StarmeUpAddonChromeContent.renderElements(elements_found);
  }else{
    console.warn('Cant find elements to render');
  }


};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('onMessage');
  console.log('message: ', message);

  switch(message.type){
    case 'profile':
      // console.log('message.profile');
      var profile_str = JSON.stringify(message.profile);
      localStorage.setItem('profile_loaded', true);
      localStorage.setItem('profileLS', profile_str);UserLogged
      StarmeUpAddonChromeContent.render();
    break;

    case 'load':
      // console.log('message.page_loaded');
      // console.log("localStorage['profileLS']: ", localStorage['profileLS']);
      if ('profileLS' in localStorage) {
        StarmeUpAddonChromeContent.render();
      }
      if ('UserSMUIsLogged' in localStorage) {
        StarmeUpAddonChromeContent.lookUpRenderElements(['#pagelet_welcome_box', '#pagelet_pymk_timeline', '#pagelet_escape_hatch']);
      }
    break;

    case 'remove':
      // console.log('message.remove');
      StarmeUpAddonChromeContent.remove();
    break;

    // from authenticateUserSMU
    case 'userLogged':
      // console.log(message.profileUserSMULogged);
      // console.log(message.token);
      localStorage.setItem('UserSMUIsLogged', 'true');
      localStorage.setItem('TokenUserSMULogged', message.token);
      localStorage.setItem('ProfileUserSMULogged', JSON.stringify(message.profileUserSMULogged));
      // StarmeUpAddonChromeContent.renderElements([
      //   {'element':'#pagelet_welcome_box', 'type':'profileUser'},
      //   {'element': '#fbProfileCover', 'type':'profileUserFB'},
      //   {'element': '#pagelet_escape_hatch', 'type':'profileUserFB'}
      // ]);
      StarmeUpAddonChromeContent.lookUpRenderElements(['#pagelet_welcome_box', '#pagelet_pymk_timeline', '#pagelet_escape_hatch']);
    break;

  }

});
