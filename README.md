# Book-search-website

# 📚 Book Search Website

A modern JavaScript website for searching and displaying book information using the OpenLibrary API.

## ✨ Features

- 🔍 Real-time book search
- 📱 Responsive card-based results
- 📖 Detailed book information view
- ⚡ Loading state management
- 🛡️ Error handling and validation
- 🌐 Cross-browser compatibility

## 🚀 Installation

### 1. Add Bootstrap CSS:
```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

### 2. Add HTML Structure:
```html
<div class="container">
  <div class="row">
    <div class="col-12">
      <input type="text" id="searchInput" class="form-control" placeholder="Search books...">
      <div id="emptyTextAlert" class="alert alert-danger d-none">Please enter a search term</div>
      <button id="searchButton" class="btn btn-primary">Search</button>
    </div>
  </div>
  <div id="loadingSpinner" class="d-none">
    <!-- Add your spinner HTML here -->
  </div>
  <div id="resultsList" class="row"></div>
  <div id="bookDetails" class="mt-4"></div>
</div>
```

## 💻 Usage

```javascript
// Initialize the book search application
const bookSearch = new BookSearchUI();
```

### What the App Does Automatically:
* 🔍 Validates your search input
* 🌐 Sends requests to the OpenLibrary API
* 🎨 Renders search results beautifully
* 📖 Displays detailed book information
* ⚡ Manages loading and error states

## 📚 API Documentation

### Class: BookSearchUI

#### Constructor
```javascript
const bookSearch = new BookSearchUI();
```

#### Methods
* `handleSearch()`: Starts the book search process
* `validateSearchQuery(query)`: Checks if the search query is valid
* `renderSearchResults(data)`: Displays the search results
* `renderBookDetails(book)`: Shows detailed information for a selected book

## 🛡️ Error Handling

Your application handles various error scenarios gracefully:
* **Empty Input**: Alerts the user to enter a search term
* **API Failures**: Displays an error message for connectivity issues
* **No Results**: Informs users when no matches are found
* **Network Issues**: Handles network errors and retries where possible

## 🔒 Security

* ✓ Escapes all HTML content to prevent XSS attacks
* ✓ Properly encodes URL parameters to secure API requests
* ✓ Thorough input validation on all user inputs

## 📦 Dependencies

* **Bootstrap** (5.3+): For styling and layout
* **Modern Browser Support**: Requires ES6+ compatibility

## 🌐 Browser Compatibility

Works perfectly on:
* **Chrome** (latest)
* **Firefox** (latest)
* **Safari** (latest)
* **Edge** (latest)

## 🤝 Contributing

Want to make this project even better? Follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
```bash
git checkout -b feature/new-feature
```

3. **Commit your changes**:
```bash
git commit -am 'Add new feature'
```

4. **Push your branch**:
```bash
git push origin feature/new-feature
```

5. **Submit a pull request**

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🌟 Get Started

Ready to dive into the world of books? Clone the repository and start exploring endless possibilities!
