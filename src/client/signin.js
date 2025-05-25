document.getElementById('signinForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const res = await fetch('https://dip392-etik.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Token'ı kaydet
      localStorage.setItem('token', data.token);

      // Başarılı giriş: anasayfaya yönlendir
      window.location.href = 'index.html';
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
});
