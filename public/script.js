document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Send to backend
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      incrementCart();
    })
    .catch(err => console.error('Error:', err));
  });
});

function incrementCart() {
  const cartCount = document.getElementById('cart-count');
  let count = parseInt(cartCount.textContent);
  cartCount.textContent = count + 1;
}
