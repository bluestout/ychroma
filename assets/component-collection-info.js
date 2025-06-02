function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

if (!customElements.get('collection-info')) {
  customElements.define(
    'collection-info',
    class CollectionInfo extends HTMLElement {
      constructor() {
        super();
        this.filterForm = document.getElementById('filters-form');
        this.randomToggle = document.getElementById('random-toggle');
        this.filterOptions = document.querySelectorAll('.filter-option');
        this.filterButtons = document.querySelectorAll('.filter-close');
        this.filterClearAll = document.querySelector('.active-filter-clear-all');
        this.filterHeading = document.querySelector('.facets__heading');
        this.filterSections = document.querySelector('.filter-sections');

        this.init();
      }

      init() {
        // Initialize event listeners
        if (this.randomToggle) {
          this.randomToggle.addEventListener('change', this.handleRandomToggle.bind(this));
        }

        if (this.filterOptions.length) {
          this.filterOptions.forEach(option => {
            option.addEventListener('click', this.handleFilterOptionClick.bind(this, option));
          });
        }

        if (this.filterButtons.length) {
          this.filterButtons.forEach(button => {
            button.addEventListener('click', this.handleRemoveFilter.bind(this, button));
          });
        }

        if (this.filterClearAll) {
          this.filterClearAll.addEventListener('click', this.handleClearAllFilters.bind(this));
        }

        // Add click event for Filter & Sort dropdown
        if (this.filterHeading) {
          this.filterHeading.addEventListener('click', this.toggleFilterDropdown.bind(this));
        }
      }

      toggleFilterDropdown(event) {
        if (this.filterSections) {
          this.filterSections.classList.toggle('open');
        }
      }

      handleRandomToggle(event) {
        // Logic for random toggle
        const isRandom = event.target.checked;
        if (isRandom) {
          // Apply random sorting
          this.applyFilter('sort_by', 'random');
        } else {
          // Remove random sorting and set default sorting
          this.applyFilter('sort_by', 'manual');
        }
      }

      handleFilterOptionClick(option) {
        const filterType = option.dataset.filterType || 'sort_by';
        const filterValue = option.dataset.value;
        
        // For sort options, deactivate all other sort options
        if (filterType === 'sort_by') {
          const sortOptions = document.querySelectorAll('.filter-option[data-value]');
          sortOptions.forEach(sortOption => {
            sortOption.classList.remove('active');
          });
          option.classList.add('active');
          
          // Also update the random toggle if needed
          if (filterValue === 'random') {
            if (this.randomToggle) this.randomToggle.checked = true;
          } else {
            if (this.randomToggle) this.randomToggle.checked = false;
          }
        } else {
          // For other filter types, toggle active state
          option.classList.toggle('active');
        }
        
        if (option.classList.contains('active')) {
          this.applyFilter(filterType, filterValue);
        } else {
          this.removeFilter(filterType, filterValue);
        }
      }

      handleRemoveFilter(button) {
        // Get the URL from data attribute and redirect
        const url = button.getAttribute('data-render-section-url');
        if (url) {
          window.location.href = url;
        }
      }

      handleClearAllFilters() {
        // Get the URL from data attribute and redirect
        const url = this.filterClearAll.getAttribute('data-render-section-url');
        if (url) {
          window.location.href = url;
        }
      }

      applyFilter(type, value) {
        // Apply filter by modifying URL and redirecting
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        
        if (type === 'sort_by') {
          params.set(type, value);
        } else {
          params.set(`filter.${type}`, value);
        }
        
        url.search = params.toString();
        window.location.href = url.toString();
      }

      removeFilter(type, value) {
        // Remove filter by modifying URL and redirecting
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        
        if (type === 'sort_by') {
          params.delete(type);
        } else {
          params.delete(`filter.${type}`);
        }
        
        url.search = params.toString();
        window.location.href = url.toString();
      }

      get form() {
        return this.querySelector('collection-info form');
      }

      updateSourceFromDestination = (html, id) => {
        const source = html.getElementById(`${id}`);
        const destination = this.querySelector(`#${id}`);
        if (source && destination) {
          destination.innerHTML = source.innerHTML;
        }
      };

      updateURL(searchParams) {
        history.pushState({}, '', `${window.location.pathname}?${searchParams}`);
      }

      updateFilters = (html, className) => {
        const filtersFromFetch = html.querySelectorAll(`collection-info .${className}`);
        const filtersFromDom = document.querySelectorAll(`collection-info .${className}`);

        // Remove filters that are no longer returned from the server
        Array.from(filtersFromDom).forEach((currentElement) => {
          if (!Array.from(filtersFromFetch).some(({ id }) => currentElement.id === id)) {
            currentElement.remove();
          }
        });

        Array.from(filtersFromFetch).forEach((elementToRender, index) => {
          document.getElementById(elementToRender.id).innerHTML = elementToRender.innerHTML;
        });
      };

      showLoadingOverlay = () => {
        const loadingOverlay = this.querySelector(`#loading-overlay-${this.dataset.section}`);
        const loadingSpinner = this.querySelector(`#loading-spinner-${this.dataset.section}`);
        const resultsCount = this.querySelector(`#results-count-${this.dataset.section}`);
        const drawerResultsCount = this.querySelector(`#drawer-results-count-${this.dataset.section}`);
        const drawerLoadingSpinner = this.querySelector(`#drawer-loading-spinner-${this.dataset.section}`);
        
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        if (resultsCount) resultsCount.style.display = 'none';
        if (drawerResultsCount) drawerResultsCount.style.display = 'none';
        if (drawerLoadingSpinner) drawerLoadingSpinner.style.display = 'block';
      };

      hideLoadingOverlay = () => {
        const loadingOverlay = this.querySelector(`#loading-overlay-${this.dataset.section}`);
        const loadingSpinner = this.querySelector(`#loading-spinner-${this.dataset.section}`);
        const resultsCount = this.querySelector(`#results-count-${this.dataset.section}`);
        const drawerResultsCount = this.querySelector(`#drawer-results-count-${this.dataset.section}`);
        const drawerLoadingSpinner = this.querySelector(`#drawer-loading-spinner-${this.dataset.section}`);
        
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (resultsCount) resultsCount.style.display = 'block';
        if (drawerResultsCount) drawerResultsCount.style.display = 'block';
        if (drawerLoadingSpinner) drawerLoadingSpinner.style.display = 'none';
      };

      fetchSection = (searchParams) => {
        this.showLoadingOverlay();
        fetch(`${window.location.pathname}?section_id=${this.dataset.section}&${searchParams}`)
          .then((response) => response.text())
          .then((responseText) => {
            let html = new DOMParser().parseFromString(responseText, 'text/html');
            this.updateURL(searchParams);
            this.updateSourceFromDestination(html, `product-grid-${this.dataset.section}`);
            this.updateSourceFromDestination(html, `results-count-${this.dataset.section}`);
            this.updateSourceFromDestination(html, `drawer-results-count-${this.dataset.section}`);
            this.updateSourceFromDestination(html, `active-filter-group-${this.dataset.section}`);
            this.updateSourceFromDestination(html, `sort-by-drawer-${this.dataset.section}`);
            this.updateSourceFromDestination(html, `sort-by-${this.dataset.section}`);
            this.updateFilters(html, `js-filter`);            
            this.hideLoadingOverlay();
          })
          .catch((error) => {
            console.error(error);
            this.hideLoadingOverlay();
          });
      };
    }
  );
}