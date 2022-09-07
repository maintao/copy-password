(function () {
  function isMac() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  }

  function writeTextToClipboard(text) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      let currentFocusElement = document.activeElement;
      let currentSelectionText = window.getSelection().toString();

      // make temporary textarea element
      let textArea = document.createElement("textarea");
      textArea.value = text;
      // the textarea have to be on page and technically visible
      textArea.style.position = "fixed";
      textArea.style.width = "0";
      textArea.style.height = "0";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      document.body.appendChild(textArea);
      textArea.select(); // select text, get ready to copy

      return new Promise((resolve, reject) => {
        // execute copy command, though this api is deprecated
        document.execCommand("copy") ? resolve() : reject();
        // do the cleanup
        textArea.remove();
        if (currentSelectionText.length > 0) {
          currentFocusElement.select();
        }
      });
    }
  }

  let copyModifierKey = isMac() ? "Meta" : "Control";
  let isCopyModifierKeyDown = false;

  window.addEventListener("keydown", (event) => {
    if (event.key === copyModifierKey) {
      isCopyModifierKeyDown = true;
    } else if (isCopyModifierKeyDown && event.key === "c") {
      if (document.activeElement.type === "password" && document.activeElement.value !== "") {
        writeTextToClipboard(document.activeElement.value);
      }
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === copyModifierKey) {
      isCopyModifierKeyDown = false;
    }
  });
})();
