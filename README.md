# Deal Confirmation Application

A full-stack application for managing deal confirmations and generating PDF bills. Built with React, Node.js, Express, and MongoDB.

## Features

- User Authentication
- Deal/Bill Management
- PDF Generation
- WhatsApp Sharing
- Real-time Bill Updates
- Responsive Design

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- HTML2Canvas
- jsPDF

### Backend
- Node.js
- Express
- MongoDB
- Multer (for file handling)
- CORS

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Krishnamundhara/Dev.krish.git
cd Dev.krish
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup:
- Create a `.env` file in the backend directory
- Add the following configurations:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
```

4. Start the application:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
├── backend/
│   ├── config/
│   ├── routes/
│   ├── models/
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── pdf/
│   └── src/
│       ├── components/
│       ├── context/
│       └── App.js
└── README.md
```

## Usage

1. Login with credentials (admin/admin)
2. Navigate to Billing section
3. Create/Edit bills
4. Generate PDFs
5. Share via WhatsApp

## Features

1. User Authentication
   - Login system with admin access
   - JWT-based authentication

2. Billing System
   - Create, edit, and view bills
   - PDF generation with automatic saving
   - WhatsApp sharing functionality
   - Comprehensive billing form with fields for:
     - Date
     - Order number
     - Customer details
     - Product information
     - Quantity and quality
     - Rate
     - Terms and conditions

3. Data Management
   - MongoDB database integration
   - CRUD operations for bills
   - Data persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
