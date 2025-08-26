# Research Portfolio Application

## Overview

This is a full-stack research portfolio application built with React, TypeScript, and Express.js. The application serves as an academic showcase, displaying research papers, ongoing projects, GitHub repositories, and providing contact functionality. It features a modern, responsive design using shadcn/ui components and Tailwind CSS, with a PostgreSQL database for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite for build tooling
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom academic theme colors and typography
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server**: Express.js with TypeScript, serving both API endpoints and static assets
- **Development Setup**: Custom Vite middleware integration for hot module replacement
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **API Design**: RESTful endpoints for research papers, projects, and GitHub repositories
- **Request Logging**: Custom middleware for API request/response logging and performance monitoring

### Data Storage
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL for production
- **Development Storage**: In-memory storage implementation with sample data for development and testing
- **Type Safety**: Zod schemas for runtime validation and TypeScript type generation

### Authentication & Authorization
- **Session Management**: Built-in support for session handling with connect-pg-simple
- **Security**: CORS configuration and request validation middleware
- **Development Mode**: Special handling for Replit development environment

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Styling
- **shadcn/ui**: Complete component library built on Radix UI
- **Radix UI**: Unstyled, accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool with custom plugin integration for Replit environment
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Data Management
- **TanStack React Query**: Server state management with caching and synchronization
- **date-fns**: Date manipulation and formatting utilities
- **nanoid**: URL-safe unique ID generation

### Form Handling
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Schema validation with TypeScript integration
- **@hookform/resolvers**: Zod resolver for React Hook Form integration

### Development Environment
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Runtime Error Overlay**: Development error handling with modal display
- **Cartographer**: Replit-specific development tooling integration