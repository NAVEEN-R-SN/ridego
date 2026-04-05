let latestBooking = null;

function calculateFare(distance, rideType) {
  let ratePerKm = 12;

  if (rideType === "Sedan") {
    ratePerKm = 16;
  } else if (rideType === "SUV") {
    ratePerKm = 22;
  }

  const baseFare = 500;
  return Math.round(baseFare + distance * ratePerKm);
}

function showBookingDetails() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pickup = document.getElementById("pickup").value.trim();
  const drop = document.getElementById("drop").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const distance = parseFloat(document.getElementById("distance").value);
  const rideType = document.getElementById("rideType").value;

  if (!name || !phone || !pickup || !drop || !date || !time || !distance) {
    alert("Please fill all fields.");
    return;
  }

  const fare = calculateFare(distance, rideType);
  document.getElementById("farePreview").textContent = `₹${fare}`;

  latestBooking = {
    name,
    phone,
    pickup,
    drop,
    date,
    time,
    distance,
    rideType,
    fare
  };

  const bookingDetails = document.getElementById("bookingDetails");

  bookingDetails.innerHTML = `
    <h3>Booking summary</h3>
    <p class="summary-line"><strong>Name:</strong> ${name}</p>
    <p class="summary-line"><strong>Phone:</strong> ${phone}</p>
    <p class="summary-line"><strong>Pickup:</strong> ${pickup}</p>
    <p class="summary-line"><strong>Drop:</strong> ${drop}</p>
    <p class="summary-line"><strong>Date:</strong> ${date}</p>
    <p class="summary-line"><strong>Time:</strong> ${time}</p>
    <p class="summary-line"><strong>Ride:</strong> ${rideType}</p>
    <p class="summary-line"><strong>Distance:</strong> ${distance} km</p>
    <p class="summary-line"><strong>Estimated fare:</strong> ₹${fare}</p>
    <p class="summary-line"><strong>Status:</strong> Searching for nearby driver...</p>
  `;

  setTimeout(() => {
    bookingDetails.innerHTML = `
      <h3>Booking summary</h3>
      <p class="summary-line"><strong>Name:</strong> ${name}</p>
      <p class="summary-line"><strong>Phone:</strong> ${phone}</p>
      <p class="summary-line"><strong>Pickup:</strong> ${pickup}</p>
      <p class="summary-line"><strong>Drop:</strong> ${drop}</p>
      <p class="summary-line"><strong>Date:</strong> ${date}</p>
      <p class="summary-line"><strong>Time:</strong> ${time}</p>
      <p class="summary-line"><strong>Ride:</strong> ${rideType}</p>
      <p class="summary-line"><strong>Distance:</strong> ${distance} km</p>
      <p class="summary-line"><strong>Estimated fare:</strong> ₹${fare}</p>
      <p class="summary-line"><strong>Driver:</strong> Arun Kumar</p>
      <p class="summary-line"><strong>Cab No:</strong> KA 05 MJ 2481</p>
      <p class="summary-line"><strong>ETA:</strong> 4 min</p>
      <p class="summary-line"><strong>Status:</strong> Driver assigned</p>
    `;
  }, 2000);

  setTimeout(() => {
    bookingDetails.innerHTML = `
      <h3>Booking summary</h3>
      <p class="summary-line"><strong>Name:</strong> ${name}</p>
      <p class="summary-line"><strong>Phone:</strong> ${phone}</p>
      <p class="summary-line"><strong>Pickup:</strong> ${pickup}</p>
      <p class="summary-line"><strong>Drop:</strong> ${drop}</p>
      <p class="summary-line"><strong>Date:</strong> ${date}</p>
      <p class="summary-line"><strong>Time:</strong> ${time}</p>
      <p class="summary-line"><strong>Ride:</strong> ${rideType}</p>
      <p class="summary-line"><strong>Distance:</strong> ${distance} km</p>
      <p class="summary-line"><strong>Estimated fare:</strong> ₹${fare}</p>
      <p class="summary-line"><strong>Driver:</strong> Arun Kumar</p>
      <p class="summary-line"><strong>Cab No:</strong> KA 05 MJ 2481</p>
      <p class="summary-line"><strong>ETA:</strong> 2 min</p>
      <p class="summary-line"><strong>Status:</strong> Driver arriving</p>
    `;
  }, 4000);
}

function sendToWhatsApp() {
  if (!latestBooking) {
    alert("Please click Check fare first.");
    return;
  }

  const adminNumber = "+919989556929";

  const message = `RideGo Booking
Name: ${latestBooking.name}
Phone: ${latestBooking.phone}
Pickup: ${latestBooking.pickup}
Drop: ${latestBooking.drop}
Date: ${latestBooking.date}
Time: ${latestBooking.time}
Ride: ${latestBooking.rideType}
Distance: ${latestBooking.distance} km
Estimated Fare: ₹${latestBooking.fare}`;

  const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}