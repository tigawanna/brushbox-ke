# 🎨 BrushBox

A modern web application for digital artists and creators.

## 🚀 Tech Stack

### Frontend
- ⚛️ Next.js 15 (React with Server Components)
- 🎨 TailwindCSS with DaisyUI
  - 🌈 Theme customization
  - 🎭 Multiple theme support
- 🌟 Framer Motion for animations
- 📱 Fully responsive design

### Backend
- 🗄️ PocketBase
  - 🔒 Type-safe with typed-pocketbase
  - 🚀 Real-time subscriptions
  - 🔑 Built-in authentication

### Development Tools
- 📘 TypeScript for type safety
- 🛠️ ESLint & Prettier
- 🧪 Testing with Jest & React Testing Library

## 🏃‍♂️ Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/brushbox.git

# Install dependencies
npm install

# Start PocketBase server (make sure PocketBase is installed)
./pocketbase serve

# Start development server
npm run dev
```

## 🎨 Features

- 🏠 Dynamic Landing Page
    - ✨ Service showcase and pricing
    - 💫 Animated sections
    - 🗣️ Customer testimonials
- 📅 Smart Booking System
    - 🕒 Real-time availability
    - 📝 Custom booking forms
    - ✅ Instant confirmations
- 💼 Management Dashboard
    - 👥 Customer profiles
    - 📊 Booking analytics
    - 💫 Service management


## 🛠️ Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
```

## 📦 Project Structure

```
brushbox/
├── app/           # Next.js app router
├── components/    # React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── public/        # Static assets
└── types/         # TypeScript types
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📄 License

MIT License - feel free to use this project for your own purposes!
