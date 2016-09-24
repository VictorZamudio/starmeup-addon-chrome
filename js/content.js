/*content.js*/
console.log('CONTENT.JS');

var StarmeupAddonFacebook = StarmeupAddonFacebook || {};
StarmeupAddonFacebook.enabledLogger = true;

StarmeupAddonFacebook.getLogger = function(name){
  if (StarmeupAddonFacebook.enabledLogger) {
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

StarmeupAddonFacebook.render = function(){
  var logger = StarmeupAddonFacebook.getLogger('Rendering');
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
    if ($('#starmeUpAddonFacebook').length === 0) {
      $('#pagelet_welcome_box').after('<div id="starmeUpAddonFacebook"></div>');
      $('#starmeUpAddonFacebook').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br><span>'+profile.organizationName+'</span><br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br><span>'+profile.job+'</span><br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br><span>'+profile.office.name+'</span><br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br><span>'+profile.area+'</span><br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br><span>'+profile.project+'</span><br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br><span>'+profile.account+'</span><br></div>');
      $('#starmeUpAddonFacebook').slideDown();
      logger.info('StarmeupAddonFacebook added :)');
    }else{
      logger.warn('StarmeupAddonFacebook already added :(|)');
    }
    return true;
  }

};

StarmeupAddonFacebook.remove = function () {
  var logger = StarmeupAddonFacebook.getLogger('Remove Profile');
  $('#starmeUpAddonFacebook').slideUp(function(){
    $('#starmeUpAddonFacebook').remove();
    localStorage.removeItem('profileLS');
    localStorage.removeItem('profile_loaded');
    logger.info('StarmeupAddonFacebook removed');
  });
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // console.log('onMessage');
  // console.log('message: ', message);

  switch(message.type){
    case 'profile':
      // console.log('message.profile');
      var profile_str = JSON.stringify(message.profile);
      localStorage.setItem('profile_loaded', true);
      localStorage.setItem('profileLS', profile_str);
      StarmeupAddonFacebook.render();
    break;

    case 'load':
      // console.log('message.page_loaded');
      // console.log("localStorage['profileLS']: ", localStorage['profileLS']);
      if ('profileLS' in localStorage) {
        StarmeupAddonFacebook.render();
      }
    break;

    case 'remove':
      // console.log('message.remove');
      StarmeupAddonFacebook.remove();
    break;

  }

});
