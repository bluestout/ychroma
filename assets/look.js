class YasColorChangeLook extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onVariantChange);
  }

  onVariantChange() {
    this.indexProd();
    this.updateImageVar();
    this.updateOptions();
    this.updateMasterId()
    
  }


  indexProd(){
    this.parent_wrapp = this.closest('.yas_look_wrapp');
    this.active_prod = this.parent_wrapp.querySelector('.yas-look-slider').swiper.activeIndex;
   // console.log(this.active_prod)
  }

  updateImageVar(){   
    this.parent_wrapp.querySelectorAll(`.yas-look-slider_second_image img`)[this.active_prod].src = this.getAttribute('data-varimg');
    this.json_prod = this.parent_wrapp.querySelectorAll(`.yas-look-slider_second_image [type="application/json"]`)[this.active_prod];

    let wrappColor = this.closest('.yas-look-slider_color');
    let elColor = wrappColor.querySelectorAll('color-look');
    elColor.forEach(elColor => {       
          elColor.setAttribute('cheked', 'false');
    });

    this.setAttribute('cheked', 'true');
    
    this.color = this.getAttribute('data-varcolor');
    this.size_curent = document.querySelector(`custom-select[data-tag=${this.getAttribute('data-typetag')}] [cheked='true']`).getAttribute('data-val');
    
   // console.log(this.getAttribute('data-varimg'));
  }

  updateOptions() {
    this.options = [this.color, this.size_curent]; 
  }
  
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {    
        return this.options[index] === option;
      }).includes(false);
    });

    this.parent_wrapp.querySelectorAll(`.yas-look-slider_second_image`)[this.active_prod].setAttribute('data-variantid', this.currentVariant.id);
    
  }

  
  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.json_prod.textContent);
    return this.variantData;
  }
  
}

customElements.define('color-look', YasColorChangeLook);


class YasCustomSelectLook extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', this.onVariantChange);
  }

  onVariantChange() {
    this.onclick_variant()
    this.toogleSelect();
    
    //this.indexProd();
   // this.updateImageVar();
  }


  toogleSelect(){
    this.selectOpen = this.querySelector('.custom-select-form-wrapp').getAttribute('data-open');
    if(this.selectOpen != 'true'){
      this.querySelector('.custom-select-form-wrapp').setAttribute('data-open', 'true');
    }else{
      this.querySelector('.custom-select-form-wrapp').setAttribute('data-open', 'false');
    }

  }

  onclick_variant(){
      let soption = this.querySelectorAll(".popcustom_select-var");
      let disable = this.querySelectorAll(".popcustom_select-var");
      soption.forEach(soption => {       
        soption.addEventListener('click', () => {
          disable.forEach(disable => {disable.setAttribute('cheked', 'false')});
          soption.setAttribute('cheked', 'true');
          this.querySelector('.popcustom_select-title span').innerHTML = soption.getAttribute('data-val');
          this.option_value = soption.getAttribute('data-val');
          
          this.updateIdItem();
        })
        
      });
      
  }
  
  updateIdItem(){
      let value = this.querySelector('.popcustom_select-var[cheked="true"]').getAttribute('data-val');
      let wrappSection = this.closest('.yas_look_collect');
      let color = wrappSection.querySelectorAll('.yas_look_slider-main .yas-look-slider_color');
      
      color.forEach((color, index) => {
        let tagColor = color.querySelector('[cheked="true"]').getAttribute('data-typetag');
        if(this.getAttribute('data-tag') == tagColor){
          let json_prod = wrappSection.querySelectorAll(`.yas-look-slider_second_image [type="application/json"]`)[index];
          let val_color = color.querySelector('[cheked="true"]').getAttribute('data-varcolor');
          let options = [val_color, this.option_value];
          let variantData = JSON.parse(json_prod.textContent);
  
          let currentVariant = variantData.find((variant) => {
            return !variant.options.map((option, index) => {    
              return options[index] === option;
            }).includes(false);
          });
      
          wrappSection.querySelectorAll(`.yas-look-slider_second_image`)[index].setAttribute('data-variantid', currentVariant.id);
        }        
      })
    
      
  }
 
  
  
}

customElements.define('custom-select', YasCustomSelectLook);


/*
class VariantSelectsYas extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();
   
    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
    //  this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value); 
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;

    const mediaGallery = document.getElementById(`MediaGallery-${this.dataset.section}`);
    mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true);

    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    if (!modalContent) return;
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    modalContent.prepend(newMediaModal);
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects-yas', VariantSelectsYas);

class VariantRadiosYas extends VariantSelectsYas {
  constructor() {
    super();
  }
  
 

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
 
  }
  
}

customElements.define('variant-radios', VariantRadios);
*/