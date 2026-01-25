# All The Way - Healthcare Management System

Professional healthcare management system built with React, TypeScript, and Vite.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Vercel will automatically detect** the Vite framework
3. **Build settings** are pre-configured in `vercel.json`:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `vite`

4. **Deploy** - Vercel will automatically build and deploy on every push to your main branch

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production-ready files
# Deploy the contents of dist/ to your hosting provider
```

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State Management
- **React Hook Form** - Form Management
- **Zod** - Schema Validation
- **Recharts** - Data Visualization
- **Leaflet** - Maps

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── pages/          # Page components
├── store/          # Redux store and slices
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── types/          # TypeScript type definitions
```

## 🔧 Configuration

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

If needed, create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=All The Way
```

## 📄 License

Private - All Rights Reserved
