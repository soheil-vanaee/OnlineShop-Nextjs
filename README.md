# OnlineShop-Nextjs

A modern e-commerce platform built with Next.js 16, featuring a responsive design, authentication system, and comprehensive shopping functionality. The application is designed with RTL (Right-to-Left) support for Persian/Farsi language.

##  Features

- **Modern UI/UX**: Clean and responsive design using Tailwind CSS
- **Authentication**: Secure login and registration system with Next-Auth.js
- **Product Management**: Browse and search products with detailed views
- **Shopping Cart**: Add, remove, and manage items in the shopping cart
- **Admin Panel**: Administrative interface for managing products and orders
- **RTL Support**: Right-to-left layout support for Persian/Farsi language
- **Responsive Design**: Works seamlessly across all device sizes

##  Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Next-Auth.js
- **Database**: (To be configured based on your needs)
- **Font**: Vazirmatn (for Persian language support)
- **State Management**: React Context API
- **Validation**: Zod

##  Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OnlineShop-Nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following environment variables:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database Configuration (example with MongoDB)
MONGODB_URI=your-mongodb-connection-string

# Other environment variables as needed
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

##  Project Structure

```
src/
├── app/                 # Next.js 13+ App Router pages
│   ├── admin/          # Admin panel routes
│   ├── api/            # API routes
│   ├── cart/           # Shopping cart functionality
│   ├── login/          # Login page
│   ├── product/        # Product detail pages
│   ├── register/       # Registration page
│   ├── shop/           # Product listing pages
│   ├── favicon.ico
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── auth/               # Authentication configuration
├── components/         # Reusable React components
│   └── layout/         # Layout components
├── context/            # React context providers
└── lib/                # Utility functions and libraries
```

##  Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

##  Authentication

The application includes a complete authentication system with:
- User registration
- Secure login
- Protected routes
- Session management

Authentication is handled through Next-Auth.js with configurable providers.

##  Styling

The application uses Tailwind CSS for styling with:
- Responsive design principles
- RTL (Right-to-Left) support for Persian/Farsi
- Custom color palette
- Consistent component styling

##  Responsive Design

The application is fully responsive and works on:
- Mobile devices (smartphones)
- Tablets
- Desktop computers
- Large screens

##  Internationalization

The application is designed with RTL (Right-to-Left) support for Persian/Farsi language, making it accessible to Persian-speaking users.

##  Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Issues

If you encounter any issues or bugs, please open an issue on the GitHub repository.

##  Support

For support, you can:
- Open an issue on GitHub
- Contact the project maintainers
