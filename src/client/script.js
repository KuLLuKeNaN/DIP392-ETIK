// Sign Up (Kayıt) işlemi
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const userData = {
    name: formData.get('name'),
    surname: formData.get('surname'),
    birthday: formData.get('birthday'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const res = await fetch('https://dip392-etik.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Sign up successful! You can now sign in.");
      // Form geçişi
      document.getElementById('signupForm').style.display = 'none';
      document.getElementById('signinForm').style.display = 'block';
    } else {
      alert(data.message || "Sign up failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong during sign up.");
  }
});

// Sign In (Giriş) işlemi
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
      localStorage.setItem('token', data.token);
      alert("Sign in successful!");
      document.getElementById('popup').style.display = 'none';
    } else {
      alert(data.message || "Sign in failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong during sign in.");
  }
});

// Formlar arası geçiş: Sign Up → Sign In
document.getElementById('switchToSignin').addEventListener('click', () => {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('signinForm').style.display = 'block';
});

// Formlar arası geçiş: Sign In → Sign Up
document.getElementById('switchToSignup').addEventListener('click', () => {
  document.getElementById('signinForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
});
