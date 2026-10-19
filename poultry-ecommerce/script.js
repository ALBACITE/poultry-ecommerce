const STORAGE_KEY = "cluckcoop_products_v1";
const CART_STORAGE_KEY = "cluckcoop_cart_v1";
const DEMO_ADMIN_PIN = "1234";

const AGE_LABELS = {
  "4-month": "4 Months",
  "5-month": "5 Months",
  "6-month-plus": "6 Months & Older",
};

const sampleProducts = [
  {
    id: "p1",
    name: "White Leghorn Hen",
    breed: "Leghorn",
    age: "5-month",
    price: 320,
    stock: "In Stock",
    image: "assets/img/chicken.svg",
    description: "A prolific white egg layer known for high production and active temperament. Great for small farms and backyard coops.",
    characteristics: "White feathers, active, hardy, lays ~280-320 white eggs per year."
  },
  {
    id: "p2",
    name: "Rhode Island Red Pullet",
    breed: "Rhode Island Red",
    age: "4-month",
    price: 280,
    stock: "In Stock",
    image: "assets/img/chicken.svg",
    description: "Young reddish-brown pullet, dual-purpose breed suitable for both eggs and meat. Friendly and cold-hardy.",
    characteristics: "Reddish-brown plumage, docile, lays ~250 brown eggs per year, good foragers."
  },
  {
    id: "p3",
    name: "Broiler Cross Rooster",
    breed: "Cornish Cross",
    age: "4-month",
    price: 350,
    stock: "Low Stock",
    image: "assets/img/chicken.svg",
    description: "Fast-growing meat bird with excellent feed conversion. Ready for the table or growing out further.",
    characteristics: "White feathers, broad breast, rapid weight gain, calm disposition."
  },
  {
    id: "p4",
    name: "Plymouth Rock Hen",
    breed: "Plymouth Rock",
    age: "6-month-plus",
    price: 400,
    stock: "In Stock",
    image: "assets/img/chicken.svg",
    description: "Fully mature layer hen with classic barred black-and-white plumage. Reliable brown egg producer.",
    characteristics: "Barred black-and-white feathers, friendly, cold-hardy, lays ~200 brown eggs per year."
  },
  {
    id: "p5",
    name: "Sussex Chicken",
    breed: "Sussex",
    age: "5-month",
    price: 340,
    stock: "In Stock",
    image: "assets/img/chicken.svg",
    description: "Dual-purpose speckled hen with a curious personality. Good layer and table bird for family farms.",
    characteristics: "Speckled plumage, alert, docile, lays ~250 tinted eggs per year."
  },
  {
    id: "p6",
    name: "Orpington Hen",
    breed: "Buff Orpington",
    age: "6-month-plus",
    price: 420,
    stock: "Out of Stock",
    image: "assets/img/chicken.svg",
    description: "Mature fluffy golden hen, excellent broody mother and steady winter layer. A favorite backyard breed.",
    characteristics: "Buff golden feathers, fluffy, very docile, lays ~180-200 brown eggs per year."
  },
  {
    id: "p7",
    name: "Australorp Pullet",
    breed: "Australorp",
    age: "5-month",
    price: 310,
    stock: "In Stock",
    image: "assets/img/chicken.svg",
    description: "Black-feathered pullet famous for record egg production. Quiet, gentle, and easy to handle.",
    characteristics: "Black plumage with green sheen, calm, record layer of ~250 brown eggs per year."
  },
  {
    id: "p8",
    name: "Brahma Rooster",
    breed: "Brahma",
    age: "6-month-plus",
    price: 480,
    stock: "Low Stock",
    image: "assets/img/chicken.svg",
    description: "Large mature rooster with feathered feet. Gentle giant breed, good for breeding flocks and exhibition.",
    characteristics: "Large size, feathered legs, gentle, quiet, cold-tolerant heritage breed."
  },
];

function getProducts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProducts));
    return sampleProducts.slice();
  }
  return JSON.parse(raw);
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Cart
function getCart() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = count;
}

function addToCart(id) {
  const products = getProducts();
  const p = products.find((x) => x.id === id);
  if (!p) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  renderCart();
  alert(`${p.name} added to cart. (Demo — no real checkout.)`);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

function formatPrice(p) {
  return "₱" + p.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function stockClass(stock) {
  const s = (stock || "").toLowerCase();
  if (s === "low stock") return "stock-low";
  if (s === "out of stock") return "stock-out";
  return "";
}

function renderProducts(products) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";
  const noResults = document.getElementById("noResults");
  if (products.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='assets/img/chicken.svg'">
        <span class="availability-badge ${stockClass(p.stock)}">${p.stock}</span>
      </div>
      <div class="product-info">
        <div class="age">${AGE_LABELS[p.age] || p.age}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="breed">${escapeHtml(p.breed)}</div>
        <span class="product-price">${formatPrice(p.price)}</span>
        <div class="product-actions">
          <button class="btn btn-outline view-btn" data-id="${p.id}">Details</button>
          <button class="btn btn-primary add-btn" data-id="${p.id}" ${p.stock.toLowerCase() === "out of stock" ? "disabled" : ""}>
            ${p.stock.toLowerCase() === "out of stock" ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function renderFeatured() {
  const featuredGrid = document.getElementById("featuredGrid");
  featuredGrid.innerHTML = "";
  const featured = getProducts().slice(0, 4);
  featured.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='assets/img/chicken.svg'">
        <span class="availability-badge ${stockClass(p.stock)}">${p.stock}</span>
      </div>
      <div class="product-info">
        <div class="age">${AGE_LABELS[p.age] || p.age}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="breed">${escapeHtml(p.breed)}</div>
        <span class="product-price">${formatPrice(p.price)}</span>
        <div class="product-actions">
          <button class="btn btn-outline view-btn" data-id="${p.id}">Details</button>
          <button class="btn btn-primary add-btn" data-id="${p.id}" ${p.stock.toLowerCase() === "out of stock" ? "disabled" : ""}>
            ${p.stock.toLowerCase() === "out of stock" ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    `;
    featuredGrid.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getFilteredProducts() {
  return getProducts().filter((p) => {
    const ageMatch = currentAge === "all" || p.age === currentAge;
    const term = currentSearch.toLowerCase();
    const searchMatch =
      p.name.toLowerCase().includes(term) ||
      p.breed.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term);
    return ageMatch && searchMatch;
  });
}

function renderShop() {
  renderProducts(getFilteredProducts());
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems) return;

  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.classList.remove("hidden");
    if (cartFooter) cartFooter.classList.add("hidden");
    return;
  }

  if (cartEmpty) cartEmpty.classList.add("hidden");
  if (cartFooter) cartFooter.classList.remove("hidden");

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${escapeHtml(item.name)}" onerror="this.src='assets/img/chicken.svg'">
      <div class="cart-item-info">
        <h4>${escapeHtml(item.name)}</h4>
        <p>${formatPrice(item.price)} each</p>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
        <button class="btn-remove" data-id="${item.id}">Remove</button>
      </div>
      <p style="font-weight:700;color:var(--dark)">${formatPrice(itemTotal)}</p>
    `;
    cartItems.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = formatPrice(total);

  // wire cart item buttons
  cartItems.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeQty(btn.dataset.id, parseInt(btn.dataset.delta, 10));
    });
  });
  cartItems.querySelectorAll(".btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

const productGrid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");
const modalAddBtn = document.getElementById("modalAddToCart");

let currentProduct = null;
let currentAge = "all";
let currentSearch = "";

function openDetails(id) {
  const p = getProducts().find((x) => x.id === id);
  if (!p) return;
  currentProduct = p;
  document.getElementById("modalImage").src = p.image;
  document.getElementById("modalImage").alt = p.name;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalBreed").textContent = p.breed;
  document.getElementById("modalAge").textContent = AGE_LABELS[p.age] || p.age;
  document.getElementById("modalPrice").textContent = formatPrice(p.price);
  document.getElementById("modalAvailability").textContent = p.stock;
  document.getElementById("modalCharacteristics").textContent = p.characteristics;
  document.getElementById("modalDescription").textContent = p.description;
  const addBtn = document.getElementById("modalAddToCart");
  addBtn.disabled = p.stock.toLowerCase() === "out of stock";
  addBtn.textContent = p.stock.toLowerCase() === "out of stock" ? "Out of Stock" : "Add to Cart";
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
  currentProduct = null;
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.getElementById("modalAddToCart").addEventListener("click", () => {
  if (currentProduct) addToCart(currentProduct.id);
});

// Event delegation for product cards (fixes buttons not wiring up)
function wireGrid(grid) {
  grid.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".view-btn");
    if (viewBtn) {
      e.preventDefault();
      openDetails(viewBtn.dataset.id);
      return;
    }
    const addBtn = e.target.closest(".add-btn");
    if (addBtn) {
      e.preventDefault();
      addToCart(addBtn.dataset.id);
      return;
    }
  });
}

wireGrid(productGrid);
wireGrid(featuredGrid);

// Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentAge = btn.dataset.age;
    renderShop();
  });
});

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderShop();
});

// Category shortcut links (e.g. #shop?age=4-month)
function handleCategoryHash() {
  const hash = location.hash;
  const match = hash.match(/#shop\?age=([^&]+)/);
  if (match) {
    const age = match[1];
    currentAge = age;
    filterBtns.forEach((b) => b.classList.toggle("active", b.dataset.age === age));
    renderShop();
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

// Cart UI
const cartLink = document.getElementById("cartLink");
const closeCartBtn = document.getElementById("closeCart");
const cartCheckoutBtn = document.getElementById("cartCheckout");

if (cartLink) {
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    renderCart();
    const el = document.getElementById("cart");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
}
if (cartCheckoutBtn) {
  cartCheckoutBtn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Checkout is a demo only. No real payment processing in this school project.");
  });
}

// Admin dashboard
const adminToggle = document.getElementById("adminToggle");
const adminSection = document.getElementById("admin");
const closeAdminBtn = document.getElementById("closeAdmin");
const adminForm = document.getElementById("adminForm");
const editIdInput = document.getElementById("editId");
const resetFormBtn = document.getElementById("resetForm");
const adminTableBody = document.getElementById("adminTableBody");

let isAdmin = false;

adminToggle.addEventListener("click", (e) => {
  e.preventDefault();
  if (isAdmin) {
    closeAdminView();
    return;
  }
  const pin = prompt("Enter demo admin PIN (school project demo):");
  if (pin === DEMO_ADMIN_PIN) {
    isAdmin = true;
    adminSection.classList.remove("hidden");
    adminSection.scrollIntoView({ behavior: "smooth" });
    renderAdminTable();
  } else {
    alert("Incorrect PIN. Admin access is demo-only and not secure.");
  }
});

closeAdminBtn.addEventListener("click", closeAdminView);

function closeAdminView() {
  isAdmin = false;
  adminSection.classList.add("hidden");
  adminForm.reset();
  editIdInput.value = "";
}

function renderAdminTable() {
  adminTableBody.innerHTML = "";
  const products = getProducts();
  products.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img class="admin-img" src="${p.image}" alt="" onerror="this.src='assets/img/chicken.svg'"></td>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.breed)}</td>
      <td>${AGE_LABELS[p.age] || p.age}</td>
      <td>${formatPrice(p.price)}</td>
      <td><span class="availability-badge ${stockClass(p.stock)}" style="font-size:0.75rem; padding:0.2rem 0.5rem;">${p.stock}</span></td>
      <td class="admin-actions">
        <button class="btn btn-edit edit-btn" data-id="${p.id}">Edit</button>
        <button class="btn btn-danger delete-btn" data-id="${p.id}">Delete</button>
      </td>
    `;
    adminTableBody.appendChild(tr);
  });

  adminTableBody.querySelectorAll(".edit-btn").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = getProducts().find((x) => x.id === b.dataset.id);
      if (!p) return;
      editIdInput.value = p.id;
      document.getElementById("fName").value = p.name;
      document.getElementById("fBreed").value = p.breed;
      document.getElementById("fAge").value = p.age;
      document.getElementById("fPrice").value = p.price;
      document.getElementById("fStock").value = p.stock;
      document.getElementById("fImage").value = p.image;
      document.getElementById("fDesc").value = p.description;
      document.getElementById("fChar").value = p.characteristics;
      adminSection.scrollIntoView({ behavior: "smooth" });
    })
  );

  adminTableBody.querySelectorAll(".delete-btn").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!confirm("Delete this chicken listing?")) return;
      const products = getProducts().filter((x) => x.id !== b.dataset.id);
      saveProducts(products);
      renderAdminTable();
      renderShop();
      renderFeatured();
    })
  );
}

resetFormBtn.addEventListener("click", () => {
  adminForm.reset();
  editIdInput.value = "";
});

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = editIdInput.value;
  const product = {
    id: id || "p" + Date.now(),
    name: document.getElementById("fName").value.trim(),
    breed: document.getElementById("fBreed").value.trim(),
    age: document.getElementById("fAge").value,
    price: parseFloat(document.getElementById("fPrice").value) || 0,
    stock: document.getElementById("fStock").value,
    image: document.getElementById("fImage").value.trim() || "assets/img/chicken.svg",
    description: document.getElementById("fDesc").value.trim(),
    characteristics: document.getElementById("fChar").value.trim(),
  };

  const products = getProducts();
  if (id) {
    const idx = products.findIndex((x) => x.id === id);
    if (idx >= 0) products[idx] = product;
  } else {
    products.push(product);
  }
  saveProducts(products);
  adminForm.reset();
  editIdInput.value = "";
  renderAdminTable();
  renderShop();
  renderFeatured();
  alert("Listing saved.");
});

// Init
handleCategoryHash();
window.addEventListener("hashchange", handleCategoryHash);
renderShop();
renderFeatured();
updateCartCount();
renderCart();
