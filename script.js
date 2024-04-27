// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("uredi_studenta");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
  var firstName = document.getElementById("add-ime").value; 
  var lastName = document.getElementById("add-prezime").value; 

  var table = document.getElementById("table")
  var newRow = table.insertRow(table.rows.length); 
  var cellFirstName = newRow.insertCell(); 
  var cellLastName = newRow.insertCell(); 
  var cellActions = newRow.insertCell(); 
  cellFirstName.innerHTML = firstName; 
  cellLastName.innerHTML = lastName; 
  cellActions.innerHTML = ' <div class="th-akcije"><img id="uredi_studenta" onclick="editRow(this)" src="./assets/Edit_fill.svg" alt="Edit" width="20" height="20"><img src="./assets/Trash.svg" onclick="deleteRow(this)" alt="Trash" width="20" height="20"></div>'; 
  }
// Deklaracija globalne varijable selectedRow
var selectedRow;

function editRow(button) {
  selectedRow = button.parentNode.parentNode.parentNode;

  // Postavljanje vrijednosti unesenih imena i prezimena iz odabranog reda u odgovarajuća input polja za uredivanje
  document.getElementById("edit-ime").value = selectedRow.cells[0].innerHTML;
  document.getElementById("edit-prezime").value = selectedRow.cells[1].innerHTML;

  // Prikazivanje modala za uređivanje (postavljanje display-a na "block")
  document.getElementById("modal").style.display = "block";
}

function saveChanges() {
  // Postavljanje vrijednosti unesenih imena i prezimena iz input polja za uređivanje u odabrani redak u tablici
  selectedRow.cells[0].innerHTML = document.getElementById("edit-ime").value;
  selectedRow.cells[1].innerHTML = document.getElementById("edit-prezime").value;

  closeModal();
}

function closeModal() {
  // Zatvaranje moda (postavljanje display-a na "none")
  document.getElementById("modal").style.display = "none";
}
function deleteRow(button) {
  // Provjerite je li odabran redak za brisanje
  if (selectedRow) {
      // Pronađite roditeljski element reda i uklonite ga iz tablice
      selectedRow.parentNode.removeChild(selectedRow);
      // Očistite referencu na odabrani redak
      selectedRow = null;
  } else {
      selectedRow = button.parentNode.parentNode.parentNode;
      selectedRow.parentNode.removeChild(selectedRow);
      selectedRow = null;
  }
}

function searchTable() {
  // Dohvati potrebne HTML elemente
  var input = document.getElementById("search").value.toUpperCase();
  var table = document.getElementById("table").rows[1];
  var rows = table.getElementsByTagName("tr");

  // Iteriraj kroz retke tablice
  for (var i = 0; i < rows.length+1; i++) {
    var found = false;
    var cells = rows[i].getElementsByTagName("td");
    console.log("im here")
    // Check if it's not the header row
      // Iterate through each cell in the current row
      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        // Get the text content of the cell and convert it to uppercase for comparison
        var textValue = cell.textContent || cell.innerText;
        // Check if the cell's text content contains the search input value
        console.log(textValue)
        if (textValue.toUpperCase().indexOf(input) > -1) {
          // If found, set found to true and break the loop
          found = true;
          break;
        }
      }
      // Show/hide the row based on whether the search input value was found
      rows[i].style.display = found ? "" : "none";
  }
}
