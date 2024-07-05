// Simulated database
let users = [];
let applications = [];
let currentUser = null;

function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  users.push({ name, email, password });
  alert("Registration successful! You can now log in.");
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    currentUser = user;
    alert("Login successful!");
    document.getElementById("loginForm").style.display = "none";
    if (email === "admin@limkokwing.edu.my") {
      loadAdminDashboard();
    } else {
      document.getElementById("applicationForm").style.display = "block";
    }
  } else {
    alert("Invalid email or password.");
  }
}

function submitApplication() {
  const course = document.getElementById("appCourse").value;
  const documents = document.getElementById("appDocuments").files;

  applications.push({
    user: currentUser,
    course,
    documents,
    status: "Pending",
  });
  alert("Application submitted successfully!");
  document.getElementById("applicationForm").style.display = "none";
}

function loadAdminDashboard() {
  document.getElementById("adminDashboard").style.display = "block";
  const applicationsTable = document.getElementById("applicationsTable");
  applicationsTable.innerHTML = "";

  applications.forEach((application) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${application.user.name}</td>
            <td>${application.user.email}</td>
            <td>${application.course}</td>
            <td>${application.status}</td>
            <td>
                <button onclick="updateStatus('${application.user.email}', 'Approved')">Approve</button>
                <button onclick="updateStatus('${application.user.email}', 'Rejected')">Reject</button>
            </td>
        `;
    applicationsTable.appendChild(row);
  });
}

function updateStatus(email, status) {
  const application = applications.find((app) => app.user.email === email);
  if (application) {
    application.status = status;
    loadAdminDashboard();
  }
}
