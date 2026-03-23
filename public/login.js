// ================= DOM ELEMENTS =================
// Grab key elements from the DOM for login functionality
let loginBtn = document.querySelector("#login-btn");        // Login button element
let loginForm = document.querySelector("#login-form");      // Login form element
let usernameElement = document.querySelector("#username");  // Username input
let passwordElement = document.querySelector("#password");  // Password input
const toast = document.querySelector("#toast");             // Toast notification container
const API_URL = "https://kgl-backend-4.onrender.com"

// ================= LOGIN FORM SUBMISSION =================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission (page reload)

  // ================= INPUT VALIDATION =================
  // Ensure the input elements exist in the DOM
  if (!usernameElement || !passwordElement) {
    console.error( );
    // Optionally, display a user-friendly message or handle error gracefully
    return;
  }

  // Trim inputs to remove leading/trailing spaces
  let username = usernameElement.value.trim();
  let password = passwordElement.value.trim();

  // Check if both fields are filled
  if (!username || !password) {
    showToast("Please enter both username and password.", "error");
    return;
  }

  // ================= SEND LOGIN REQUEST =================
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include token if previously stored (optional for login)
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      // Send credentials as JSON
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // ================= HANDLE LOGIN FAILURE =================
    // 401 or other errors returned from the server
    if (!response.ok) {
      showToast(data.error || "Login failed", "error");
      return;
    }

    // ================= LOGIN SUCCESS =================
    showToast("Login successful!", "success");

    // Store important session information in localStorage
    localStorage.setItem("token", data.token);                     // Auth token
    localStorage.setItem("userRole", data.user.role);              // User role (Sales Agent, Director, etc.)
    localStorage.setItem("mustChangePassword", data.mustChangePassword); // Flag for forced password change

    // ================= REDIRECT BASED ON PASSWORD STATUS =================
    setTimeout(() => {
      if (data.mustChangePassword) {
        // Redirect to password change page if required
        window.location.href = "changed_password.html";
      } else {
        // Otherwise, redirect to dashboard
        window.location.href = "dashboard.html";
      }
    }, 1000); // Delay to allow toast to show
  } catch (error) {
    // ================= HANDLE NETWORK / SERVER ERRORS =================
    showToast("Server connection error", "error");
    console.error("Login error:", error);
  }
});

// ================= TOAST NOTIFICATION FUNCTION =================
/**
 * Displays a temporary notification message (toast) on the page
 * @param {string} message - The message to display
 * @param {string} type - The type of message ("success" or "error")
 */
function showToast(message, type) {
  // Set the text inside the toast popup
  toast.textContent = message;

  // Clear any existing classes (like previous error/success)
  toast.className = "";

  // Add "show" class and type (for styling)
  toast.classList.add("show", type);

  // Automatically hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
