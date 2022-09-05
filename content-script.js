(function () {
  function isMac() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
  }

  let copyModifierKey = isMac() ? "Meta" : "Control";
  let isCopyModifierKeyDown = false;

  window.addEventListener("keydown", (event) => {
    if (event.key === copyModifierKey) {
      isCopyModifierKeyDown = true;
    } else if (isCopyModifierKeyDown && event.key === "c") {
      if (document.activeElement.type === "password" && document.activeElement.value !== "") {
        navigator.clipboard.writeText(document.activeElement.value);
      }
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.key === copyModifierKey) {
      isCopyModifierKeyDown = false;
    }
  });
})();
