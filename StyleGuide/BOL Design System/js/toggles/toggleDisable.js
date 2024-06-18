function toggleDisable(disabledElement) {

    var element = document.getElementById(disabledElement);
    
    if (element.classList.contains("disabled")) {
      element.classList.remove("disabled");
    } else {
      element.classList.add("disabled");
    }
  }

