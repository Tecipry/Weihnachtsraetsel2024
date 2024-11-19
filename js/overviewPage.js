function codesButtonHandling() {
   code = document.getElementById("inputField").value;

   if (code == "") {
      return;
   }

   window.location.href = "./codes.html?code=" + code;
}



function setCookie(name, value, expirationDays) {
   const date = new Date();
   date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // days to milliseconds
   const expires = "expires=" + date.toUTCString();
   document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
   const cookies = document.cookie.split('; ');
   for (let i = 0; i < cookies.length; i++) {
       const [key, value] = cookies[i].split('=');
       if (key === name) {
           return decodeURIComponent(value);
       }
   }
   return null; // Return null if cookie is not found
}

function deleteCookie(name) {
   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



function setRiddleBoxStatus() {
   console.log("loading setRiddleBoxStatus");

   // cookies to store state of the riddle Boxes
   riddleBoxesSolved = {
      riddleBoxRed: false,
      riddleBoxGreen: false,
      riddleBoxYellow: false,
      riddleBoxOrange: false,
   };

   riddleBoxesStatus = getCookie("riddleBoxesStatus");
   if (riddleBoxesStatus != null) {
      riddleBoxesSolved = JSON.parse(riddleBoxesStatus);
   } else {
      setCookie("riddleBoxesStatus", JSON.stringify(riddleBoxesSolved), 365);
   }

   riddleBoxRed_Span = document.getElementById("riddleBoxRed_Span");
   riddleBoxGreen_Span = document.getElementById("riddleBoxGreen_Span");
   riddleBoxYellow_Span = document.getElementById("riddleBoxYellow_Span");
   riddleBoxOrange_Span = document.getElementById("riddleBoxOrange_Span");

   riddleBoxRed_Span.innerHTML = riddleBoxesSolved.riddleBoxRed ? "1" : "?";
   riddleBoxGreen_Span.innerHTML = riddleBoxesSolved.riddleBoxGreen ? "1" : "?";
   riddleBoxYellow_Span.innerHTML = riddleBoxesSolved.riddleBoxYellow ? "1" : "?";
   riddleBoxOrange_Span.innerHTML = riddleBoxesSolved.riddleBoxOrange ? "1" : "?";
}

function clearRiddleBoxCookies() {
   deleteCookie("riddleBoxesStatus");
}
