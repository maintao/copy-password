// when document loaded add listener
function isMac() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
}

let text = `Press ${isMac() ? "⌘" : "Ctrl"} + C to copy the password like ****.`;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("text").innerText = text;
});
