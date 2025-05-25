// Kullanıcı giriş yapmış mı kontrol et
const token = localStorage.getItem("authToken");

if (!token) {
  // Token yoksa signin sayfasına yönlendir
  window.location.href = "signin.html";
} else {
  console.log("User is authenticated!");
  // Burada istersen token ile kullanıcı bilgisi de çekebilirsin
  // örneğin:
  /*
  fetch("https://dip392-etik.onrender.com/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({}) // güncelleme değilse GET ile endpoint eklenmeli
  })
    .then(res => res.json())
    .then(data => console.log("User info:", data));
  */
}
const baseURL = "https://dip392-etik.onrender.com";
const token = localStorage.getItem("authToken");

// Giriş yapılmamışsa yönlendir
if (!token) {
  window.location.href = "signin.html";
}

// Ürünleri getir ve göster
async function loadProducts() {
  try {
    const response = await fetch(`${baseURL}/api/products`);
    const products = await response.json();

    const slider = document.getElementById("productSlider");
    slider.innerHTML = ""; // önce boşalt

    products.forEach(product => {
      const frame = document.createElement("div");
      frame.className = "frame";

      // Basit yapı – dilersen genişletebiliriz
      frame.innerHTML = `
        <img src="${product.imageUrl || 'example.jpg'}" alt="Product" style="width: 120px; height: 110px; object-fit: contain; margin-bottom: 2px;">
        <p>${product.name} - $${product.price}</p>
      `;

      slider.appendChild(frame);
    });

  } catch (err) {
    console.error("Product load error:", err);
  }
}

// Sayfa yüklenince çağır
window.addEventListener("DOMContentLoaded", loadProducts);

