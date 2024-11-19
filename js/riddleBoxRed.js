function create7x7Grid() {
   // create a 7x7 grid of panels
   const panelGrid = document.getElementById('panel-grid');

   for (let i = 0; i < 7; i++) {
      let row = document.createElement('div');
      row.className = 'gridRow7x7';

      for (let j = 0; j < 7; j++) {
         let panel = document.createElement('div');
         panel.className = 'panel';
         panel.style.backgroundColor = 'var(--seafoam_green)';

         panel.addEventListener('click', function() {
            if (  this.style.backgroundColor === 'var(--seafoam_green)') {
               this.style.backgroundColor = 'var(--red)';
            } else {
               this.style.backgroundColor = 'var(--seafoam_green)';
            }
         });
         row.appendChild(panel);
      }
      panelGrid.appendChild(row);
   }
}

function getCurrentGridValue() {
   const panelGrid = document.getElementById('panel-grid');
   const rows = panelGrid.children;
   const panels = Array.from(rows).map(
      row => Array.from(row.children).map(
            panel => panel.style.backgroundColor === 'var(--seafoam_green)' ? 0 : 1
         )
      );
   console.log(panels);
}
