# Portfolio Website

A modern, animated portfolio website built with Next.js, React, Framer Motion, and TypeScript. Inspired by the OFF+BRAND creative agency design.

## Features

- **Smooth Scrolling** - Lenis smooth scroll for a premium feel
- **Dark/Light Mode** - Theme toggle with smooth transitions
- **Custom Cursor** - Interactive cursor with hover effects
- **Preloader Animation** - Animated loading screen with progress
- **Text Animations** - GSAP-style text split and stagger animations
- **Responsive Design** - Fully responsive across all devices
- **Modern Animations** - Framer Motion powered scroll and hover animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Edit `src/app/page.tsx` to update your personal information:

```tsx
<Hero
  name="Agnivesh Arohi"
  title="Creative Developer"
  subtitle="Your custom subtitle here"
/>

<Footer
  email="your@email.com"
  phone="+1 234 567 890"
  location="Your City, Country"
/>
```

### Projects

Edit the projects array in `src/components/Projects.tsx`:

```tsx
const projects = [
  {
    id: 1,
    title: 'Project Name',
    category: 'Web Development',
    year: '2024',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
  },
  // Add more projects...
];
```

### Skills

Edit the skills array in `src/components/Skills.tsx`:

```tsx
const skills = [
  { name: 'React' },
  { name: 'Next.js' },
  // Add more skills...
];
```

### Navigation & Social Links

Edit the links in `src/components/Navigation.tsx`:

```tsx
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  // Add more links...
];
```

### Colors & Theme

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --main-dark: #1d1d1d;
  --main-light: #e5e4e0;
  --primary-color: #ff642f;
  /* ... other variables */
}
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── Preloader.tsx     # Loading animation
│   │   ├── Navigation.tsx    # Header & menu
│   │   ├── CustomCursor.tsx  # Custom cursor
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Projects.tsx      # Projects grid
│   │   ├── Skills.tsx        # Skills & clients
│   │   ├── Footer.tsx        # Footer & contact
│   │   └── SmoothScroll.tsx  # Smooth scroll wrapper
│   └── context/
│       └── ThemeContext.tsx  # Theme provider
├── public/                   # Static assets
├── package.json
└── README.md
```

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [React 18](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lenis](https://github.com/studio-freight/lenis) - Smooth scrolling
- [GSAP](https://greensock.com/gsap/) - Animation library (optional)

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Design inspiration from [OFF+BRAND](https://www.itsoffbrand.com/)
