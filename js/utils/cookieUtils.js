export function setCookie(name, value, expirationDays) {
   const date = new Date();
   date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // days to milliseconds
   const expires = "expires=" + date.toUTCString();
   document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/; SameSite=Lax;";
}

export function getCookie(name) {
   const cookies = document.cookie.split('; ');
   for (let i = 0; i < cookies.length; i++) {
       const [key, value] = cookies[i].split('=');
       if (key === name) {
           return decodeURIComponent(value);
       }
   }
   return null; // Return null if cookie is not found
}

export function deleteCookie(name) {
   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";
}