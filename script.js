document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
    }
});

const adjustMenuVisibility = () => {
    if (window.innerWidth > 768) {
        menuToggle.style.display = 'none';
        mobileNav.classList.remove('open');
    } else {
        menuToggle.style.display = 'block';
    }
};

window.addEventListener('resize', adjustMenuVisibility);
window.addEventListener('DOMContentLoaded', adjustMenuVisibility);

const lazyImages = document.querySelectorAll('img.lazy');
const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
};

const observer = new IntersectionObserver(lazyLoad, {
    root: null,
    threshold: 0.1
});

lazyImages.forEach(img => observer.observe(img));

const scrollReveal = document.querySelectorAll('.category, .hero-content, #categories h2');
const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealOnScroll, {
    root: null,
    threshold: 0.2
});

scrollReveal.forEach(item => revealObserver.observe(item));

document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (event) => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const isMenuOpen = menu.style.display === 'flex';

        document.querySelectorAll('.dropdown-menu').forEach(item => item.style.display = 'none');
        
        if (!isMenuOpen) {
            menu.style.display = 'flex';
        }
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
    }
});

const categories = document.querySelectorAll('.category');

categories.forEach(category => {
    category.addEventListener('mouseenter', () => {
        categories.forEach(cat => cat !== category && cat.classList.add('category-blurred'));
    });

    category.addEventListener('mouseleave', () => {
        categories.forEach(cat => cat.classList.remove('category-blurred'));
    });
});

const sidebar = document.getElementById('sidebar');
const cartIcons = document.querySelectorAll('.cart-icon');
const cartBadge = document.querySelector('.cart-badge');
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const closeCartButton = document.querySelector('#cart-close-button');

let cart = [];

cartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.category');
        const title = card.querySelector('h3').innerText;
        const priceText = card.querySelector('.price').innerText;
        const price = parseInt(priceText.replace(/\D/g, ''));

        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        updateCartUI();
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong, silakan tambahkan barang!</p>';
        cartBadge.style.display = 'none';
        cartCount.textContent = '0';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span class="cart-item-price">${item.quantity} x Rp.${item.price.toLocaleString()}</span>
                <button class="decrease-quantity" data-index="${index}">-</button>
                <button class="increase-quantity" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
            totalItems += item.quantity;
        });

        cartTotalElement.innerText = `Rp.${total.toLocaleString()}`;
        cartBadge.innerText = totalItems;
        cartBadge.style.display = 'inline-block';
        cartCount.textContent = totalItems;
    }
}

const handleQuantityChange = (e) => {
    const index = e.target.dataset.index;
    const item = cart[index];

    if (e.target.classList.contains('decrease-quantity')) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(index, 1);
        }
    }

    if (e.target.classList.contains('increase-quantity')) {
        item.quantity++;
    }

    updateCartUI();
};

const handleRemoveItem = (e) => {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    updateCartUI();
};

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('decrease-quantity') || e.target.classList.contains('increase-quantity')) {
        handleQuantityChange(e);
    }

    if (e.target.classList.contains('remove-item')) {
        handleRemoveItem(e);
    }
});

if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

const adjustSidebarForSmallScreens = () => {
    if (window.innerWidth < 768) {
        sidebar.style.width = '100%'; 
    } else {
        sidebar.style.width = '350px';
    }
};

window.addEventListener('resize', adjustSidebarForSmallScreens);
window.addEventListener('DOMContentLoaded', adjustSidebarForSmallScreens);
