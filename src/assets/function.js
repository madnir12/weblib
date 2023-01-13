import $ from "jquery";
// this method will use to wrap selected text and set the changes into given state in the last parameter
export function wrapText(elementID, openTag, closeTag, setHtml) {
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

export function onContextMenu(event) {
          event.preventDefault();
          var menu = $("#contextMenu");
          menu.css({
                    top: event.pageY + "px",
                    left: event.pageX + "px",
          });
          menu.show();
} // ends oncontextmenu method