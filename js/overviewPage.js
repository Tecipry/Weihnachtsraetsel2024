function codesButtonHandling() {
   code = document.getElementById('inputField').value;
   
   if (code == "") {
      return;
   }
   
   window.location.href = "./codes.html?code=" + code;
}