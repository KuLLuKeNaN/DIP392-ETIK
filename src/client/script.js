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

    const res = await fetch('https://dip392-etik.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await res.json();
    if (res.ok) {
        alert("Registration successful!");
        // switch to signin
        document.getElementById('signinForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
    } else {
        alert(data.message || "Registration failed!");
    }
});
document.getElementById('signinForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const inputs = e.target.elements;

    const credentials = {
        email: inputs[0].value,
        password: inputs[1].value
    };

    const res = await fetch('https://dip392-etik.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('token', data.token);
        alert("Login successful!");
        document.getElementById('popup').style.display = 'none';
    } else {
        alert(data.message || "Login failed!");
    }
});
document.getElementById('switchToSignin').addEventListener('click', () => {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('signinForm').style.display = 'block';
});
async function loadProducts() {
    const res = await fetch('https://dip392-etik.onrender.com/api/products');
    const data = await res.json();

    const flashSlider = document.querySelector('.flash-discounts .slider');
    const chosenSlider = document.querySelector('.chosen-for-you .slider');

    data.forEach(product => {
        const frame = document.createElement('div');
        frame.className = 'frame';
        frame.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}" style="width: 120px; height: 110px; object-fit: contain; margin-bottom: 2px;">
            <p>${product.title} - $${product.price} - From ${product.storeName}</p>
        `;

        flashSlider.appendChild(frame.cloneNode(true));
        chosenSlider.appendChild(frame.cloneNode(true));
    });
}

window.addEventListener('DOMContentLoaded', loadProducts);
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.querySelector('.dropdown-content').style.display = 'block';
    }
});
