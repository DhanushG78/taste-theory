# 🍽️ Taste Theory – Premium Recipe & Cooking Platform

Taste Theory is a high-performance, aesthetically pleasing recipe and cooking blog platform built with **Next.js 15+** and **Contentstack CMS**. It features a modern, clean light-themed UI designed to provide a premium culinary browsing experience.


## 🚀 Features

- **Dynamic Recipe Engine:** Real-time data fetching from Contentstack for recipes, including high-resolution images, metadata, and rich content.
- **Interactive Browsing:** Search and filter recipes by title, description, or category (Veg, Non-Veg, Desserts).
- **Structured Cooking Flow:** Step-by-step instructions and ingredient lists rendered in a clean, user-friendly format for a seamless cooking experience.
- **Chef Directory:** Dedicated profiles for culinary experts, showcasing their bios and a dynamic grid of their published recipes.
- **Categorized Discovery:** Explore recipes through curated category pages for easy navigation.
- **Premium Aesthetics:** A carefully crafted light theme with smooth animations, ambient glows, and modern typography (using Tailwind CSS v4).
- **Performance Optimized:** Leveraging Next.js Server Components and ISR (Incremental Static Regeneration) for lightning-fast load times.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **CMS:** [Contentstack](https://www.contentstack.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching:** Contentstack Delivery SDK

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js:** v18.0.0 or higher
- **npm** or **yarn**
- **Contentstack Account:** An active stack with Content Types configured (`recipe`, `category`, `chef`).

## ⚙️ Project Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd taste-theory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Contentstack credentials:
   ```env
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=your_environment
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🏗️ Content Architecture

The application relies on three primary Content Types in Contentstack:

| Content Type | Purpose |
| :--- | :--- |
| **Recipe** | Main content including ingredients, steps, cooking time, and difficulty. |
| **Category** | Grouping for recipes (Veg, Non-Veg, etc.) with cover images. |
| **Chef** | Profile data for recipe authors, including bios and profile photos. |

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Routes & Server Components)
│   ├── categories/       # Categories landing page
│   ├── category/[name]/  # Dynamic category filtering
│   ├── chefs/            # Chef directory and profile pages
│   ├── recipe/[slug]/    # Detailed recipe view
│   └── RecipeClient.tsx  # Interactive client-side filtering logic
├── lib/                  # Contentstack SDK initialization
├── public/               # Static assets (images, logos)
└── tailwind.config.ts    # Custom design tokens and theme configuration
```

## ✨ Design Philosophy

Taste Theory follows a "Food App" aesthetic:
- **Clean Layout:** Spacious margins and airy typography for readability.
- **Rich Colors:** Vibrant orange and rose accents to evoke culinary excitement.
- **Ambient Micro-interactions:** Smooth hover effects and fade-in animations for a premium feel.

---

Built with ❤️ by the Taste Theory Team.
