function toggleDisable(displayElement) {

    var element = document.getElementById(displayElement);
    
    if (element.classList.contains("display-none")) {
      element.classList.remove("display-none");
    } else {
      element.classList.add("display-none");
    }
  }

