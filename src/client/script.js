// Kullanıcı kayıt işlemi
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const inputs = e.target.elements;

  const userData = {
    name: inputs[0].value,
    surname: inputs[1].value,
    birthday: inputs[2].value,
    phone: inputs[3].value,
    email: inputs[4].value,
    password: inputs[5].value
  };

  try {
    const res = await fetch('https://dip392-etik.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful! You can now log in.");
      // Giriş formuna geç
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('signinForm').style.display = 'block';
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred.");
  }
});

// Kullanıcı giriş işlemi
document.getElementById('signinForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const inputs = e.target.elements;

  const credentials = {
    email: inputs[0].value,
    password: inputs[1].value
  };

  try {
    const res = await fetch('https://dip392-etik.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      alert("Login successful!");
      document.getElementById('popup').style.display = 'none';
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred.");
  }
});

// Formlar arası geçiş
document.getElementById('switchToSignin').addEventListener('click', () => {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('signinForm').style.display = 'block';
});

document.getElementById('switchToSignup').addEventListener('click', () => {
  document.getElementById('signinForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
});
