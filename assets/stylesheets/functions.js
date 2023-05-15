// my attempt at writing a function to toggle an image when a button was clicked
function toggle() {
    // found the rough template for this idea at this URL: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    var img1 = document.getElementById("planeImage");
    
    // idea was that if the image was marked as hidden
    if (img1.hidden) {
        img1.hidden = false; // it would be changed to not hidden
    }

    // and vice versa
    else  {
        img1.hidden = true;
    }
}