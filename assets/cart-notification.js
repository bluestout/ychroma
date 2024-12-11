class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);
    
    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add('animate', 'active');

    this.notification.addEventListener('transitionend', () => {
      this.notification.focus();
      trapFocus(this.notification);
    }, { once: true });

    document.body.addEventListener('click', this.onBodyClick);
  }

  close() {
    this.notification.classList.remove('active');

    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  addDiscountFree(count){
    let shopDomain = "www.ychroma.com";
    let discountCode = "FREESHIPPING";
    let discountApplyUrl = "https://" + shopDomain + "/discount/" + discountCode;
    if(count > 2){
    // Applies discount using hidden iframe to the checkout session
    let i = document.createElement('iframe');
    i.style.display = 'none';
    i.onload = function() { i.parentNode.removeChild(i); };
    i.src=discountApplyUrl;
    document.body.appendChild(i);
    }else{
      discountCode = "none";
      discountApplyUrl = "https://" + shopDomain + "/discount/" + discountCode;
      let i = document.createElement('iframe');
      i.style.display = 'none';
      i.onload = function() { i.parentNode.removeChild(i); };
      i.src=discountApplyUrl;
      document.body.appendChild(i);
    }
  }
  
  renderContents(parsedState) {
      this.cartItemKey = parsedState.key;
      this.getSectionsToRender().forEach((section => {
        document.getElementById(section.id).innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      }));

      var cartContents = fetch(window.Shopify.routes.root + 'cart.js')
      .then(response => response.json())
      .then(data => { 
        // data.item_count > 2 ? document.querySelector('#cart-notification-form [name="discount"]').setAttribute('value', 'FREESHIPPING') : document.querySelector('#cart-notification-form [name="discount"]').setAttribute('value', '');
        
        this.addDiscountFree(data.item_count)
        });
     
       
    
      if (this.header) this.header.reveal();
      this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: 'cart-notification-button'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure, header-menu');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
