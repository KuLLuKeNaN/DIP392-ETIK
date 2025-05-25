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
      window.location.href = "signin.html";
    } else {
      alert(data.message || "Sign up failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
});
