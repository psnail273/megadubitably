# Megadubitably

A portfolio website for Margaret Hardy showcasing illustration and comics work, built with Next.js.

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS + Material UI
- **Language:** TypeScript
- **Email:** Resend

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building for Production

```bash
npm run build
npm start
```

Or use Docker:

```bash
docker build -t megadubitably .
docker run -p 3000:3000 megadubitably
```

## Project Structure

```
app/
├── (home)/        # Homepage
├── about/         # About page
├── comics/        # Comics gallery
├── illustration/  # Illustration gallery
└── layout.tsx     # Root layout

components/
├── contact/       # Contact form
├── gallery/       # Image gallery
├── navigation/    # Site navigation
└── footer/        # Site footer
```
