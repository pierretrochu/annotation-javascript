function highlightTextOnClick() {
  //let thereisacomment = true;
  let highlightsList = document.querySelectorAll('.highlight');
      for (var i = 0; i < highlightsList.length; i++) {
        let clickedId = highlightsList[i].id;
        highlightsList[i].onclick = changePosition()
    }
  }


function changePositiontwo() {
  let targetID = event.target.id;
  this.className = "highlight-clicked"
  let annotationToMove = document.getElementsByClassName("alert")[targetID];
  console.log(annotationToMove);
  annotationTomove.style.marginLeft = "2px";


  function changePosition () {
    for (var i = 0; i < notesList.length; i++) {
      if (notesList[i].id == clickedId) {
      notesList[i].style.marginLeft = "2px ";
      this.className = "highlight-clicked";
    }
  }
  //adding onclick event to each highlight span - will remove highlight from other comments if click.
  if (thereisacomment) {
  clickOutside();
  }
  }
