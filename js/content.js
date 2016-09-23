console.log('CONTENT.JS');

if (localStorage.getItem('profile_loaded') === 'true') {
  // console.log('FIRST CHANCE FAR AWAY');
  // console.log('------------------------------------------------------');
  // console.log("localStorage['profileLS']: ", localStorage['profileLS']);
  var profileJSON = JSON.parse(localStorage['profileLS']);
  StarmeupAddonFacebook.render(profileJSON);
}

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('onMessage');
  console.log('message: ', message);

  switch(message.type){
    case 'profile':
      console.log('message.profile');
      var profile = message.profile;
      var profile_str = JSON.stringify(profile);
      // console.log("localStorage['profileLS']: ", localStorage['profileLS']);
      // console.log('profile.company: ', profile.organizationName);
      // console.log('profile.position: ', profile.job);
      // console.log('profile.ofice.name: ', profile.office.name);
      // console.log('profile.area: ', profile.area);
      // console.log('profile.project: ', profile.project);
      // console.log('profile.account: ', profile.account);
      localStorage.setItem('profile_loaded', true);
      localStorage.setItem('profileLS', profile_str);
      StarmeupAddonFacebook.render(profile);
    break;

    case 'load':
      console.log('message.page_loaded');
      console.log(localStorage['profile']);
    break;

    case 'remove':
      console.log('message.remove');
      StarmeupAddonFacebook.remove();
    break;

  }

});
