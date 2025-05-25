const baseURL = "https://dip392-etik.onrender.com";

document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch(`${baseURL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signin failed");
    }

    // Token'ı localStorage'a kaydet
    localStorage.setItem("authToken", data.token);

    // Giriş başarılı → anasayfaya yönlendir
    window.location.href = "index.html";  // Burayı senin verdiğin anasayfa ile eşleştirdik

  } catch (err) {
    alert(err.message);
  }
});
