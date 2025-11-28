# ROUGHAN - Handmade Beaded Brooches

## Overview

ROUGHAN is an e-commerce web application for handmade beaded brooches featuring a contemporary art museum aesthetic. The platform allows users to browse a curated collection of ready-made brooches and create custom designs using AI-powered image generation via the OpenAI DALL-E API. The application emphasizes minimalist design with strict black-and-white color palette, geometric typography, and gallery-like presentation.

**Core Features:**
- Browse ready-made brooch collection with product details and pricing (EUR 80-100)
- AI-powered custom brooch generator with configurable parameters (size, shape, colors, description)
- Email-based ordering system for both ready-made and custom brooches
- Full bilingual support (English/German)
- Worldwide shipping information
- Theme toggle (light/dark mode)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React 18 with TypeScript for type-safe component development
- Vite for development server and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI Component System:**
- Shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Design follows strict minimalist aesthetic: black/white palette, geometric typography (Space Grotesk), sharp angles, high contrast

**State Management:**
- React Context for global state (Language, Theme)
- TanStack Query for server state with stale-while-revalidate pattern
- Local component state with React hooks

**Key Design Decisions:**
- **Gallery-first presentation:** Product grids with large whitespace and minimal UI chrome
- **Accessibility:** Radix UI primitives ensure ARIA compliance and keyboard navigation
- **Responsive:** Mobile-first approach with breakpoint-based layouts
- **Performance:** Code splitting via Vite, lazy loading for routes and images

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- Node.js runtime with ES modules
- HTTP server wrapped with `createServer` for potential WebSocket upgrades

**API Design:**
- RESTful endpoints under `/api` namespace
- JSON request/response format with validation
- Zod schema validation for type-safe request handling
- Error handling with appropriate HTTP status codes

**Key Endpoints:**
- `GET /api/brooches` - Fetch all ready-made brooches
- `GET /api/brooches/:id` - Fetch single brooch by ID
- `POST /api/generate` - Generate custom brooch image via OpenAI DALL-E

**Data Layer:**
- In-memory storage (`MemStorage` class) for development/demo purposes
- Sample data seeded on server initialization
- Interface-based storage design (`IStorage`) enables future database migration
- Database schema defined with Drizzle ORM (PostgreSQL dialect configured but not currently used)

**Rationale for In-Memory Storage:**
- Simplifies initial deployment and demo scenarios
- No database provisioning required for MVP
- Clear migration path via `IStorage` interface abstraction
- Trade-off: Data does not persist across server restarts

### Data Storage

**Current Implementation:**
- In-memory Map-based storage for brooches and generated designs
- UUID-based ID generation for generated brooches
- Sample brooch data hardcoded in schema file

**Configured but Inactive:**
- Drizzle ORM with PostgreSQL dialect
- Neon Database serverless driver configured
- Migration directory structure in place
- Schema definitions in `shared/schema.ts`

**Migration Path:**
- `IStorage` interface provides abstraction layer
- Swap `MemStorage` for `DbStorage` implementation
- Run Drizzle migrations with `npm run db:push`
- No application code changes required due to interface

**Design Decision:**
- Defer database complexity until product validation
- Maintain production-ready schema definitions
- Enable rapid iteration without infrastructure overhead

### External Dependencies

**OpenAI Integration:**
- OpenAI Node.js SDK for DALL-E image generation
- GPT-5 model configured (as of August 2025 per code comments)
- Image generation based on user-provided parameters: size, shape, colors, creative description
- Prompt engineering combines structured parameters with user creativity
- API key required via `OPENAI_API_KEY` environment variable

**UI Component Libraries:**
- Radix UI: Unstyled, accessible component primitives (20+ components)
- Lucide React: Icon library for consistent iconography
- Embla Carousel: Touch-enabled carousel component
- CMDK: Command menu/palette component

**Form Handling:**
- React Hook Form: Performance-optimized form state management
- Hookform Resolvers: Integration with Zod validation schemas
- Zod: Runtime type validation and schema definition

**Styling & Theming:**
- Tailwind CSS: Utility-first CSS framework
- PostCSS with Autoprefixer: Browser compatibility
- CSS variables for theme token system
- Class Variance Authority: Type-safe component variants
- Custom fonts: Space Grotesk (sans-serif) and Space Mono (monospace) from Google Fonts

**Development Tools:**
- TypeScript: Static type checking across client and server
- TSX: TypeScript execution for development server
- ESBuild: Fast bundling for production server build
- Replit-specific plugins: Error overlay, dev banner, cartographer (source mapping)

**Session & Storage:**
- Connect-pg-simple: PostgreSQL session store (configured but not active)
- LocalStorage: Client-side persistence for language/theme preferences

**Utilities:**
- date-fns: Date formatting and manipulation
- nanoid: Compact unique ID generation
- clsx + tailwind-merge: Conditional class name composition

**Email Handling:**
- mailto: protocol for order submissions (no backend email service)
- Pre-filled templates with product details and images
- User's default email client handles actual sending

**Design Decision - Client-Side Email:**
- **Pro:** Zero backend infrastructure for email
- **Pro:** User controls email sending and can modify message
- **Con:** No order tracking or confirmation system
- **Con:** Dependent on user having email client configured
- Rationale: Appropriate for artisan/boutique business model with manual order processing