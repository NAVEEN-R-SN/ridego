const loginBtn = document.getElementById("loginBtn");
const loginDialog = document.getElementById("loginDialog");
const demoLoginBtn = document.getElementById("demoLoginBtn");

const infoDialog = document.getElementById("infoDialog");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const closeInfoBtn = document.getElementById("closeInfoBtn");

const onlineCabsBtn = document.getElementById("onlineCabsBtn");
const etaBtn = document.getElementById("etaBtn");
const sedanInfoBtn = document.getElementById("sedanInfoBtn");

const locateBtn = document.getElementById("locateBtn");
const fareBtn = document.getElementById("fareBtn");
const bookBtn = document.getElementById("bookBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const pickupInput = document.getElementById("pickup");
const dropInput = document.getElementById("drop");
const distanceInput = document.getElementById("distance");

const bookingStatus = document.getElementById("bookingStatus");
const fareOutput = document.getElementById("fareOutput");
const rideOutput = document.getElementById("rideOutput");
const driverOutput = document.getElementById("driverOutput");
const cabOutput = document.getElementById("cabOutput");
const etaOutput = document.getElementById("etaOutput");
const cabMarker = document.getElementById("cabMarker");

const rideButtons = document.querySelectorAll(".ride-btn");
const drivers = {
  mini: [
    { name: "Balaji", vehicle: "AP37TV5657", phone: "8500434569" },
    { name: "Prasad", vehicle: "AP37TV2929", phone: "9704732417" }
  ],
  sedan: [
    { name: "Sekhar", vehicle: "AP31TV0101", phone: "9492636929" },
    { name: "Hemanth", vehicle: "AP39NR3447", phone: "9625222444" }
  ],
  suv: [
    { name: "Murali", vehicle: "AP37TV7399", phone: "8328672801" }
  ]
};
let selectedRide = "Mini";
let selectedRate = 12;
let currentFare = 0;
let currentEta = "4 min";

rideButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    rideButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedRide = btn.dataset.ride;
    selectedRate = Number(btn.dataset.rate);
    rideOutput.textContent = selectedRide;
  });
});

function openInfo(title, text) {
  infoTitle.textContent = title;
  infoText.textContent = text;
  infoDialog.showModal();
}

loginBtn.addEventListener("click", () => {
  loginDialog.showModal();
});

demoLoginBtn.addEventListener("click", () => {
  loginDialog.close();
  openInfo("Login Success", "Demo login successful. You can now continue booking your ride.");
});

closeInfoBtn.addEventListener("click", () => {
  infoDialog.close();
});

onlineCabsBtn.addEventListener("click", () => {
  openInfo("Online Cabs", "12 cabs are currently active near your area.");
});

etaBtn.addEventListener("click", () => {
  openInfo("Average ETA", "Average pickup time is around 4 minutes right now.");
});

sedanInfoBtn.addEventListener("click", () => {
  openInfo("Sedan Available", "Sedan rides are available with comfortable city travel.");
});

locateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    openInfo("Location Error", "Geolocation is not supported in this browser.");
    return;
  }

  bookingStatus.textContent = "Detecting current location...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(5);
      const lng = position.coords.longitude.toFixed(5);
      pickupInput.value = `Current Location (${lat}, ${lng})`;
      bookingStatus.textContent = "Current location detected";
    },
    () => {
      bookingStatus.textContent = "Location access denied";
      openInfo("Permission Needed", "Please allow location access to auto-fill pickup.");
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

function calculateFare() {
  const distance = Number(distanceInput.value);
  if (!distance || distance <= 0) {
    openInfo("Missing Distance", "Please enter a valid distance in kilometers.");
    return 0;
  }

  const baseFare = 500;
  const demandCharge = 20;
  currentFare = baseFare + distance * selectedRate + demandCharge;
  currentEta = Math.max(3, Math.round(distance / 5) + 2) + " min";

  fareOutput.textContent = `₹${currentFare}`;
  etaOutput.textContent = currentEta;
  rideOutput.textContent = selectedRide;

  return currentFare;
}

fareBtn.addEventListener("click", () => {
  const fare = calculateFare();
  if (fare > 0) {
    bookingStatus.textContent = "Fare calculated";
  }
});

function validateBooking() {
  if (!nameInput.value.trim() || !phoneInput.value.trim() || !pickupInput.value.trim() || !dropInput.value.trim()) {
    openInfo("Missing Details", "Please fill name, phone, pickup, and drop location.");
    return false;
  }
  if (!distanceInput.value.trim()) {
    openInfo("Missing Distance", "Please enter trip distance.");
    return false;
  }
  return true;
}

function moveCab(step) {
  const positions = ["15%", "35%", "55%", "75%", "88%"];
  cabMarker.style.left = positions[step] || "88%";
}

function startBookingFlow() {
  const availableDrivers = drivers[selectedRide.toLowerCase()] || drivers.mini;
  const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];

  const steps = [
    { status: "Searching for nearby driver...", driver: "Finding...", cab: "--", eta: currentEta, pos: 0 },
    { status: "Driver assigned", driver: randomDriver.name, cab: randomDriver.vehicle, eta: currentEta, pos: 1 },
    { status: "Driver arriving", driver: randomDriver.name, cab: randomDriver.vehicle, eta: "3 min", pos: 2 }
  ];

  steps.forEach((step, index) => {
    setTimeout(() => {
      bookingStatus.textContent = step.status;
      driverOutput.textContent = step.driver;
      cabOutput.textContent = step.cab;
      etaOutput.textContent = step.eta;
      moveCab(step.pos);
    }, index * 3000);
  });
}

bookBtn.addEventListener("click", () => {
  if (!validateBooking()) return;

  if (currentFare === 0) {
    calculateFare();
  }

  bookingStatus.textContent = "Booking confirmed";
  openInfo("Booking Confirmed", `Your ${selectedRide} ride has been confirmed. Estimated fare is ₹${currentFare}.`);
  startBookingFlow();
});
document.getElementById("whatsappBtn").addEventListener("click", function() {
  if (!validateBooking()) return;
  if (currentFare === 0) calculateFare();

  const availableDrivers = drivers[selectedRide.toLowerCase()] || drivers.mini;
  const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];

  const adminNumber = "919989556929";
  const message = `New RideGo Booking
Name: ${nameInput.value}
Phone: ${phoneInput.value}
Pickup: ${pickupInput.value}
Drop: ${dropInput.value}
Distance: ${distanceInput.value} km
Ride Type: ${selectedRide}
Fare: Rs ${currentFare}
Driver: ${randomDriver.name}
Cab Number: ${randomDriver.vehicle}
Driver Phone: ${randomDriver.phone}
Status: ${bookingStatus.textContent}`;

  window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, "_blank");
});

