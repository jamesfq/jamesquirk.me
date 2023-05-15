function toggle() {
    var img1 = document.getElementById("planeImage");
    window.print("We're doing something");
    if (img1.style.display === "none") {
      img1.style.display = "block";
    } 
    
    else {
      img1.style.display = "none";
    }
  }