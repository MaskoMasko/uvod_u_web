// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("uredi_studenta");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function validateLogin() {
  // Dohvaćanje unesenih vrijednosti korisničkog imena i lozinke
  var username = document.getElementsByName('username')[0].value;
  var password = document.getElementsByName('password')[0].value;

  // Provjera korisničkog imena i lozinke
  if (username === "admin" && password === "admin") {
      // Ako su korisničko ime i lozinka ispravni, preusmjeri na dashboard.html
      window.location.href = "dashboard.html";
  } else {
      // Inače, ispiši poruku upozorenja
      alert("Pogrešno korisničko ime ili lozinka. Molimo pokušajte ponovo.");
  }
}

function addEntry() {
  var firstName = document.getElementById("ime").value; 
  var lastName = document.getElementById("prezime").value; 

  var table = document.getElementById("table")
  var newRow = table.insertRow(table.rows.length); 
  var cellFirstName = newRow.insertCell(); 
  var cellLastName = newRow.insertCell(); 
  var cellActions = newRow.insertCell(); 
  cellFirstName.innerHTML = firstName; 
  cellLastName.innerHTML = lastName; 
  cellActions.innerHTML = ' <img id="uredi_studenta" src="./assets/Edit_fill.svg" alt="Edit" width="20" height="20"><img src="./assets/Trash.svg" alt="Trash" width="20" height="20">'; 
  }
// Deklaracija globalne varijable selectedRow
var selectedRow;

function editRow(button) {
  // Postavljanje selectedRow na roditeljski redak gumba koji je kliknut
  // (roditelj gumba je redak u tablici)
  selectedRow = button.parentNode.parentNode;

  // Postavljanje vrijednosti unesenih imena i prezimena iz odabranog reda u odgovarajuća input polja za uredivanje
  document.getElementById("ime").value = selectedRow.cells[0].innerHTML;
  document.getElementById("prezime").value = selectedRow.cells[1].innerHTML;

  // Prikazivanje modala za uređivanje (postavljanje display-a na "block")
  document.getElementById("editModal").style.display = "block";
}

function saveChanges() {
  // Postavljanje vrijednosti unesenih imena i prezimena iz input polja za uređivanje u odabrani redak u tablici
  selectedRow.cells[0].innerHTML = document.getElementById("ime").value;
  selectedRow.cells[1].innerHTML = document.getElementById("prezime").value;

  closeModal();
}

function closeModal() {
  // Zatvaranje moda (postavljanje display-a na "none")
  document.getElementById("editModal").style.display = "none";
}
function deleteRow() {
  // Provjerite je li odabran redak za brisanje
  if (selectedRow) {
      // Pronađite roditeljski element reda i uklonite ga iz tablice
      selectedRow.parentNode.removeChild(selectedRow);
      // Očistite referencu na odabrani redak
      selectedRow = null;
  } else {
      // Ako nema odabranog reda, ispišite poruku ili poduzmite odgovarajuće radnje
      console.log("Nema odabranog reda za brisanje.");
  }
}

function searchTable() {
  // Dohvati potrebne HTML elemente
  var input = document.getElementById("search").value.toUpperCase();
  var table = document.getElementById("table").rows[1];
  var rows = table.getElementsByTagName("tr");

  // Iteriraj kroz retke tablice
  for (var i = 0; i < rows.length; i++) {
      var found = false;
      var cells = rows[i].getElementsByTagName("td");
      
      // Ignoriraj redove zaglavlja tablice
      if (!rows[i].classList.contains('header')) {
          // Iteriraj kroz ćelije u retku
          for (var j = 0; j < cells.length; j++) {
              var cell = cells[j];
              // Provjeri sadrži li tekst koji je korisnik unio u polje za pretragu
              if (cell) {
                  var textValue = cell.textContent || cell.innerText;
                  if (textValue.toUpperCase().indexOf(input) > -1) {
                      found = true;
                      break;
                  }
              }
          }
          // Prikazivanje/skrivanje retka ovisno o tome je li pronađen traženi tekst
          rows[i].style.display = found ? "" : "none";
      }
  }
}
