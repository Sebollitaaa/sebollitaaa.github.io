// -------------------- REGISTRO --------------------
document.addEventListener("DOMContentLoaded", () => {

    const regForm = document.getElementById("registerForm");
    if (regForm) regForm.addEventListener("submit", register);

    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", login);
});

function register(e) {
    e.preventDefault();

    let user = document.getElementById("regUser").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value;
    let pass2 = document.getElementById("regPass2").value;

    let valid = true;

    // Validaciones
    document.getElementById("errUser").textContent = user.length < 3 ? "Al menos 3 caracteres." : "";
    document.getElementById("errEmail").textContent = !email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) ? "Correo inválido." : "";
    document.getElementById("errPass").textContent = pass.length < 6 ? "Mínimo 6 caracteres." : "";
    document.getElementById("errPass2").textContent = pass !== pass2 ? "Las contraseñas no coinciden." : "";

    if (user.length < 3 || !email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/) || pass.length < 6 || pass !== pass2) valid = false;

    if (!valid) return;

    // Guardar usuario en localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si ya existe
    if (users.some(u => u.username === user || u.email === email)) {
        document.getElementById("regSuccess").textContent = "";
        document.getElementById("errUser").textContent = "Usuario o correo ya registrado.";
        return;
    }

    users.push({ username: user, email, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("regSuccess").textContent = "Cuenta creada con éxito 🎉";
}

// -------------------- LOGIN --------------------
function login(e) {
    e.preventDefault();

    let userInput = document.getElementById("logUser").value.trim();
    let pass = document.getElementById("logPass").value;
    let errorMsg = document.getElementById("loginError");

    if (!userInput || !pass) {
        errorMsg.textContent = "Complete todos los campos.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        (u.username === userInput || u.email === userInput) &&
        u.password === pass
    );

    if (!user) {
        errorMsg.textContent = "Credenciales incorrectas.";
        return;
    }

    // Crear sesión
    localStorage.setItem("sessionUser", JSON.stringify({ username: user.username }));

    location.href = "dashboard.html";
}

function togglePassword(id, btn) {
    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🔒​";
    } else {
        input.type = "password";
        btn.textContent = "🔐​";
    }
}