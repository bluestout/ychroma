upcartOnCartLoaded = (cart) => {
	const widget = document.querySelector('#CartPopup');
	const container = widget.querySelector('.upcart-checkout-button-container');
	const message = `
		<div class="upcart-es-message-wrapper">
			<div class="upcart-es-message-wrapper--item">
				<img src="https://cdn.shopify.com/s/files/1/0620/1648/7614/files/Group_42.svg?v=1734504740">
				<span>100% Satisfaction Guarantee</span>
			</div>
			<div class="upcart-es-message-wrapper--item">
				<img src="https://cdn.shopify.com/s/files/1/0620/1648/7614/files/Group_41.svg?v=1734504740">
				<span>Hassle-Free <br>90-Day Returns</span>
			</div>
		</div>
	`;

	console.log(container);

	const messageElement = document.createElement('div');
	messageElement.innerHTML = message;

	container.append(messageElement);
}