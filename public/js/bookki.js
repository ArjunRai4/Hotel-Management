function calculateTotal() {
    var rooms = parseInt(document.getElementById('rooms').value);
    var roomCost = 10000;
    var totalAmount = rooms * roomCost;
    document.getElementById('totalAmount').innerText= totalAmount;
}

function updateTotalAmount() {
    calculateTotal();
    return true;
}
calculateTotal();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            checkIn: document.getElementById('check-in').value,
            checkOut: document.getElementById('check-out').value,
            rooms: document.getElementById('rooms').value,
            guests: document.getElementById('guests').value,
            totalAmount:document.getElementById('totalAmount').innerText
        };

        localStorage.setItem('bookingData', JSON.stringify(formData));
        window.location.href = 'confirmation.html'; 
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const checkIn = document.getElementById("check-in");
  const checkOut = document.getElementById("check-out");
  const rooms = document.getElementById("rooms");
  const totalDiv = document.querySelector(".totalAmount");
  const form = document.querySelector("form");
  const NIGHT_COST = 100;

  function calcTotal() {
    const inDate = new Date(checkIn.value);
    const outDate = new Date(checkOut.value);
    const nights = checkIn.value && checkOut.value && outDate > inDate
      ? Math.ceil((outDate - inDate) / (1000*60*60*24))
      : 0;
    const r = parseInt(rooms.value) || 0;
    const total = nights * r * NIGHT_COST;

    totalDiv.textContent = total > 0
      ? `Total: ₹${total}`
      : "Please select valid dates and number of rooms.";
  }

  [checkIn, checkOut, rooms].forEach(el =>
    el.addEventListener("change", calcTotal)
  );

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (totalDiv.textContent.startsWith("Total: ₹")) {
      alert("🧾 Payment simulated! Redirecting…");
      window.location.href = "/confirmation";
    } else {
      alert("Please fill out the form correctly.");
    }
  });

  calcTotal();
});
