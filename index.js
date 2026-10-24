
const WHATSAPP_NUMBER = "201000514415";

const ROOMS = {
  "meeting-room": { name: "Meeting Room", price: 200 },
  ROOM3: { name: "ROOM3", price: 170 },
  ROOM4: { name: "ROOM4", price: 120 },
  ROOM5: { name: "ROOM5", price: 200 },
  ROOM6: { name: "ROOM6", price: 300 },
};

const form = document.getElementById("bookingForm");
const roomSelect = document.getElementById("room");
const dateInput = document.getElementById("date");
const bookingSection = document.getElementById("booking");

function setMinDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

setMinDate();

document.querySelectorAll(".room button[data-room]").forEach((button) => {
  button.addEventListener("click", () => {
    roomSelect.value = button.dataset.room;
    bookingSection.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      document.getElementById("name").focus({ preventScroll: true });
    }, 600);
  });
});

function isValidEgyptPhone(phone) {
  const cleaned = phone.replace(/[\s\-]/g, "");
  return /^(\+?20|0)?1[0125]\d{8}$/.test(cleaned);
}

function formatTime(time) {
  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const roomKey = form.elements.room.value;
  const date = form.elements.date.value;
  const time = form.elements.time.value;
  const message = form.elements.message.value.trim();

  if (!isValidEgyptPhone(phone)) {
    alert("من فضلك اكتب رقم موبايل صحيح (مثال: 01012345678)");
    form.elements.phone.focus();
    return;
  }

  const room = ROOMS[roomKey];

  if (!room) {
    alert("من فضلك اختر القاعة");
    return;
  }

  const text =
    `طلب حجز جديد - SIGN ED\n\n` +
    `الاسم: ${name}\n` +
    `الهاتف: ${phone}\n` +
    `القاعة: ${room.name} (${room.price} جنيه / ساعة)\n` +
    `التاريخ: ${date}\n` +
    `الوقت: ${formatTime(time)}\n` +
    `ملاحظات: ${message || "لا يوجد"}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");

  form.reset();
});
