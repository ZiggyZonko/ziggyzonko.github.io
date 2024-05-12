const text = "ZiggyZonko";
const typingSpeed = 100; // Milliseconds
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typeWriter);