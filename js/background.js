// omnibox
// chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
//     suggest([
//       {content: "color-divs", description: "Make everything red"}
//     ]);
// });
// chrome.omnibox.onInputEntered.addListener(function(text) {
//     if(text == "color-divs") colorDivs();
// });
console.log('hi from background.js');
// chrome.runtime.onConnect.addListener(function(starmeupPort) {
//   var __port = JSON.stringify(starmeupPort)
//   alert('Port received: ' + __port);
//   console.log('Por received: ', starmeupPort);
//     if(starmeupPort.name === "starmeup-port"){
//         starmeupPort.onMessage.addListener(function(msg) {
//             console.log('Message from background.js: ', msg);
//         });
//     }
// });

//
// // listening for an event / one-time requests
// // coming from the popup
// console.log('hi from background.js');
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     switch(request.type) {
//         case "color-divs":
//             colorDivs();
//         break;
//         case "starmeup":
//             getApiStarmeup();
//         break;
//     }
//     return true;
// });
//
// // listening for an event / long-lived connections
// // coming from devtools
// chrome.extension.onConnect.addListener(function (port) {
//     port.onMessage.addListener(function (message) {
//         switch(port.name) {
//             case "color-divs-port":
//                 colorDivs();
//             break;
//         }
//     });
// });
//
// // send a message to the content script
// var colorDivs = function() {
//   // alert('hola');
//     chrome.tabs.getSelected(null, function(tab){
//         chrome.tabs.sendMessage(tab.id, {type: "color-divs"});
//         // setting a badge
//         // chrome.browserAction.setBadgeText({text: "BLUE"});
//     });
// };
//
// var getApiStarmeup = function(){
//
// var leaderBoardData = {};
// var date = new Date();
//
// var xhr = new XMLHttpRequest();
// // var url = 'https://qa.starmeup.com/starmeup-api/v2/stellar/leaderboard?organizationValue=0&organizationOffice=0&cityId=0&countryId=0&o=SMU_WEB&v=2&size=10&fromStringDate=0&toStringDate=' + date;
// var url = 'https://qa.starmeup.com/starmeup-api/v2/stellar/leaderboard?organizationValue=0&organizationOffice=0&cityId=0&countryId=0&o=SMU_WEB&v=2&size=10&fromStringDate=0&toStringDate=' + date;
// var token = 'eyJleHBpcmVUaW1lIjoxNDgyMDkzMDE3NzQ0LCJ1c2VySWQiOjMzNjM4fQ.dE6_3PMDD706p374TUE07Y2BHyCccPdg_hqbTQJwBMhXjMuGgBX6lM7iR__NoREGCpGv67o06gSrlCIPR6OwxxfptbGPAaiMhHZyv2pd5nsEBgfMxe-A_I_7YRmfw1X7ihMb2GduwNtmcLPaSrHK56RGRux2r7S1aLIzacFiCRk1SX_XKjtppzWKprDnoRhGoiPTNF5vrBusxAFup3jjwH3plWwZAL1SHLQh9U7oOvfPQbQ0V_LKBJDBiPba82lahvRAnGf_eHsx4VzQVHPh9Ny-gkh7kH-xsqqYHE34ObgPuhasFOSmOw6sLjsvuwPTO1Zyp0qkbbPvbN4B7-qxDg';
// xhr.open('GET', url, true);
// // xhr.setRequestHeader("TOKEN", token);
// // alert(xhr);
// // return;
// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 4) {
//     // innerText does not let the attacker inject HTML elements.
//     // alert(xhr.responseText);
//     // console.log('hi from background.js');
//     leaderBoardData = xhr.responseText;
//     // alert(JSON.stringify(leaderBoardData));
//     // return;
//     chrome.tabs.getSelected(null, function(tab){
//       // alert(JSON.stringify(leaderBoardData));
//       // return;
//         chrome.tabs.sendMessage(tab.id, {type: "starmeup", leaderboard: leaderBoardData});
//         // setting a badge
//         // chrome.browserAction.setBadgeText({text: "BLUE"});
//     });
//
//
//   }else{
//     // alert('Error');
//     console.log('Error');
//   }
// }
// xhr.send();
//
// // return;
//
//
// };
