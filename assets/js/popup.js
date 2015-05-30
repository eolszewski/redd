$(function () {

  // Binding of buttons to their respective functions
  $("#edit").on('click',toggleEdit);
  $("#save").on('click',toggleSave);
  $("#add").on('click',addPassword);

  // Initialization of the table from localStorage
  for(var i in localStorage)
  {
    var store = localStorage[i].split("pickleberry");
    if(store.length > 2) {
      var row = $("#passTable")[0].insertRow(-1);
      var text = [store[0], store[1], store[2]];

      for (var i = 0; i < 3; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML=text[i];
      }
    }
  }

  // Functions for buttons
  function toggleEdit() {
    var tdArr = $('tr td');
    for (var i = 0; i < tdArr.length; i+=3) {
      tdArr.eq(i+1).attr("contenteditable","true");
      tdArr.eq(i+2).attr("contenteditable","true");
    }

    setHeader("Click on any username or password to edit it", "alert alert-info");

    setTimeout(function() {
      resetHeader();
    }, 2500);
  }

  function toggleSave() {
    tdArr = $("tr td");
    tdArr.attr("contenteditable","false");

    for (var i = 0; i < tdArr.length; i+=3) {
      localStorage.setItem("pickleberry" + tdArr[i].innerHTML, tdArr[i].innerHTML + "pickleberry" + tdArr[i+1].innerHTML + "pickleberry" + tdArr[i+2].innerHTML);
    }

    setHeader("Your changes have been saved.", "alert alert-success");

    setTimeout(function() {
      resetHeader();
    }, 2500);
  }

  function addPassword() {
    var row = $("#passTable")[0].insertRow(-1);
    var text = ["Website", "Username", "Password"];

    for (var i = 0; i < 3; i++) {
      var cell = row.insertCell(i);
      cell.innerHTML = text[i];
      cell.setAttribute("contentEditable", "true");
    }
  }

  // Header specific functions 
  function setHeader(text, alertType) {
    $('#header').fadeIn('normal', function () {
      $('#header').text(text);
      $('#header').addClass(alertType);
      $('#header').attr("role", "alert");
      $('#header').css({
        "border-radius" : "0px",
        "margin-bottom" : "0px",
        "text-align" : "center"
      });
    });
  }

  function resetHeader() {
    $('#header').fadeOut('normal', function() {
      $('#header').empty();
      $('#header')[0].removeAttribute("role class style");
    });
  }
});