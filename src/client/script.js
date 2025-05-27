document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "signin.html";
    return;
  }

  // Kullanıcı adını backend'den al ve göster
  try {
    const userRes = await fetch("https://dip392-etik.onrender.com/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      const fullName = `${userData.name} ${userData.surname}`;

      const userIcon = document.querySelector(".dropdown");
      const nameDiv = document.createElement("div");
      nameDiv.textContent = fullName;
      nameDiv.style.marginTop = "5px";
      nameDiv.style.color = "#FF1493";
      nameDiv.style.fontWeight = "bold";
      nameDiv.style.fontSize = "14px";
      nameDiv.style.textAlign = "center";
      userIcon.appendChild(nameDiv);
    } else {
      throw new Error("Failed to fetch user info");
    }
  } catch (error) {
    console.error("User fetch error:", error);
    logout();
    return;
  }

  // Ürünleri backend'den çek ve göster
  try {
    const response = await fetch("https://dip392-etik.onrender.com/api/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Unauthorized or failed to fetch products.");
    }

    const products = await response.json();
    renderProducts(products);

  } catch (error) {
    alert("Session expired or failed to fetch products.");
    logout();
  }
});

function renderProducts(products) {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach(slider => slider.innerHTML = ""); // temizle

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "frame";

    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" style="width: 120px; height: 110px; object-fit: contain; margin-bottom: 2px;">
      <p><strong>${product.name}</strong><br>$${product.price.toFixed(2)}<br>From ${product.owner?.name || "Unknown Store"}</p>
      <button class="btn-buy" onclick="buyProduct('${product._id}')">BUY</button>
      <button class="btn-negotiate" onclick="negotiateProduct('${product._id}')">NEGOTIATE</button>
    `;

    sliders[0].appendChild(card); // ilk slider'a ekle
  });
}

function buyProduct(productId) {
  alert(`BUY clicked for product ID: ${productId}`);
}

function negotiateProduct(productId) {
  alert(`NEGOTIATE clicked for product ID: ${productId}`);
}

function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  window.location.href = "signin.html";
}