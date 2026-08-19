# Clothing Store

**Passion Project by**
**[Biplav Paudel](https://github.com/Biplav-poudel)**

A modern e-commerce frontend for the **Aurora** clothing brand.

**Loom** is a responsive clothing store focused on graphic tees and curated pieces. It includes product browsing, category filters, a shopping bag, favorites, search, and a clean, accessible design.

---

## About This Project

This is a personal passion project where I built a polished, real-world style clothing store UI to practice and improve my modern web development skills.

---

## Features

- **Product catalog** – Browse Aurora graphic tees with images, prices, and details  
- **Category filters** – Filter by *All*, *New in*, or *Tops*  
- **Shopping bag** – Add/remove items and view a running total  
- **Favorites** – Heart products to save them  
- **Search** – Quick product search overlay  
- **Responsive design** – Works well on mobile and desktop  
- **Toast notifications** – Clear feedback for cart and favorite actions  
- **Health API** – Simple Express backend with a `/api/healthz` endpoint  

---

## Tech Stack

| Layer        | Technologies                                        |
|--------------|-----------------------------------------------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| **Routing**  | Wouter                                              |
| **State**    | React hooks + TanStack Query                        |
| **Icons**    | Lucide React                                        |
| **Backend**  | Express 5, TypeScript, Pino logger                  |
| **Monorepo** | pnpm workspace (Replit)                             |

---

## Project Structure

```text
clo/
├── artifacts/
│   ├── clothing-store/          # React frontend (Loom store)
│   │   ├── src/
│   │   │   ├── App.tsx          # Main store UI & logic
│   │   │   ├── components/      # UI components (shadcn + custom)
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── index.css        # Tailwind + custom styles
│   │   │   └── ...
│   │   ├── public/
│   │   ├── index.html
│   │   └── package.json
│   │
│   └── api-server/              # Express API
│       ├── src/
│       │   ├── app.ts
│       │   ├── index.ts
│       │   ├── routes/          # healthz, etc.
│       │   └── lib/
│       └── package.json
│
├── README.md
└── ...