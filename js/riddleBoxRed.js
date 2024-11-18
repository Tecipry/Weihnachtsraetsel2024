function create7x7Grid() {
   console.log("create7x7Grid");
   // create a 7x7 grid of panels
   const panelGrid = document.getElementById('panel-grid');
   for (let i = 0; i < 7; i++) {
      let row = document.createElement('div');
      row.style.display = 'flex';
      for (let j = 0; j < 7; j++) {
         let panel = document.createElement('div');
         panel.className = 'panel';
         panel.style.backgroundColor = 'var(--seafoam_green)';
         panel.addEventListener('click', function() {
            if (this.style.backgroundColor === 'var(--seafoam_green)') {
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