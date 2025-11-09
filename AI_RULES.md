# AI Development Rules for Vending Machine App

This document provides guidelines for the AI assistant to follow when developing and modifying this application. The goal is to maintain code quality, consistency, and predictability.

## Tech Stack

The application is built with a modern, component-based architecture. Key technologies include:

-   **Framework**: React, built with Vite for a fast development experience.
-   **Language**: TypeScript for type safety and improved developer experience.
-   **Styling**: Tailwind CSS for a utility-first styling approach.
-   **UI Components**: shadcn/ui, a collection of beautifully designed, accessible components built on Radix UI.
-   **Backend & Database**: Supabase for authentication, database, and other backend services.
-   **Routing**: React Router (`react-router-dom`) for all client-side navigation.
-   **Data Fetching**: TanStack Query (`@tanstack/react-query`) for managing server state, caching, and data fetching.
-   **Forms**: React Hook Form and Zod for robust and type-safe form handling and validation.
-   **Notifications**: Sonner for simple and elegant toast notifications.
-   **Icons**: Lucide React for a consistent and clean icon set.

## Development Rules & Library Usage

### 1. UI Components

-   **Primary Library**: Always use components from the `shadcn/ui` library, which are located in `src/components/ui`.
-   **Customization**: Do NOT directly modify the files in `src/components/ui`. If a component requires custom logic or styling, create a new component in `src/components` that wraps or composes the `shadcn/ui` component.
-   **No New UI Libraries**: Do not introduce other UI libraries like Material-UI, Ant Design, or Bootstrap.

### 2. Styling

-   **Utility-First**: All styling must be done with Tailwind CSS utility classes.
-   **Conditional Classes**: Use the `cn` utility function from `src/lib/utils.ts` to conditionally apply classes.
-   **No Custom CSS**: Avoid writing custom CSS in `.css` files. Inline `style` attributes should only be used for dynamic values that cannot be handled by Tailwind (e.g., animations, dynamic colors).
-   **Theme**: Adhere to the medieval theme defined in `src/index.css` and `tailwind.config.ts`. Use the defined custom colors, gradients, and fonts (`--gradient-gold`, `font-medieval`, etc.).

### 3. State Management

-   **Server State**: Use TanStack Query (`useQuery`, `useMutation`) for all data fetching, caching, and server-side state management related to Supabase.
-   **Local State**: Use React's built-in hooks (`useState`, `useReducer`) for simple, component-level state.
-   **No Global State Libraries**: Do not add global state libraries like Redux or Zustand unless the application's complexity absolutely requires it.

### 4. Routing

-   **Library**: Use `react-router-dom` for all routing.
-   **Route Definitions**: All routes should be defined in `src/App.tsx`.
-   **Navigation**: Use the `<Link>` component from `react-router-dom` or the custom `<NavLink>` from `src/components/NavLink.tsx` for internal navigation.

### 5. Forms

-   **Form Logic**: Use `react-hook-form` to manage form state, submission, and validation.
-   **Validation**: Define validation schemas using `zod`. Use `@hookform/resolvers` to connect Zod schemas to your forms.

### 6. Backend & Database

-   **Client**: All interactions with the backend (Auth, Database) must use the Supabase client instance exported from `src/integrations/supabase/client.ts`.
-   **Types**: Utilize the auto-generated Supabase types from `src/integrations/supabase/types.ts` for all database queries to ensure type safety.

### 7. Notifications

-   **User Feedback**: Use the `toast` function from the `sonner` library to provide feedback to the user (e.g., success messages, errors, warnings).

### 8. Code Structure

-   **Pages**: Top-level page components go in `src/pages/`.
-   **Components**: Reusable components are placed in `src/components/`.
-   **Hooks**: Custom hooks reside in `src/hooks/`.
-   **Configuration**: Static configuration data (like product lists) should be in `src/config/`.
-   **Types**: Shared TypeScript types should be defined in `src/types/`.