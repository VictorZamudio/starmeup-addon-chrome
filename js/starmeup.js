var StarmeupAddonFacebook = StarmeupAddonFacebook || {};
StarmeupAddonFacebook.enabledLogger = true;

StarmeupAddonFacebook.getLogger = function(name){
  if (StarmeupAddonFacebook.enabledLogger) {
    // alert('StarmeupAddonFacebook.enabledLogger: ' + StarmeupAddonFacebook.enabledLogger);
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

StarmeupAddonFacebook.addProfile = function(profile){
  chrome.storage.local.set({
    'profile': profile
  }, function(){
      // StarmeupAddonFacebook.addProfile(profile);
      console.log('-----------------');
      console.log('addProfile');
      console.log('profile: ', profile);
      console.log('profile: ', profile.office.name);
      chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {'profile': profile});
        // chrome.tabs.sendMessage(tab.id, {'company': profile.organizationName, 'position': profile.job, 'office': profile.office.name, 'area': profile.area, 'project': profile.project, 'account': profile.account });
      });
  });


};

StarmeupAddonFacebook.render = function(msg){
  var logger = StarmeupAddonFacebook.getLogger('Rendering');
  var pagelet_welcome_box = $('#pagelet_welcome_box');
  var profile = msg;

  if (profile.job === '') {
    profile.job = 'Web UI Developer';
  }
  if (profile.account === '') {
    profile.account = 'Johnson & Johnson';
  }

  if ($('#pagelet_welcome_box').length === 0) {
    logger.error('Can not find element container');
    return false;
  }else{
    logger.log('pagelet_welcome_box: ', pagelet_welcome_box);

    if ($('#starmeUpAddonFacebook').length === 0) {
      // var container = $('#starmeUpAddonFacebook');
      $('#pagelet_welcome_box').after('<div id="starmeUpAddonFacebook"></div>');
      $('#starmeUpAddonFacebook').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> <strong>ORGANIZATION</strong><br>'+profile.organizationName+'<br><i class="fa fa-user" aria-hidden="true"></i> <strong>POSITION</strong><br>'+profile.job+'<br><i class="fa fa-map-marker" aria-hidden="true"></i> <strong>LOCATION</strong><br>'+profile.office.name+'<br><i class="fa fa-briefcase" aria-hidden="true"></i> <strong>AREA</strong><br>'+profile.area+'<br><i class="fa fa-suitcase" aria-hidden="true"></i> <strong>PROJECT</strong><br>'+profile.project+'<br><i class="fa fa-folder-open" aria-hidden="true"></i>  <strong>ACCOUNT</strong><br>'+profile.account+'</div>');
      // $('#starmeUpAddonFacebook').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><i class="fa fa-institution" aria-hidden="true"></i> '+profile.organizationName+'<br><i class="fa fa-user" aria-hidden="true"></i> '+profile.job+'<br><i class="fa fa-map-marker" aria-hidden="true"></i> '+profile.office.name+'<br><i class="fa fa-briefcase" aria-hidden="true"></i>  '+profile.area+'<br><i class="fa fa-suitcase" aria-hidden="true"></i> '+profile.project+'<br><i class="fa fa-folder-open" aria-hidden="true"></i>  '+profile.account+'</div>');
      // $('#starmeUpAddonFacebook').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><strong>Company:</strong> '+profile.organizationName+'<br><strong>Position:</strong> '+profile.job+'<br><strong>Office: </strong> '+profile.office.name+'<br><strong>Area:</strong> '+profile.area+'<br><strong>Project:</strong> '+profile.project+'<br><strong>Account: </strong> '+profile.account+'</div>');
      // $('#starmeUpAddonFacebook').hide().append('<div id="smuAddonFBHeader"><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong>Starmeup Profile</strong></div><div id="smuAddonFBBody"><strong>Company</strong><br>'+profile.organizationName+'<br><strong>Position</strong>'+profile.job+'<br><strong>Office</strong><br>'+profile.office.name+'<br><strong>Area</strong><br>'+profile.area+'<br><strong>Project</strong><br>'+profile.project+'<br><strong>Account</strong><br>'+profile.account+'</div>');
      // $('#starmeUpAddonFacebook').hide().append('<img src="https://qa.starmeup.com/assets/img/favicon.ico" width="24" height="24" /> <strong style="text-align:center">Starmeup Profile</strong><br><strong>Company:</strong> '+profile.organizationName+'<br><strong>Position:</strong> '+profile.job+'<br><strong>Office:</strong> '+profile.office.name+'<br><strong>Area:</strong> '+profile.area+'<br><strong>Project:</strong> '+profile.project+'<br><strong>Account:</strong> '+profile.account+'<br><br>');
      $('#starmeUpAddonFacebook').slideDown();
      logger.info('StarmeupAddonFacebook added :)');
    }else{
      logger.warn('StarmeupAddonFacebook already added :(|)');
    }
    // var starmeupFrame = new StarmeupAddonFacebook.Frame(container);
    // starmeupFrame.addProfile(StarmeupAddonFacebook.profile);
    return true;
  }

    console.log('---------------------------------');
    console.log('render says', profile);
    console.log(msg);
    // return;
    // console.log('profile.company: ', profile.organizationName);
    // console.log('profile.position: ', profile.job);
    // console.log('profile.ofice.name: ', profile.office.name);
    // console.log('profile.area: ', profile.area);
    // console.log('profile.project: ', profile.project);
    // console.log('profile.account: ', profile.account);
};

StarmeupAddonFacebook.remove = function () {
  var logger = StarmeupAddonFacebook.getLogger('Remove Addon');
  $('#starmeUpAddonFacebook').slideUp(function(){
    $('#starmeUpAddonFacebook').remove();
    localStorage.removeItem('profileLS');
    localStorage.removeItem('profile_loaded');
    logger.info('StarmeupAddonFacebook removed');
    // StarmeupAddonFacebook.isVisible = false;
  });
};

StarmeupAddonFacebook.decorateFacebook = function(){
  var logger = StarmeupAddonFacebook.getLogger('Amazing Facebook Addon');
  logger.debug('decorateFacebook');

  var container = $('#pagelet_welcome_box ul');

  if (container === null) {
    logger.debug('Can not find element container');
    return false;
  }else{
    logger.log('container: ', container);
    var starmeupFrame = new StarmeupAddonFacebook.Frame(container);
    // starmeupFrame.addProfile(StarmeupAddonFacebook.profile);
    return true;
  }
};
