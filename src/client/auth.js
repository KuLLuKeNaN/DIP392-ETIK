// Yaş kontrolü (16 yaş altı uyarı)
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Kayıt formu gönderildiğinde
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const birthday = document.getElementById("birthday").value;
  const age = calculateAge(birthday);
  if (age < 16) {
    alert("You must be at least 16 years old to sign up.");
    return;
  }

  // Normalde burası backend'e veri gönderilecek kısım olacak
  alert("Your account has been created!");
  window.location.href = "index.html";
});

// Giriş formu gönderildiğinde
document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // Burada backend'den kullanıcı kontrolü yapılmalı
  alert("Sign in successful!");
  window.location.href = "index.html";
});

// Formlar arası geçiş
document.getElementById("switchToSignin").addEventListener("click", function () {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("signinForm").style.display = "block";
});

document.getElementById("switchToSignup").addEventListener("click", function () {
  document.getElementById("signinForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});