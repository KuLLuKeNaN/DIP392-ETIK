const sampleProducts = [
  { id: 1, name: "Handmade Bag", price: "$15", image: "assets/example.jpg" },
  { id: 2, name: "Iron Maiden T-Shirt", price: "$40", image: "assets/tshirtironmaiden.jpg" },
  { id: 3, name: "Handmade Bracelet", price: "$50", image: "assets/bracelets.jpg" },
  { id: 4, name: "Decorative Furniture", price: "$30", image: "assets/indir.jpg" },
  { id: 5, name: "Custom Artwork", price: "$100", image: "assets/handmade.jpg" },
  { id: 6, name: "Bag XL", price: "$90", image: "assets/example.jpg" },
  { id: 7, name: "Vintage Top", price: "$70", image: "assets/handmade.jpg" },
  { id: 8, name: "Cool Shirt", price: "$25", image: "assets/example.jpg" }
];

function populateSlider(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  products.forEach(product => {
    const frame = document.createElement('div');
    frame.className = 'frame';
    frame.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 120px; height: 110px; object-fit: contain; margin-bottom: 2px;">
      <p>${product.name} - ${product.price}</p>
    `;
    container.appendChild(frame);
  });
}

populateSlider("flashSlider", sampleProducts);
populateSlider("chosenSlider", sampleProducts);

// Arama kutusu
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".frame").forEach(frame => {
    const match = frame.textContent.toLowerCase().includes(query);
    frame.style.display = match ? "block" : "none";
  });
});

// Her slider-container için scroll butonları
document.querySelectorAll('.slider-container').forEach(container => {
  const slider = container.querySelector('.slider');
  const btnLeft = container.querySelector('.slider-btn.left');
  const btnRight = container.querySelector('.slider-btn.right');

  btnLeft.addEventListener('click', () => {
    slider.scrollBy({ left: -220, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    slider.scrollBy({ left: 220, behavior: 'smooth' });
  });

  // Otomatik kaydırma
  setInterval(() => {
    slider.scrollBy({ left: 220, behavior: 'smooth' });
  }, 3000);
});