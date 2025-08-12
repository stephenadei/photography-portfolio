# Stephen Adei - Analog Photography Portfolio

A beautiful, modern photography portfolio website built with Next.js, featuring analog photography with booking functionality.

## Features

- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Image Gallery**: Masonry layout with smooth lightbox navigation
- **Booking System**: Integrated booking modal for client inquiries
- **Analog Photography Focus**: Designed specifically for film photography aesthetics
- **Cloudinary Integration**: Optimized image delivery and transformation
- **Modern UI/UX**: Smooth animations and intuitive navigation
- **SEO Optimized**: Meta tags and structured content for search engines

## Tech Stack

- **Framework**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS with custom photography theme
- **Images**: Cloudinary for image optimization and delivery
- **Icons**: Heroicons for consistent iconography
- **Animations**: Framer Motion for smooth transitions
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Cloudinary account (free tier available)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd phtography-stephenadei-nl
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=your_folder_name
```

### Cloudinary Setup

1. Sign up for a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret from your dashboard
3. Create a folder in your Cloudinary media library (e.g., "portfolio")
4. Upload your photography images to this folder
5. Update the `CLOUDINARY_FOLDER` environment variable with your folder name

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

```bash
npm run build
npm start
```

## Customization

### Adding Your Photos

1. Upload your images to your Cloudinary folder
2. The website will automatically fetch and display them
3. Images are optimized and served with blur placeholders

### Updating Content

- **Hero Section**: Edit the content in `pages/index.tsx`
- **About Section**: Update the description in the About section
- **Services**: Modify the services offered in the Services section
- **Contact Information**: Update email and phone in the Contact section

### Styling

- **Colors**: Custom photography color palette in `tailwind.config.js`
- **Typography**: Font styles and sizes can be adjusted in the CSS
- **Animations**: Custom animations defined in `styles/index.css`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## File Structure

```
├── components/          # React components
│   ├── Modal.tsx       # Image lightbox modal
│   ├── SharedModal.tsx # Shared modal functionality
│   └── Icons/          # Custom icons
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── _app.tsx        # App wrapper
│   └── _document.tsx   # Document wrapper
├── styles/             # Global styles
│   └── index.css       # Tailwind and custom CSS
├── utils/              # Utility functions
│   ├── cloudinary.ts   # Cloudinary configuration
│   ├── types.ts        # TypeScript types
│   └── ...            # Other utilities
└── public/             # Static assets
```

## Features in Detail

### Image Gallery
- Masonry layout for dynamic image arrangement
- Smooth lightbox navigation with keyboard controls
- Image optimization and lazy loading
- Download and fullscreen viewing options

### Booking System
- Modal-based booking form
- Service selection dropdown
- Contact information collection
- Professional inquiry handling

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly navigation
- Adaptive image sizing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about this photography portfolio template, please contact:

- Email: stephen@stephenadei.nl
- Website: [stephenadei.nl](https://stephenadei.nl)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Images powered by [Cloudinary](https://cloudinary.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
