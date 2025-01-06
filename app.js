// Constants
const API_BASE_URL = 'https://openlibrary.org/search.json';
const COVER_API_URL = 'https://covers.openlibrary.org/b/id';

class BookSearchUI {
  constructor() {
    this.elements = {
      searchInput: document.getElementById('searchInput'),
      searchButton: document.getElementById('searchButton'),
      resultsList: document.getElementById('resultsList'),
      loadingSpinner: document.getElementById('loadingSpinner'),
      emptyTextAlert: document.getElementById('emptyTextAlert'),
      bookDetails: document.getElementById('bookDetails')
    };
    
    this.searchData = null;
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.elements.searchButton.addEventListener('click', () => this.handleSearch());
    this.elements.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this.handleSearch();
    });
    this.elements.resultsList.addEventListener('click', (event) => this.handleBookSelection(event));
  }

  toggleLoadingState(show) {
    this.elements.loadingSpinner.classList.toggle('d-block', show);
    this.elements.loadingSpinner.classList.toggle('d-none', !show);
  }

  validateSearchQuery(query) {
    const isValid = query?.trim().length > 0;
    this.elements.emptyTextAlert.classList.toggle('d-none', isValid);
    return isValid;
  }

  async handleSearch() {
    const query = this.elements.searchInput.value;
    if (!this.validateSearchQuery(query)) return;

    try {
      this.toggleLoadingState(true);
      const searchResults = await this.fetchSearchResults(query);
      this.searchData = searchResults;
      this.renderSearchResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      this.renderError();
    } finally {
      this.toggleLoadingState(false);
    }
  }

  async fetchSearchResults(query) {
    const params = new URLSearchParams({
      title: query,
      fields: 'title,cover_i,author_name,first_publish_year,subject,author_key'
    });

    const response = await fetch(`${API_BASE_URL}?${params}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  renderSearchResults(data) {
    if (!data.docs?.length) {
      this.renderNoResults();
      return;
    }

    this.elements.resultsList.innerHTML = data.docs
      .map(book => this.createBookCard(book))
      .join('');
  }

  createBookCard(book) {
    return `
      <div class="col-12 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${this.escapeHtml(book.title)}</h5>
            <p class="card-text">Author: ${this.formatAuthors(book.author_name)}</p>
            <button class="btn btn-primary btn-sm" data-book-title="${this.escapeHtml(book.title)}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  handleBookSelection(event) {
    if (!event.target.matches('.btn-primary')) return;
    
    const bookTitle = event.target.dataset.bookTitle;
    const book = this.searchData?.docs.find(b => b.title === bookTitle);
    if (book) this.renderBookDetails(book);
  }

  renderBookDetails(book) {
    const coverUrl = book.cover_i ? `${COVER_API_URL}/${book.cover_i}-L.jpg` : '';
    this.elements.bookDetails.innerHTML = `
      ${coverUrl ? `<img class="responsive" src="${coverUrl}" alt="${this.escapeHtml(book.title)}"/>` : ''}
      <h3>${this.escapeHtml(book.title)}</h3>
      <p><strong>Author:</strong> ${this.formatAuthors(book.author_name)}</p>
      <p><strong>First Published:</strong> ${book.first_publish_year || 'N/A'}</p>
      <p class="d-inline-block text-truncate">
        <strong>Subjects:</strong> ${this.formatSubjects(book.subject)}
      </p>
    `;
  }

  renderNoResults() {
    this.elements.resultsList.innerHTML = `
      <div class="col-12">
        <p class="text-center">No results found</p>
      </div>
    `;
  }

  renderError() {
    this.elements.resultsList.innerHTML = `
      <div class="col-12">
        <p class="text-center text-danger">Error fetching data</p>
      </div>
    `;
  }

  formatAuthors(authors) {
    return authors?.join(', ') || 'Unknown Author';
  }

  formatSubjects(subjects) {
    return subjects?.join(', ') || 'N/A';
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Initialize the application
const bookSearch = new BookSearchUI();