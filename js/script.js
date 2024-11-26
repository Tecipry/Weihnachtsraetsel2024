function loadNavBar() {
   const navBarDiv = document.getElementById("navBarDiv");
   navBarDiv.innerHTML = `
      <nav>
         <ul style="list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: var(--hunter_green);border: 4px solid var(--tea_green)">
            <li style="float: left">
               <a href="./overviewPage.html" style="display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none">zurück zur Overview</a>
            </li>
         </ul>
      </nav>
   `;
}