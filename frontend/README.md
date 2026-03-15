# HexStack - Digital Agency Portfolio

A modern, high-performance portfolio website built for the **HexStack** digital agency using Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## 🚀 Architecture

This application employs a highly scalable, modular component architecture:

```
src/
├── app/                  # Next.js App Router endpoints (Import Wrappers)
├── components/           # Isolated Functional UI blocks
│   ├── ui/               # Generic base primitives (Button, Card, Modal, etc.)
│   ├── navbar/           # Navigation specifics
│   ├── hero/             # Hero blocks
│   ├── portfolio/        # Portfolio domains
│   └── ... 
├── pages/                # Abstracted Page Logic (Home, About, Services)
├── utils/                # Utility functions and Error Boundaries
└── styles/               # Global CSS
```

### 🧩 Component Driven Design

All core UI elements are separated into granular, reusable pieces:

- **Primitives:** Items like `Button`, `Badge`, `Heading`, `Modal` live in `src/components/ui`.
- **Feature Sections:** Complex sections like `PricingPreview` or `WhyChooseUs` live in dedicated folders matching their domain.
- **Pages:** The `src/app` routes act solely as wrappers, loading full page components from `src/pages`.
- **Fault Tolerance:** Top-level components are wrapped in React `ErrorBoundary` constraints to prevent cascading application failure.

## 🛠️ Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Turbopack

## 💻 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 🤝 Code Guidelines

- Always utilize the generic standard primitives from `src/components/ui/` rather than re-creating localized Tailwind patterns.
- Ensure all new components imported are properly abstracted from global application routes.
- Validate accessible Aria tagging on newly introduced modal or interactive components.

---
*Built with ❤️ by HexStack Engineering.*
