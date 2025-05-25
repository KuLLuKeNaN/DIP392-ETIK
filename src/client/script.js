const baseURL = "https://dip392-etik.onrender.com";

// Token kontrolü
const token = localStorage.getItem("authToken");
if (!token) {
  window.location.href = "signin.html";
}

// Ürünleri yükle
async function loadProducts() {
  try {
    const response = await fetch(`${baseURL}/api/products`);
    const products = await response.json();

    const slider = document.getElementById("productSlider");
    slider.innerHTML = "";

    if (!products.length) {
      slider.innerHTML = "<p>No products available right now.</p>";
      return;
    }

    products.forEach(product => {
      const frame = document.createElement("div");
      frame.className = "frame";

      const image = product.imageUrl || "example.jpg";

      frame.innerHTML = `
        <img src="${image}" alt="${product.name}" style="width: 120px; height: 110px; object-fit: contain; margin-bottom: 2px;">
        <p>${product.name} - $${product.price}</p>
      `;

      slider.appendChild(frame);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    document.getElementById("productSlider").innerHTML = "<p>Error loading products.</p>";
  }
}

// Sayfa yüklenince çalıştır
window.addEventListener("DOMContentLoaded", loadProducts);
