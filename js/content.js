console.log('StarmeupAddonFacebook: ', StarmeupAddonFacebook);
// alert($('#u_0_3'));
// $('#u_0_3').on('click', function(e){
//   alert('hi');
//   console.clear();
//   console.log('Click INICIO', e.target);
// });

if (localStorage.getItem('profile') != null) {
  console.log(localStorage['profile']);
  // var profileJSON = JSON.parse(localStorage['profile']);
  // console.clear();
  console.log('StarmeupAddonFacebook.profile: ', localStorage['profile']);
  // console.log('profileJSON: ', profileJSON);
  // alert('StarmeupAddonFacebook.profile: ' + localStorage['profile']);
  // alert('profileJSON: ' + profileJSON);
  // var _lsFBSMU_profile = JSON.stringify(localStorage['profile']);
  // console.log('_lsFBSMU_profile: ', _lsFBSMU_profile);

  // document.addEventListener('DOMContentLoaded', function () {
  //   // document.location.reload();
  // });


  // $('#u_0_3').on('click', function(e){
  //   document.location.reload(true);
  //   // alert('hi');
  //   // console.clear();
  //   console.log('Click INICIO', e.target);
  //   // return;
  //   // StarmeupAddonFacebook.render(profileJSON);
  //   if (document.location.hostname == 'https://www.facebook.com/') {
  //     alert(document.location.hostname);
  //
  //   }
  // });
}

chrome.storage.local.get(['logged', 'profile'], function(data){
  // StarmeupAddonFacebook.render(data.profile);
  console.log('DATA PROFILE: ', data);
  if(data.logged === true && data.profile !== null){
    var profile = data.profile;
    var profileLS = JSON.stringify(profile);
    // StarmeupAddonFacebook.profile = localStorage.setItem('profile', profile);
    StarmeupAddonFacebook.profile = localStorage.setItem('profile', profileLS);
    // document.location.reload();
    console.log('-------------------------');
    console.log('profile: ', data);
    console.log('data.profile: ', data.profile);
    console.log('profile: ', profile);
    // return;
    // StarmeupAddonFacebook.addProfile(profile);
    StarmeupAddonFacebook.render(profile);
    // $('#pagelet_welcome_box').after('<div><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong style="text-align:center">StarmeUp</strong><br><br><strong>Office:</strong> '+data.profile.office+'<br><strong>Area:</strong> '+data.profile.area+'<br><strong>Project:</strong> '+data.profile.project+'<br><br></div>');
  }
});

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.remove === true) {
    StarmeupAddonFacebook.remove();
  }else{
    // document.location.reload();

    var profile = message.profile;
    console.log('-----------------------------------');
    console.log('hi from content.js');
    console.log('The message from content.js is: ', message);
    // console.log('profile.company: ', profile.organizationName);
    // console.log('profile.position: ', profile.job);
    // console.log('profile.ofice.name: ', profile.office.name);
    // console.log('profile.area: ', profile.area);
    // console.log('profile.project: ', profile.project);
    // console.log('profile.account: ', profile.account);

    StarmeupAddonFacebook.render(profile);
  }
});
