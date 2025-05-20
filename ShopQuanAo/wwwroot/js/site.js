// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

        // Cart functionality
        let cart = [];
        let cartTotal = 0;
        
        // Sample product data
        const products = [
            { id: 1, name: 'Áo Thun Unisex', price: 350000, image: '/placeholder.svg?height=70&width=70' },
            { id: 2, name: 'Quần Jeans Nam', price: 450000, image: '/placeholder.svg?height=70&width=70' },
            { id: 3, name: 'Áo Khoác Nữ', price: 550000, image: '/placeholder.svg?height=70&width=70' },
            { id: 4, name: 'Giày Sneaker', price: 650000, image: '/placeholder.svg?height=70&width=70' }
        ];
        
        // Format price
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '₫';
        }
        
        // Toggle cart modal
        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.toggle('active');
        }
        
        // Update cart count
        function updateCartCount() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Show/hide empty cart or filled cart
            const emptyCart = document.getElementById('emptyCart');
            const filledCart = document.getElementById('filledCart');
            
            if (totalItems === 0) {
                emptyCart.style.display = 'block';
                filledCart.style.display = 'none';
            } else {
                emptyCart.style.display = 'none';
                filledCart.style.display = 'block';
            }
        }
        
        // Update cart totals
        function updateCartTotals() {
            const subtotal = document.getElementById('subtotal');
            const discount = document.getElementById('discount');
            const total = document.getElementById('total');
            
            cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            subtotal.textContent = formatPrice(cartTotal);
            discount.textContent = formatPrice(0);
            total.textContent = formatPrice(cartTotal);
        }
        
        // Render cart items
        function renderCartItems() {
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = '';
            
            cart.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <span>${item.name}</span>
                        </div>
                    </td>
                    <td>${formatPrice(item.price)}</td>
                    <td>
                        <div class="quantity-control">
                            <div class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</div>
                            <div class="quantity-value">${item.quantity}</div>
                            <div class="quantity-btn" onclick="increaseQuantity(${item.id})">+</div>
                        </div>
                    </td>
                    <td>${formatPrice(item.price * item.quantity)}</td>
                    <td>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                
                cartItems.appendChild(row);
            });
        }
        
        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                updateCartCount();
                updateCartTotals();
                renderCartItems();
                toggleCart();
            }
        }
        
        // Decrease quantity
        function decreaseQuantity(productId) {
            const index = cart.findIndex(item => item.id === productId);
            
            if (index !== -1) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                
                updateCartCount();
                updateCartTotals();
                renderCartItems();
            }
        }
        
        // Increase quantity
        function increaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += 1;
                updateCartCount();
                updateCartTotals();
                renderCartItems();
            }
        }
        
        // Remove from cart
        function removeFromCart(productId) {
            const index = cart.findIndex(item => item.id === productId);
            
            if (index !== -1) {
                cart.splice(index, 1);
                updateCartCount();
                updateCartTotals();
                renderCartItems();
            }
        }
        
        // Initialize cart
        updateCartCount();
    