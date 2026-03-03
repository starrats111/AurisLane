# AurisLane - Lifestyle Blog Website

A beautiful, soft and sweet styled lifestyle blog website featuring articles across six categories.

## Features

- **6 Lifestyle Categories:**
  - Fashion & Accessories
  - Health & Beauty
  - Home & Garden
  - Travel & Accommodation
  - Finance & Insurance
  - Food & Beverage

- **Design Features:**
  - Morandi color palette (low saturation, soft colors)
  - Rounded corners throughout
  - Smooth animations and transitions
  - Responsive mobile design
  - Warm, friendly, and comfortable aesthetic

- **Functionality:**
  - Blog article listing with search and category filters
  - Pagination for articles
  - Individual article detail pages
  - About page
  - Contact form
  - Social media integration
  - Mobile-responsive navigation

## File Structure

```
AurisLane/
├── index.html              # Homepage
├── articles.html           # Articles listing page
├── article-detail.html     # Individual article page
├── about.html              # About page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── articles.json           # Articles data (50 articles)
└── README.md               # This file
```

## Usage

1. **Open the website:**
   - Simply open `index.html` in a web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

2. **Navigate the site:**
   - Browse articles by category or search
   - Read detailed articles
   - Contact through the contact form

## Articles

The website includes 50 blog articles across six lifestyle categories, with dates from September 2024 to February 2026. Each article features a hero image and four content images from Unsplash.

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #B8A9A9;
    --color-secondary: #D4C4B0;
    /* ... */
}
```

### Content
- Edit `articles.json` to add/modify articles

### Styling
- All styles are in `styles.css`
- Uses Poppins font from Google Fonts
- Fully responsive with mobile breakpoints

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a static website (no backend required)
- Images are loaded from Unsplash (external URLs)
- Social media links point to placeholder URLs
- Contact form shows an alert (no backend integration)

## License

This project is created for demonstration purposes.


