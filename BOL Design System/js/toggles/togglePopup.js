// REVISE COMMENTS

//a script that toggles visibility of popups based on their ID.
//call this function using a click event:
//onclick="togglePopup(event, 'popupNameXYZ')"
//give popup ID 'target ' + popupNameXYZ
//EXAMPLE: id= "target popupNameXYZ"
//included is the toggle of an overlay:

let activePopup = null;
let activeOverlay = null;
let activeClose = null;

function togglePopup(event, popupId) {
    const overlay = document.getElementById('overlay ' + popupId);
    const popup = document.getElementById('target ' + popupId);
    const closeX = document.getElementById('close ' + popupId);

    if (activePopup && activePopup !== popup) {
        activePopup.classList.remove('visible');
        if (activeOverlay) {
            activeOverlay.classList.remove('visible');
        }
    }

    popup.classList.toggle("visible");
    if (overlay) {
        overlay.classList.toggle('visible');
    }
    activePopup = popup;
    activeOverlay = overlay;
    activeClose = closeX;

    event.stopPropagation();
}

document.addEventListener('click', function (event) {

    if (activePopup){
        const outsideClick =  !activePopup.contains(event.target);

        if (outsideClick && activePopup) {
            activePopup.classList.remove('visible');
            if (activeOverlay) {
                activeOverlay.classList.remove('visible');
            }

            activePopup = null;
            activeOverlay = null;
            activeClose = null;
        }
    }
    
 
});
document.addEventListener('click', function (event) {

    if (activePopup && activeClose){
        const closeClick = activeClose.contains(event.target);

        if (closeClick && activePopup) {
            activePopup.classList.remove('visible');
            if (activeOverlay) {
                activeOverlay.classList.remove('visible');
            }
            activePopup = null;
            activeOverlay = null;
            activeClose = null;
        }
    }
    
 
});


// || event.target.closest('.overlay')   // if (closeClick && activePopup) {
    //     console.log("closeclick");
    //     activePopup.classList.remove('visible');
    //     if (activeOverlay) {
    //         activeOverlay.classList.remove('visible');
    //     }
    //     console.log("test");
    //     activePopup = null;
    //     activeOverlay = null;
    // }