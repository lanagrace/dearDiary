let video;
let frontCamera = true; // Initially using front camera

function setup() {
  noCanvas();

  video = createCapture(VIDEO);
  video.size(320, 240);
  setCamera(); // Set initial camera

  const switchBtn = document.getElementById("switchCamera");
  switchBtn.addEventListener("click", () => {
    frontCamera = !frontCamera; // Toggle camera
    setCamera(); // Apply the new camera setting
  });

  if ("geolocation" in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;
    });
  } else {
    console.log("geolocation not available");
  }
}

function setCamera() {
  if (!video || !video.elt || !video.elt.srcObject) {
    console.error("Video element or srcObject is not defined.");
    return;
  }

  let constraints = {};
  if (frontCamera) {
    constraints = { facingMode: "user" }; // Front camera
  } else {
    constraints = { facingMode: "environment" }; // Back camera
  }

  const videoTracks = video.elt.srcObject.getVideoTracks();
  if (videoTracks.length > 0) {
    videoTracks[0].applyConstraints(constraints)
      .then(() => {
        console.log("Camera constraints applied successfully.");
      })
      .catch((error) => {
        console.error("Error applying camera constraints:", error);
      });
  } else {
    console.error("No video tracks available.");
  }
}


function draw() {
  background(220);
}

var submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  video.loadPixels();
  const image64 = video.canvas.toDataURL();

  const date = new Date(); // Get current date and time
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

  const captionValue = document.getElementById("mood").value.trim();
  if (!captionValue) {
    alert("Please enter a caption");
    return;
  }

  console.log('submitted');
  db.collection('log').doc().set({
    caption: captionValue,
    date: formattedDate,
    latitude: document.getElementById("latitude").textContent,
    longitude: document.getElementById("longitude").textContent,
    image: image64
  })
})
