//Array to gather all comments created. Interestingly it has to be before init.
let comments = new Array();

//initialize the counter displayed on top
let thereisacomment = false;

function numberofcommentsAtLaunch() {
  let counterAtLaunch = comments.length;
  document.getElementById("test").innerHTML = counterAtLaunch;
  }

window.onload = init();

function init() {
  getComment();
  getText();
  numberofcommentsAtLaunch();
  highlightTextOnClick();
}

//this item serves to pass the margin between functions. It should disappear soon.
let passingobject = {
  margin: 0,
  id: 0,
  commentPosition: "na",
  nextComment: function() {
    return this.commentPosition + 1;
  },
  lastElementChild: true,
};



///////////////////////////////
// highlight function listeners
///////////////////////////////

var ellipsis = Ellipsis();

text.addEventListener("copy", highlight_selection);
text.addEventListener("copy", createNewCommentOnEvent);
text.addEventListener("copy", numberofcomments);
text.addEventListener("paste", clearStorage);
document.addEventListener("click", clickOutside);
marginright.addEventListener("click", cancelComment);
marginright.addEventListener("click", saveComment);


//function to make sure annotated text gets highlighted when clicked.

function highlightTextOnClick() {
  let highlightsList = document.querySelectorAll('.highlight');
  let notesList = document.getElementsByClassName("alert")
      for (var i = 0; i < highlightsList.length; i++) {
        let clickedId = highlightsList[i].id;
        highlightsList[i].onclick = changePosition;
        console.log("added the event highlight to " + clickedId)
      }
    }

function changePosition() {
  let targetID = event.target.id;
  this.className = "highlight-clicked";
  let notesList = document.getElementsByClassName("alert");
    for (var i = 0; i < notesList.length; i++) {
      if (notesList[i].id == targetID) {
        notesList[i].style.marginLeft = "2px";
      }
    }
  }

function clickOutside() {
  thereisacomment = false;
  let highlightedComment = document.getElementsByClassName('highlight-clicked')[0];
  if (highlightedComment != undefined && event.target.className != 'highlight-clicked' && event.target.className != 'alert') {
    let spanID = highlightedComment.id;
    let selectedNote = document.getElementsByClassName("alert");
      for (var i = 0; i < selectedNote.length; i++)
        if (selectedNote[i].id == spanID) {
          selectedNote[i].style.marginLeft = "10px ";
        }
      highlightedComment.className = "highlight";
      }
    }


function cancelComment(event) {
  const target = event.target;
  if (target.className != 'cancel') return;

  const grandParentTarget = target.parentNode.parentNode;
  grandParentTarget.parentNode.removeChild(grandParentTarget);
  var highlights = document.querySelectorAll('.highlight');
      for (var i = 0; i < highlights.length; i++) {
        if (highlights[i].id == grandParentTarget.id) {
          let toBeDeletedHighlight = highlights[i];
          let highlightParentNode = highlights[i].parentNode
          highlightParentNode.replaceChild(document.createTextNode(toBeDeletedHighlight.innerHTML), toBeDeletedHighlight);
        }
      }
    };

function saveComment(event) {
const target = event.target;
if (target.className != 'save') return;

let textToSave = event.target.previousSibling.textContent;
let numberofAnnotations = document.getElementsByClassName("alert").length;
let commentToAdd = document.getElementsByClassName("alert")[numberofAnnotations-1];
let newComment = new Comment(commentToAdd.id, commentToAdd.style.margin, commentToAdd.absoluteOffsetBottom, commentToAdd.innerHTML, commentToAdd.time, textToSave);
comments.push(newComment);
storeComment(newComment);
console.log('Comment stored')
let paragraph = event.target.previousSibling;
paragraph.setAttribute("contenteditable", "false");
let buttonCommentToHide = event.target;
buttonCommentToHide.style.display = "none";
let buttonCancelToHide = event.target.nextSibling;
buttonCancelToHide.style.display = "none";
let paragraphToSave = event.target.previousSibling;
paragraphToSave.readOnly = true;
ellipsis.add(paragraphToSave);
}

function saveAnnotationText(event) {

}




//function to get highlighted text
function getText() {
  if (localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
            if (key.substring(0, 4) == "text") {
                let text = localStorage.getItem(key);
                document.getElementById("text").outerHTML = text;
              }
            }
          }
        }

//retrieve comments from Storage - retrieve the comments,
//convert back from JSON, and push them into the comments array created earlier
function getComment() {
if (localStorage) {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
          if (key.substring(0, 7) == "Comment") {
            console.log('found some comments to load')

            let item = localStorage.getItem(key);
            let commentItem = JSON.parse(item);
            comments.push(commentItem);
          }
        }
    addStoredCommentsToPage();
  }
}

//add stored comments to page
function addStoredCommentsToPage() {
  let marginright = document.getElementById("marginright");
  for (let i = 0; i < comments.length; i++) {
      let commentFromStorage = comments[i];
      let createdCommentFromStorage = createNewComment(commentFromStorage);
      marginright.appendChild(createdCommentFromStorage);
    }
  }

//create comments from stored info
function createNewComment(commentFromStorage) {
  let commentHeader = document.createElement("div")
  commentHeader.className = "alert";
  commentHeader.innerHTML = commentFromStorage.content;
  commentHeader.style.margin = commentFromStorage.margin;
  commentHeader.id = commentFromStorage.id;
  return commentHeader;
  }

//save new or edited comments objects to storage
function storeComment(Comment) {
    if (localStorage) {
      let key = "Comment " + Comment.id;
      let item = JSON.stringify(Comment);
      localStorage.setItem(key, item);
      }
    else {
      console.log("Error: you don't have localStorage!");
    }
  }

function saveText() {
    if (localStorage) {
      let key = "text" ;
      let annotatedtext = document.getElementById("text");
      let annotatextTextOuterHTML = annotatedtext.outerHTML;
      localStorage.setItem(key, annotatextTextOuterHTML);
    }
    else {
      console.log("Error: you don't have localStorage!");
    }
  }

//Class constructor to store the Comments
class Comment {
  constructor(id, margin, absoluteOffsetBottom, content, time, annotation) {
    this.id = id;
    this.margin = margin;
    this.absoluteOffsetBottom = absoluteOffsetBottom;
    this.content = content;
    this.time = new Date();
    this.annotation = annotation;
  }
}
/////////////////////////////////////////////
//****************************************//
/////////////////////////////////////////////

//highlight the text on event trigger
function highlight_selection() {
    //initiate variable for the selection
    let selection;
    //Get the selected text
    if (window.getSelection)
      selection = window.getSelection();
    else if (typeof document.selection != "undefined")
        selection = document.selection;
    //Get the selected content, in a range object
    let range = selection.getRangeAt(0);
    //If the range spans some text, and inside a tag, set its css class.
    if (range && !selection.isCollapsed) {
        if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
            let span = document.createElement('span');
            span.className = 'highlight';
            span.id = document.getElementsByClassName("alert").length;
            range.surroundContents(span);
            //provide the absolute offsetTop
            passingobject.absoluteOffsetTop = span.offsetTop;
            //check whether the range is the last one in the paragraph
              if (range.commonAncestorContainer.lastElementChild != span) {
                console.log("Text highlighted = the last element in the container was not the created span, therefore there is highlighted text below me")
                passingobject.lastElementChild = false;
                //store the collection of all span existing in the pragraph into an array to be able to guess the position.
                let htmlCollectionChildren = Array.prototype.slice.call(range.commonAncestorContainer.children);
                //find the position of the span among all the spans
                let lookedForSpan = "span#" + span.id +".highlight";
                let lookedForSpanIndex = htmlCollectionChildren.findIndex(({id, className, tagName}) =>
                `${tagName.toLowerCase()}#${id}.${className}` === lookedForSpan);
                //storing the comment position.
                passingobject.commentPosition = lookedForSpanIndex;
                console.log("The highlighted text is the #" + lookedForSpanIndex + "in the index of spans")
                }
                else {
                  console.log("the last element WAS the span - no text highlighted after that")
                  passingobject.lastElementChild = true
                  //store the collection of all span existing in the pragraph into an array
                  let htmlCollectionChildren = Array.prototype.slice.call(range.commonAncestorContainer.children);
                  //log the position of the span among all the spans
                  let lookedForSpan = "span#" + span.id +".highlight";
                  let lookedForSpanIndex = htmlCollectionChildren.findIndex(({id, className, tagName}) =>
                  `${tagName.toLowerCase()}#${id}.${className}` === lookedForSpan);
                  //storing the comment position.
                  passingobject.commentPosition = lookedForSpanIndex;
                  console.log("The highlighted text is the #" + passingobject.commentPosition + " in the index of spans")
            }
        }
    }
    saveText();
    highlightTextOnClick();
  };


/////////////////////////////////////////////
//****************************************//
/////////////////////////////////////////////


//function that gets all the next siblings for the inserted comment, and change their margin
let amendPositionNextSiblingFar = function (elem) {
  let sibling = elem.nextSibling;
  console.log(sibling);
  let toBeDeduced = parseInt(elem.style.marginTop) + 80;
  let siblingNewTopMargin = parseInt(sibling.style.marginTop) - toBeDeduced;
  sibling.style.margin = siblingNewTopMargin + "px " + "0px " + "0px " + "10px"
  }

let amendPositionNextSiblingClose = function (elem) {
    let sibling = elem.nextSibling;
    sibling.style.margin = "10px " + "0px " + "0px " + "10px"
    }

let positionVariationSecondSibling = function (elem, aboutToChangePositionOffsetTop) {
let secondSibling = elem.nextSibling.nextSibling;
console.log("The next sibling offsetop position about to change is : " + aboutToChangePositionOffsetTop);
console.log("The next sibling new offsetTop position is : " + elem.nextSibling.offsetTop);
let toBeDeduced = elem.nextSibling.offsetTop - aboutToChangePositionOffsetTop;
let secondSiblingNewTopMargin = parseInt(secondSibling.style.marginTop) - toBeDeduced;
secondSibling.style.margin = secondSiblingNewTopMargin + "px " + "0px " + "0px " + "10px"
    }

let getArrayOfNextSiblings2 = function (elem) {
  let siblings = [];
  let sibling = elem.nextSibling;
  let toBeDeduced = parseInt(elem.style.marginTop) + 80;
  let siblingNewTopMargin = parseInt(sibling.style.marginTop) - toBeDeduced;
  for (; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType !== 1 || sibling === elem) continue;
      sibling.style.margin = siblingNewTopMargin + "px " + "0px " + "0px " + "10px"
      siblings.push(sibling);
      }
}

//function that calculates position for annotation, create the note header and insert it.
function createNewCommentOnEvent() {
    let commentHeader = document.createElement("div")
    commentHeader.className = "alert";
    commentHeader.innerHTML = window.getSelection();
    commentHeader.absoluteOffsetBottom = passingobject.absoluteOffsetTop + 80;
    commentHeader.id = document.getElementsByClassName("alert").length;
    passingobject.id = commentHeader.id;
    var aboutToChangePositionOffsetTop;
    var commentHeaderPreviousSiblingOffsetBottom;
    console.log("Initializing new annotation - ID = " + passingobject.id + " / Expected absoluteOffsetTop = " + passingobject.absoluteOffsetTop + " / Expected absoluteOffsetBottom = " + commentHeader.absoluteOffsetBottom);

  //position the comment in the margin, before the relevant sibling if one is existing, or directly as a child.
    if (passingobject.lastElementChild == false) {
      commentToInsertBefore = document.getElementById("marginright").childNodes[passingobject.nextComment()];
      console.log("The comment following the inserted one is ");
      console.log(document.getElementById("marginright").childNodes[passingobject.nextComment()]);
      document.getElementById("marginright").insertBefore(commentHeader, commentToInsertBefore);
      }
    else {
      console.log("Creating commentHeader - I detected that there was not any annotations after this one")
      document.getElementById("marginright").appendChild(commentHeader);
      }

    if (commentHeader.nextSibling) {
    var aboutToChangePositionOffsetTop = commentHeader.nextSibling.offsetTop - 17;
    console.log("Detected a next sibling - Saving the next sibling PositionOffsetTop into the dedicated variable : " + aboutToChangePositionOffsetTop);
    }

    if  (commentHeader.previousSibling) {
    console.log("detected a previous sibling")
    var commentHeaderPreviousSiblingOffsetBottom = commentHeader.previousSibling.offsetTop + 80;
    }
  ///////////////////////
  // MARGIN DEFINITION
  ///////////////////////

    //case 1 - no previous comment, no next comment. margin will be defined from the highlighted text.
    if (typeof commentHeader.previousSibling.offsetTop == 'undefined' && commentHeader.nextSibling === null ) {
      commentHeader.style.margin = passingobject.absoluteOffsetTop + "px " + "0px " + "0px " + "10px";
      console.log("case 1 - no previous comment, no next comment. margin will be defined from the highlighted text")
      }
       //case 2 - no previous comment, but existing next comment.
        else if (typeof commentHeader.previousSibling.offsetTop == 'undefined') {
         commentHeader.style.margin = passingobject.absoluteOffsetTop + "px " + "0px " + "0px " + "10px";
         console.log("case 2 - no previous comment, but existing next comment - amending the margin of next annotation")
         console.log(commentHeader.nextSibling);
         console.log("commentHeader.nextSibling.offsetTop = " + commentHeader.nextSibling.offsetTop);
         console.log("commentHeader.absoluteOffsetBottom = " + commentHeader.absoluteOffsetBottom);
         let startingZoneNextSibling = aboutToChangePositionOffsetTop - 27;
           //space is evaluated here.
           if (commentHeader.absoluteOffsetBottom >= startingZoneNextSibling)
               {
               console.log("The next sibling is too close")
               commentHeader.style.margin = passingobject.absoluteOffsetTop + "px " + "0px " + "0px " + "10px";
               amendPositionNextSiblingClose(commentHeader);
               }
           else
               {
               console.log("The next sibling is far enough.")
               amendPositionNextSiblingFar(commentHeader);
               }
             }
          //case 3 - existing previous comments, no next comments - the expected position of the new annotations
          // is proven to be lower than the previous comment absolute offset bottom)
          else if (commentHeader.nextSibling === null && passingobject.absoluteOffsetTop >= commentHeaderPreviousSiblingOffsetBottom) {
          let commentHeaderMarginSeparatingFromPreviousSibling = passingobject.absoluteOffsetTop - commentHeaderPreviousSiblingOffsetBottom;
          commentHeader.style.margin = commentHeaderMarginSeparatingFromPreviousSibling + "px " + "0px " + "0px " + "10px";
          // commentHeader.absoluteOffsetBottom = commentHeaderMarginSeparatingFromPreviousSibling + 80;
          console.log("case 3 - existing previous annotations, no next ones, expected position of the new annotation is proven to be lower than the previous comment absolute offset bottom");
          }
            //case 4 - existing previous comments, no next sibling, the highlighted text is located at a smaller Y coordinate than the bottom of the previous comment.
            else if (commentHeader.nextSibling === null && passingobject.absoluteOffsetTop <= commentHeaderPreviousSiblingOffsetBottom) {
                  commentHeader.style.margin = "10px " + "0px " + "0px " + "10px";
                  commentHeader.absoluteOffsetBottom = comments[commentHeader.previousSibling.id].absoluteOffsetBottom + 10 + 80;
                  console.log("Case 4 - existing previous comments, no next comments, the highlighted text is located at a smaller Y coordinate than the bottom of the previous comment");
                  console.log("We had to amend the absolute offset top it is now " + commentHeader.offsetTop + " / we also amend the absolute offset bottom, it is now " + commentHeader.absoluteOffsetBottom)
                }
                  //case 5 - existing previous comments, existing next siblings.
                  //2 cases for next sibling :
                    //one where the sibling is far enough below. It will need to be repositioned but will stay where it is, not impacting all siblings following him.
                    // one where the sibling is less than 90px down below. It will need to move, its distance next siblings will have to be assessed to move them if needed.
                  else if (commentHeader.nextSibling && passingobject.absoluteOffsetTop <= comments[commentHeader.previousSibling.id].absoluteOffsetBottom) {
                    commentHeader.style.margin = "10px " + "0px " + "0px " + "10px";
                    commentHeader.absoluteOffsetBottom = comments[commentHeader.previousSibling.id].absoluteOffsetBottom + 10 + 80;
                    console.log("Case 5 - existing previous annotations, the new annotation overlaps with the previous one");
                    //checking here for the case. To check we get the offsetTop distance of the next sibling.
                    //We remove 27 because the next sibling already has moved 17PX. We also want to make sure there is a 10px breathing space.
                    let startingZoneNextSibling = commentHeader.nextSibling.offsetTop - 27;
                      //space is evaluated here.
                      if (commentHeader.absoluteOffsetBottom >= startingZoneNextSibling)
                          {
                          console.log("The next sibling is too close")
                          let commentHeaderMarginSeparatingFromPreviousSibling = passingobject.absoluteOffsetTop - comments[commentHeader.previousSibling.id].absoluteOffsetBottom;
                          commentHeader.style.margin = "10px " + "0px " + "0px " + "10px";
                          commentHeader.prevSiblingOffsetBottom = commentHeaderMarginSeparatingFromPreviousSibling + 80;
                          amendPositionNextSiblingClose(commentHeader);
                          }
                      else
                          {
                          console.log("The next sibling is far enough.")
                          amendPositionNextSiblingFar(commentHeader);
                          }
                        }

                    else if (commentHeader.nextSibling && passingobject.absoluteOffsetTop >= comments[commentHeader.previousSibling.id].absoluteOffsetBottom)
                    {
                    commentHeaderMarginSeparatingFromPreviousSibling = passingobject.absoluteOffsetTop - commentHeaderPreviousSiblingOffsetBottom;
                    commentHeader.style.margin = commentHeaderMarginSeparatingFromPreviousSibling + "px " + "0px " + "0px " + "10px";
                    commentHeader.prevSiblingOffsetBottom = commentHeaderMarginSeparatingFromPreviousSibling + 80;
                    let startingZoneNextSibling = aboutToChangePositionOffsetTop - 10;
                    console.log("case 6 - existing previous annotations, existing next annotations, expected position of the new annotation is proven to be lower than the previous comment absolute offset bottom");
                    //sub case
                    if (commentHeader.absoluteOffsetBottom >= startingZoneNextSibling)
                        {
                        console.log("The next sibling is too close")
                        let commentHeaderMarginSeparatingFromPreviousSibling = passingobject.absoluteOffsetTop - comments[commentHeader.previousSibling.id].absoluteOffsetBottom;
                        commentHeader.style.margin = commentHeaderMarginSeparatingFromPreviousSibling + "px " + "0px " + "0px " + "10px";
                        amendPositionNextSiblingClose(commentHeader);
                        }
                    else
                        {
                        console.log("The next sibling is far enough.")
                        amendPositionNextSiblingFar(commentHeader);
                        }
                      }

    //add a notebox as a child to the element.
    createNewNoteBox();


    //check if we need toreposition the second next sibling.
    if (commentHeader.nextSibling && commentHeader.nextSibling.nextSibling) {
      console.log("Margintop detected for second next sibling is " + commentHeader.nextSibling.nextSibling.style.marginTop);
      if (parseInt(commentHeader.nextSibling.nextSibling.style.marginTop) >= 80) {
        console.log("CALLING THE REPOSITIONING OF SECOND NEXT SIBLING BECAUSE IT IS FAR ENOUGH")
        positionVariationSecondSibling(commentHeader, aboutToChangePositionOffsetTop);
        }
        else {
    console.log("Not calling the repositioning of second next sibling because it is not far enough")
    }
  }

    //save the informations of the comment to an object, with ID, margin, absoluteOffsetBottom, and Content

}

//adding a child to the comment the notebox, with the text.
function createNewNoteBox() {
    let noteBox = document.createElement("div");
    let saveButton = document.createElement("div");
    let cancelButton = document.createElement("div");
    noteBox.className = "notebox";
    saveButton.className = "save";
    saveButton.innerHTML = "Comment";
    cancelButton.innerHTML = "Cancel";
    cancelButton.className = "cancel";
    document.getElementsByClassName("alert")[passingobject.commentPosition].appendChild(noteBox);
    let editableText = document.createElement("p");
    editableText.setAttribute("contenteditable", "true");
    noteBox.appendChild(editableText);
    noteBox.appendChild(saveButton);
    noteBox.appendChild(cancelButton);
    editableText.focus();
  }

//function add one to the counter everytime a new comment is added
function numberofcomments () {
  let counter = comments.length;
  document.getElementById("test").innerHTML = counter;
}


function clearStorage(){
    localStorage.clear();
}
