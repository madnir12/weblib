import $ from "jquery";
import { updateDocField } from "./config/firebase";
// this method will use to wrap selected text and set the changes into given state in the last parameter
export function wrapTextbc(elementID, openTag, closeTag, setHtml) {
  var textArea = $("#" + elementID);
  var len = textArea.val().length;
  var start = textArea[0].selectionStart;
  var end = textArea[0].selectionEnd;
  var selectedText = textArea.val().substring(start, end);
  var replacement = openTag + selectedText + closeTag;
  if (end !== start) {
    textArea.val(
      textArea.val().substring(0, start) +
      replacement +
      textArea.val().substring(end, len)
    );
    setHtml(textArea.val());
  }
} // ends wraptext method
export function wrapText(className) {
  let selection = window.getSelection(); // get the selected text
  let range = selection.getRangeAt(0); // get the range of the selected text
  let parent = range.commonAncestorContainer.parentNode; // get the parent element
  let newText = selection.toString(); // text that we want to replace with
  let newSpan = document.createElement("span");
  if (parent.innerText === selection.toString()) {
    if (parent.id !== "myTa" && !parent.classList.contains("page-div-container")) {
      parent.classList.remove(...parent.classList) // this line will remove all class
      parent.classList.add(className) // this line will add new class
      let newTextNode = document.createTextNode(newText)
      parent.innerHTML = ""
      range.deleteContents()
      range.insertNode(newTextNode)
    } else if (parent.id === "myTa") {
      let selected = range.commonAncestorContainer;
      if (selected.nodeType === 3) {
        newSpan.classList.add(className)
        let newNode = document.createTextNode(newText); // create a new text node with the new text
        newSpan.appendChild(newNode); // this will add new text in new span
        range.deleteContents(); // this will clear all selected content
        range.insertNode(newSpan)
      } else if (selected.nodeType === 1) {
        selected.classList.remove(...selected.classList)
        selected.classList.add(className)
        selected.innerHTML = ""
        let newNode = document.createTextNode(newText); // create a new text node with the new text
        range.deleteContents(); // this will clear all selected content
        range.insertNode(newNode)
      }
    } else {
      newSpan.classList.add(className)
      let newNode = document.createTextNode(newText); // create a new text node with the new text
      newSpan.appendChild(newNode); // this will add new text in new span
      range.deleteContents(); // this will clear all selected content
      range.insertNode(newSpan)
    }
  } else {
    newSpan.classList.add(className)
    let newNode = document.createTextNode(newText); // create a new text node with the new text
    newSpan.appendChild(newNode); // this will add new text in new span
    range.deleteContents(); // this will clear all selected content
    range.insertNode(newSpan)
  }
} // ends wraptext method
// this function use to keep selection
export const keepSelection = (element) => {
  let textArea = element.current;
  let start = textArea.selectionStart;
  let end = textArea.selectionEnd;


  // Schedule the selection restoration for the next repaint
  requestAnimationFrame(() => {
    textArea.focus();
    textArea.setSelectionRange(start, end);
  });
  let len = textArea.value.length;
  let text = textArea[0].value.substring(start, end)

} // ends keepSelection function
export function onContextMenu(event) {
  event.preventDefault();
  var menu = $("#contextMenu");
  menu.css({
    top: event.pageY - 100 + "px",
    left: event.pageX + "px",
    height: "300px",
    width: "200px",
    padding: "10px",
  });
  menu.focus()
} // ends oncontextmenu method
// this function use to update last edit date
export const updateBookEditDate = async (docId, after) => {
  let obj = {
    lastEditAt: new Date()
  }
  updateDocField("books_array", docId, obj, after);
} // ends updatebookeditdate function
// this method use to parform edit actions 
export const handleChangeCommand = (event) => {
  const myEvent = event.currentTarget.getAttribute("data-command");

  document.execCommand(myEvent, true, null);
} // ends handle change command function
// this function use to change font size 
export function changeFontSize(fontSize) {
  let selection = window.getSelection(); // get the selected text
  let range = selection.getRangeAt(0); // get the range of the selected text
  let parent = range.commonAncestorContainer.parentNode; // get the parent element
  let newText = selection.toString(); // text that we want to replace with
  let newSpan = document.createElement("span");
  console.log(parent)
  console.log(range.commonAncestorContainer)
  if (parent.innerText === selection.toString()) {
    console.log("all text selected")
    if (parent.id !== "myTa") {
      console.log("parent id is not myta")
      parent.style.fontSize = `${fontSize}px`
    } else if (parent.id === "myTa") {
      console.log("parent id is myta")
      let selected = range.commonAncestorContainer;
      if (selected.nodeType === 1) {
        selected.innerHTML = newText;
        selected.style.fontSize = `${fontSize}px`
      } else if (selected.nodeType === 3) {
        console.log("selected node is a text node")
        let newTextNode = document.createTextNode(newText)
        newSpan.appendChild(newTextNode)
        newSpan.style.fontSize = `${fontSize}px`
        range.deleteContents()
        range.insertNode(newSpan)
      }
    }
  } else {
    console.log("a part of text selected")
    newSpan.style.fontSize = `${fontSize}px`;
    let newNode = document.createTextNode(newText); // create a new text node with the new text
    newSpan.appendChild(newNode); // this will add new text in new span
    range.deleteContents(); // this will clear all selected content
    range.insertNode(newSpan)
  }
} // ends changefontsize
// this method will use to hide context menu
export const hideContextMenu = () => {
  var menu = $("#contextMenu");
  menu.css({
    height: "0px",
    width: "0px",
    padding: "0px",
  });
  
} // ends hide context menu method