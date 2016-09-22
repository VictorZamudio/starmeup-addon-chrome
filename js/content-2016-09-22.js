// // Developer Tools
// window.onload = function() {
//     var port = chrome.extension.connect({ name: "color-divs-port" });
//     document.getElementById("button").onclick = function() {
//         port.postMessage({ type: "color-divs"});
//     }
// }

// chrome.runtime.onConnect.addListener(function(connectInfo){
//   alert('hi from content.js');
//   // alert('connectInfo: ' + connectInfo);
// });

// console.log('hi from wtf');
// alert('hi from content.js');
// var _starmeup_html =  '<li><i class="fa fa-map-marker" aria-hidden="true"></i> Mexico DF</li>';
// _starmeup_html += '<li><i class="fa fa-briefcase" aria-hidden="true"></i> Web UI Developer</li>';
// _starmeup_html += '<li><i class="fa fa-suitcase" aria-hidden="true"></i> StarMeUp</li>';

// StarmeupAddonFacebook.decorateFacebook();
// $('#pagelet_welcome_box ul').append('<li><img src="/img/logo-login.png" width="24" height="24" />StarmeUp</li><li><strong>Office: </strong>My Office</li>');


console.log('hi from content.js');
console.log('StarmeupAddonFacebook: ', StarmeupAddonFacebook);


chrome.storage.local.get(['logged', 'profile'], function(data){
  if(data.logged === true){
    var profile = data.profile;
    // StarmeupAddonFacebook.addProfile(profile);
    StarmeupAddonFacebook.render(profile);
    // $('#pagelet_welcome_box').after('<div><img src="https://qa.starmeup.com/assets/img/favicon.ico" width="16" height="16" /> <strong style="text-align:center">StarmeUp</strong><br><br><strong>Office:</strong> '+data.profile.office+'<br><strong>Area:</strong> '+data.profile.area+'<br><strong>Project:</strong> '+data.profile.project+'<br><br></div>');
  }
  console.log('data: ', data);
});



// var __area__ = null;
// console.log('__area__: ', localStorage['office']);
// if (StarmeupAddonFacebook.isLogged) {
//   console.log('--------------------');
//   console.log('isLogged');
//   console.log('StarmeupAddonFacebook.area: ', StarmeupAddonFacebook.area);
// }else{
  chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('The message from content.js is: ', message);
    // __area__ = localStorage.setItem('office', 'profile.project');
    StarmeupAddonFacebook.render(message);
  });

// }

// StarmeupAddonFacebook.port.onMessage.addListener(function(msg) {
//   alert('msg from content.js: ' + JSON.stringify(msg));
// });

// console.log(StarmeupAddonFacebook);
// console.log(localStorage['Area']);
// console.log(localStorage['Project']);
// console.log(localStorage['Office']);

// console.log('StarmeupAddonFacebook.profile');
// console.log(StarmeupAddonFacebook.profile);

// $('#pagelet_welcome_box ul').append('<li><i class="fa fa-map-marker" aria-hidden="true"></i> Mexico DF</li><li><i class="fa fa-briefcase" aria-hidden="true"></i> Web UI Developer</li><li><i class="fa fa-suitcase" aria-hidden="true"></i> StarMeUp</li>');
// $('#pagelet_welcome_box ul').append(_starmeup_html);
// return;


// Content Script
// chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  // alert(JSON.stringify(message.leaderboard.result));
  // var _starmeUp_container = $('#pagelet_welcome_box ul');

  // _starmeUp_container.append('<li>Hi User of StarmeUp</li>');
  // _starmeUp_container.innerHTML = 'StarmeUpAddon<br>Show here information about ';

  // var StarmeUpAddon = function(options) {
  //   this.logger = StarmeUp_getLogger('StarmeUpAddon');
  //   this.el = document.createElement('div');
  //
  //   if (options.parentEl.childNodes.length)
  //     options.parentEl.insertBefore(this.el, options.parentEl.childNodes[0]);
  //   else
  //     options.parentEl.appendChild(this.el);
  //   this.addStyles();
  //   this.render();
  // };
  //
  // StarmeUpAddon.prototype.addStyles = function() {
  //   this.el.style.width = '851px';
  //   this.el.style.height = '50px';
  //   this.el.style.border = '1px solid gray';
  //   this.el.style.boxSizing = 'border-box';
  // };
  //
  // StarmeUpAddon.prototype.render = function() {
  //   this.el.innerHTML = 'StarmeUpAddon';
  //
  // };
  //
  // StarmeUpAddon.prototype.lookupUser = function(userName) {
  //   this.el.innerHTML = 'StarmeUpAddon<br>Show here information about ' + userName;
  // };
  //
  //
  //
  // var __starmeUp_enable_logger__ = false;
  //
  // function StarmeUp_getLogger(name) {
  //   if (__starmeUp_enable_logger__) {
  //     return {
  //           debug: console.log.bind(console, '[' + name + ']: '),
  //           log: console.log.bind(console, '[' + name + ']: '),
  //           info: console.info.bind(console, '[' + name + ']: '),
  //           warn: console.warn.bind(console, '[' + name + ']: '),
  //           error: console.error.bind(console, '[' + name + ']: ') };
  //   } else {
  //     var dummyFunction = function() {};
  //     return {
  //           debug: dummyFunction,
  //           log: dummyFunction,
  //           info: dummyFunction,
  //           warn: dummyFunction,
  //           error: dummyFunction };
  //   }
  // }
  //
  // (function () {
  //   function decorateFacebook() {
  //     var logger = StarmeUp_getLogger('StarmeUp-Facebook');
  //
  //     logger.debug('decorateFacebook');
  //
  //     // var parentEl = document.querySelector('div.cover');
  //     var parentEl = document.querySelector('#leftCol');
  //     if (!parentEl) {
  //       logger.debug('Cant find root element');
  //       return false;
  //     }
  //     // var nameEl = document.querySelector('span#fb-timeline-cover-name');
  //     var nameEl = document.querySelector('div#pagelet_welcome_box');
  //     if (!nameEl) {
  //       logger.debug('Cant find name element');
  //       return false;
  //     }
  //     var name = nameEl.innerHTML;
  //     if (!name) {
  //       logger.debug('Cant find user name');
  //       return false;
  //     }
  //
  //     var starmeUp = new StarmeUpAddon({ parentEl: parentEl });
  //     starmeUp.lookupUser(name);
  //     return true;
  //   }
  //
  //   if (document.location.hostname === 'www.facebook.com') {
  //     var logger = StarmeUp_getLogger('StarmeUp-Inject');
  //     try {
  //       var loaded = decorateFacebook();
  //       // Note, if loaded returns "false"
  //     } catch(e) {
  //       logger.error('Error injecting content', e);
  //     }
  //   }
  // })();

  // return;
  // var dataJSON = JSON.parse(message.leaderboard);
  // var items = dataJSON.result;
  // var numItems = items.length;
  // // alert(numItems + '\n' + items);
  // $('body').css('background', 'url("https://www.starmeup.com/assets/img/bg-login.jpg")');
  // $('body').addClass('starmeup');
  // $('#leaderBoard').append('<p><img  class="text-center" src="/img/logoDesktopApp.png" width="150" alt="" /><span class="title"><i class="fa fa-bar-chart fa-1x"></i>Leaderboard</span></p><ul></ul>')
  // // return;
  //
  // for (var i = 0; i < numItems; i++) {
  //   if (i < 3) {
  //     $('#leaderBoard ul').append('<li class="position'+(i+1)+' best"><span class="pn-wrap"><span class="position-number">'+items[i][2]+'</span></span><br><span class="img-wrap"><img src="https://qa.starmeup.com/starmeup-api/v2/image/'+items[i][0].profileImageId+'/0/0/1" width="35" height="35"/></span><strong>'+items[i][0].firstName+' '+items[i][0].lastName+'</strong><br>'+'<em>'+items[i][0].job+'</em><br><span class="stars-wrap"><span class="stars-number">'+items[i][1]+'</span></span></li>');
  //   }else{
  //     $('#leaderBoard ul').append('<li class="position'+(i+1)+'"><span class="pn-wrap"><span class="position-number">'+items[i][2]+'</span></span><br><span class="img-wrap"><img src="https://qa.starmeup.com/starmeup-api/v2/image/'+items[i][0].profileImageId+'/0/0/1" width="35" height="35"/></span><strong>'+items[i][0].firstName+' '+items[i][0].lastName+'</strong><br>'+'<em>'+items[i][0].job+'</em><br><span class="stars-wrap"><span class="stars-number">'+items[i][1]+'</span></span></li>');
  //   }
  // }
  //
  // $('.position11 em').append('Web UI Developer');
  // document.body.style.backgroundColor = '#006c6e';
  // // document.body.style.color = '#fff';
  // // $('#response').html('<h2 class="text-center">Theme Changed <br/>[(o_0)]<br/>u</h2>');
  // // $('#response').append(message.leaderboard.result);
  // // var response = document.body.getElementById('response');
  // // response.innerHTML += 'Theme Changed!!';
  //   // // alert(message.color);
  //   // switch(message.type) {
  //   //     case "color-divs":
  //   //         var divs = document.querySelectorAll("div");
  //   //         var div = document.getElementById('bg');
  //   //         if(divs.length === 0) {
  //   //             alert("There are no any divs in the page.");
  //   //         } else {
  //   //             for(var i=0; i&lt;divs.length; i++) {
  //   //                 divs[i].style.backgroundColor = message.color;
  //   //             }
  //   //         }
  //   //     break;
  //   // }
// });


// var __starmeUp_enable_logger__ = false;
//
// function StarmeUp_getLogger(name) {
//   if (__starmeUp_enable_logger__) {
//     return {
//           debug: console.log.bind(console, '[' + name + ']: '),
//           log: console.log.bind(console, '[' + name + ']: '),
//           info: console.info.bind(console, '[' + name + ']: '),
//           warn: console.warn.bind(console, '[' + name + ']: '),
//           error: console.error.bind(console, '[' + name + ']: ') };
//   } else {
//     var dummyFunction = function() {};
//     return {
//           debug: dummyFunction,
//           log: dummyFunction,
//           info: dummyFunction,
//           warn: dummyFunction,
//           error: dummyFunction };
//   }
// }

// StarmeUp addon. Inject everything into a function, so that we don't mess up global scope
// (function () {
//   function decorateFacebook() {
//     var logger = StarmeUp_getLogger('StarmeUp-Facebook');
//
//     logger.debug('decorateFacebook');
//
//     // var parentEl = document.querySelector('div.cover');
//     var parentEl = document.querySelector('#leftCol');
//     if (!parentEl) {
//       logger.debug('Cant find root element');
//       return false;
//     }
//     // var nameEl = document.querySelector('span#fb-timeline-cover-name');
//     var nameEl = document.querySelector('div#pagelet_welcome_box');
//     if (!nameEl) {
//       logger.debug('Cant find name element');
//       return false;
//     }
//     var name = nameEl.innerHTML;
//     if (!name) {
//       logger.debug('Cant find user name');
//       return false;
//     }
//
//     var starmeUp = new StarmeUpAddon({ parentEl: parentEl });
//     starmeUp.lookupUser(name);
//     return true;
//   }
//
//   if (document.location.hostname === 'www.facebook.com') {
//     var logger = StarmeUp_getLogger('StarmeUp-Inject');
//     try {
//       var loaded = decorateFacebook();
//       // Note, if loaded returns "false"
//     } catch(e) {
//       logger.error('Error injecting content', e);
//     }
//   }
// })();
