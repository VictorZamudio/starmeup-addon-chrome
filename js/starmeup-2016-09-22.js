// $('#pagelet_welcome_box ul').append('<li><img src="/img/logo-login.png" width="24" height="24" />StarmeUp</li><li><strong>Office: </strong>My Office</li>');

var StarmeupAddonFacebook = StarmeupAddonFacebook || {};
StarmeupAddonFacebook.enabledLogger = true;
StarmeupAddonFacebook.isLogged = false;
StarmeupAddonFacebook.office = null;
StarmeupAddonFacebook.area = null;
StarmeupAddonFacebook.project = null;
StarmeupAddonFacebook.port = null;

// console.log(StarmeupAddonFacebook.isLogged);
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
  // var profileStarmeup = JSON.parse('{profile: profile}');

  // alert(profile);
  // console.log(profile.project);
  // console.log(profile.office);
  // console.log(profile.office.name);
  // var container = $('pagelet_welcome_box ul');
  // console.log('container: ', container);
  // $('#pagelet_welcome_box ul').append('<li><img src="/img/logo-login.png" width="24" height="24" />StarmeUp</li><li><strong>Area: </strong>'+ profile.area + '</li>');
  // localStorage.setItem('office', profile.project);
  // localStorage.setItem('area', profile.area);
  // localStorage.setItem('project', profile.office.name);
  //
  // StarmeupAddonFacebook.office = localStorage['office'];
  // StarmeupAddonFacebook.area = localStorage['area'];
  // StarmeupAddonFacebook.project = localStorage['project'];
  //
      // chrome.tabs.executeScript(null, {file: "js/content.js"});


  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.sendMessage(tab.id, {'company': profile.organizationName, 'position': 'Web UI developer', 'office': profile.office.name, 'area': profile.area, 'project': profile.project, 'account': profile.account });
  });

  // if (StarmeupAddonFacebook.isLooged === true) {
  //   chrome.tabs.getSelected(null, function(tab){
  //     chrome.tabs.sendMessage(tab.id, {'area': area, 'project': project, 'office': office});
  //   });
  //   // alert(JSON.stringify(profile));
  //   // console.log(localStorage['area']);
  // }

  // chrome.tabs.getSelected(null, function(tab){
  //   $('body').html('<h1>Test Chrome Extension</h1>');
  // });


      // StarmeupAddonFacebook.render(area, project, office);

};

StarmeupAddonFacebook.render = function(profile){
  console.log('render says', profile);
  // console.log(area);
  // chrome.tabs.getSelected(null, function(tab){
  //   chrome.tabs.sendMessage(tab.id, {'area': 'Web UI Developer', 'project': 'StarmeUp', 'office': 'Mexico'});
  // });

  $('#pagelet_welcome_box').after('<div><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong style="text-align:center">STARMEUP PROFILE</strong><br><strong>Company:</strong>'+profile.company+'<strong>Position:</strong>'+profile.position+'<br><strong>Office:</strong> '+profile.office+'<br><strong>Area:</strong> '+profile.area+'<br><strong>Project:</strong> '+profile.project+'<br><strong>Account:</strong>'+profile.account+'<br></div>');

};


StarmeupAddonFacebook.Frame = function(){

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
    starmeupFrame.addProfile(StarmeupAddonFacebook.profile);
    return true;
  }


};

// StarmeupAddonFacebook.decorateFacebook();
console.log('hi from starmeup.js');
// console.log('StarmeupAddonFacebook: ', StarmeupAddonFacebook);
console.log(localStorage['Area']);
console.log(localStorage['Project']);
console.log(localStorage['Office']);
