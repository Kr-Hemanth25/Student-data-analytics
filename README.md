# Student Data Analytics Platform

A comprehensive data analytics platform for analyzing student performance and generating insights using machine learning. This project combines data analysis, machine learning, and a modern web dashboard to provide actionable insights about student performance.

## Live Demo

🌐 [Access the Dashboard](https://student-analyticss.vercel.app)




[Access Backend](https://student-backend-j5cc.onrender.com/health)

## Features

- 📊 Comprehensive Student Data Analysis
- 🤖 Machine Learning-based Performance Prediction
- 📈 Interactive Data Visualization
- 🔐 Secure Google Authentication
- 📱 Responsive Modern UI with Animations
- 📉 Real-time Analytics Dashboard

## Project Structure

```
Student_data_analysis/
├── data/                    # Dataset directory
│   └── students_synthetic_500.csv
├── notebook/                # Analysis notebooks
│   ├── analysis.ipynb      # Main analysis notebook
│   └── model.pkl           # Trained ML model
└── dashboard/              # Next.js dashboard application
    ├── app/                # Next.js app directory
    ├── components/         # React components
    ├── lib/                # Utility functions
    └── public/             # Static files
```

## Technology Stack

- **Data Analysis & ML**: Python, scikit-learn, pandas, numpy
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Authentication**: Firebase Authentication
- **Data Visualization**: Recharts
- **Styling**: Tailwind CSS

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kr-Hemanth25/Student-data-analytics.git
cd Student-data-analytics
```

### 2. Data Analysis Environment

```bash
# Create and activate Python virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install required packages
pip install pandas numpy scikit-learn jupyter matplotlib seaborn
```

### 3. Dashboard Setup

```bash
cd dashboard

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Firebase credentials to .env

# Start development server
npm run dev
```

## Firebase Configuration

Create a `.env` file in the dashboard directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Dataset Details

The dataset (`students_synthetic_500.csv`) contains synthetic student data with the following features:
- Academic Performance Metrics
- Attendance Records
- Extracurricular Activities
- Study Habits
- Personal Background Information

## Key Findings

1. Strong correlation between study hours and academic performance
2. Impact of extracurricular activities on overall development
3. Predictive patterns in student success rates
4. Clustering of student performance profiles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

K R Hemanth - [GitHub Profile](https://github.com/Kr-Hemanth25)

Project Link: [https://github.com/Kr-Hemanth25/Student-data-analytics](https://github.com/Kr-Hemanth25/Student-data-analytics)
