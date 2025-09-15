// Snowfall effect
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
function createSnowflakes() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 1
    });
  }
}
createSnowflakes();

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let i = 0; i < snowflakes.length; i++) {
    let s = snowflakes[i];
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  moveSnowflakes();
}

function moveSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    let s = snowflakes[i];
    s.y += Math.pow(s.d, 2) + 1;
    if (s.y > canvas.height) {
      snowflakes[i] = {
        x: Math.random() * canvas.width,
        y: 0,
        r: s.r,
        d: s.d
      };
    }
  }
}
setInterval(drawSnowflakes, 25);

// Face verification modal
const loginBtn = document.getElementById("loginBtn");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("camera");
const statusText = document.getElementById("status");
const locationText = document.getElementById("location");

loginBtn.addEventListener("click", () => {
  cameraModal.classList.remove("hidden");

  // Open camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;

      // Start scanning timer
      let seconds = 0;
      const duration = Math.floor(Math.random() * 4) + 7; // 7–10 sec
      const timer = setInterval(() => {
        seconds++;
        statusText.textContent = `Scanning... ${seconds}s`;
        if (seconds >= duration) {
          clearInterval(timer);
          stream.getTracks().forEach(track => track.stop());
          statusText.textContent = "Verification complete ✅";
          fetchLocation();
        }
      }, 1000);
    })
    .catch(err => {
      alert("Camera access denied!");
    });
});

// Fetch user location
function fetchLocation() {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      locationText.textContent = `Location: ${data.city}, ${data.region}, ${data.country_name}`;
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    })
    .catch(() => {
      locationText.textContent = "Location not available.";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    });
}

// Redirect alternate login
document.getElementById("altLogin").addEventListener("click", () => {
  window.location.href = "yatraid.html";
});
