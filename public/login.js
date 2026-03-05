let loginBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector("#login-form");
let usernameElement = document.querySelector("#username");
let passwordElement = document.querySelector("#password");
const toast = document.querySelector("#toast");
const API_URL = "https://kgl-backend-4.onrender.com"

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Check if elements exist before accessing their properties
  if (!usernameElement || !passwordElement) {
    console.error("Username or password input element not found in the DOM.");
    // Optionally, show a user-friendly message or handle this error gracefully
    return;
  }

  let username = usernameElement.value.trim();
  let password = passwordElement.value.trim();

  if (!username || !password) {
    showToast("Please enter both username and password.", "error");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
 
    // 401 - Unauthorized
    if (!response.ok) {
      showToast(data.error || "Login failed", "error");
      return;
    }

    // SUCCESS (200)
    showToast("Login successful!", "success");

    // Store token + role
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.user.role);
    localStorage.setItem("mustChangePassword", data.mustChangePassword);

    //  Check if user must change password
    setTimeout(() => {
      if (data.mustChangePassword) {
        window.location.href = "changed_password.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 1000);
  } catch (error) {
    showToast("Server connection error", "error");
  }
});
/*===============
OUR FUNCTION SHOWTOAST
/*=================*/
function showToast(message, type) {
  // Set the text inside the toast popup
  toast.textContent = message;
  // Clear any existing classes (like previous error/success)
  toast.className = "";

  toast.classList.add("show", type);
  // Automatically hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
