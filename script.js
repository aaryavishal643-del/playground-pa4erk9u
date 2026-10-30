const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "मेन्यू बंद करें" : "मेन्यू खोलें");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "मेन्यू खोलें");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const message = String(data.get("message") || "").trim();

  // No company email or phone number has been supplied yet.
  // Do not pretend this demo form sends a message to the company.
  const enquiry = [
    "Khublal Agro Chemical Pvt. Ltd. — पूछताछ",
    "नाम: " + name,
    "मोबाइल: " + (phone || "नहीं दिया गया"),
    "विषय: " + topic,
    "संदेश: " + message
  ].join("\n");

  const blob = new Blob([enquiry], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "khublal-agro-enquiry.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  status.textContent = "आपकी पूछताछ टेक्स्ट फाइल के रूप में डाउनलोड हो गई है। इसे कंपनी के आधिकारिक संपर्क माध्यम से भेजें।";
  form.reset();
});