# AurisLane - Lifestyle Blog Website

A beautiful, soft and sweet styled lifestyle blog website featuring articles and product recommendations across six categories.

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
  - Product recommendation pages
  - Product detail pages with reviews
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
├── products.html           # Products listing page
├── product-detail.html     # Individual product page
├── about.html              # About page
├── contact.html            # Contact page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── articles.json           # Articles data
├── products.json           # Products data
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
   - View product recommendations
   - Read detailed articles and product reviews
   - Contact through the contact form

## Articles

The website includes 5 blog articles with dates from September 2025 to January 2026:

1. **Sustainable Fashion: Building a Timeless Wardrobe** (September 2025)
2. **Natural Skincare Routine for Glowing Skin** (October 2025)
3. **Creating a Cozy Autumn Garden Retreat** (November 2025)
4. **Hidden Gems: Budget-Friendly European Destinations** (December 2025)
5. **Smart Financial Planning for the New Year** (January 2026)

## Products

6 curated product recommendations across different categories with detailed reviews and features.

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
- Edit `products.json` to add/modify products

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

