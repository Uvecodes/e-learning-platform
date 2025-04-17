// Seeded Course Data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Smith",
        description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
        image: "./assets/webdevreal.jpg", 
        price: 49.99,
        duration: "8 weeks",
        level: "Beginner",
        rating: 4.8,
        students: 1234
    },
    {
        id: 2,
        title: "Data Science Essentials",
        instructor: "Sarah Johnson",
        description: "Master the fundamentals of data science and analytics.",
        image: "./assets/rildata.jpg",
        price: 59.99,
        duration: "10 weeks",
        level: "Intermediate",
        rating: 4.9,
        students: 856
    },
    {
        id: 3,
        title: "Digital Marketing Masterclass",
        instructor: "Mike Wilson",
        description: "Comprehensive guide to modern digital marketing strategies.",
        image: "./assets/digimrkt.jpg",
        price: 39.99,
        duration: "6 weeks",
        level: "All Levels",
        rating: 4.7,
        students: 2156
    },
    {
        id: 4,
        title: "Mobile App Development",
        instructor: "Emily Chen",
        description: "Build iOS and Android apps from scratch.",
        image: "./assets/mobileapp.jpg",
        price: 69.99,
        duration: "12 weeks",
        level: "Advanced",
        rating: 4.9,
        students: 943
    },
    {
        id: 5,
        title: "Graphic Design for Beginners",
        instructor: "David Brown",
        description: "Master the fundamentals of graphic design and visual communication.",
        image: "./assets/graphics.jpg",
        price: 44.99,
        duration: "8 weeks",
        level: "Beginner",
        rating: 4.6,
        students: 1567
    },
    {
        id: 6,
        title: "Business Analytics",
        instructor: "Lisa Anderson",
        description: "Learn to make data-driven business decisions.",
        image: "./assets/bizana.jpg",
        price: 54.99,
        duration: "10 weeks",
        level: "Intermediate",
        rating: 4.8,
        students: 789
    }
];

// Featured Instructors Data
const instructors = [
    {
        id: 1,
        name: "John Smith",
        expertise: "Web Development",
        image: "images/instructor-1.jpg",
        rating: 4.9,
        students: 5000,
        courses: 12
    },
    {
        id: 2,
        name: "Sarah Johnson",
        expertise: "Data Science",
        image: "images/instructor-2.jpg",
        rating: 4.8,
        students: 3500,
        courses: 8
    },
    {
        id: 3,
        name: "Mike Wilson",
        expertise: "Digital Marketing",
        image: "images/instructor-3.jpg",
        rating: 4.7,
        students: 4200,
        courses: 10
    }
];

// Categories Data
const categories = [
    {
        id: 1,
        name: "Web Development",
        courses: 150,
        icon: "fa-code"
    },
    {
        id: 2,
        name: "Data Science",
        courses: 120,
        icon: "fa-chart-bar"
    },
    {
        id: 3,
        name: "Digital Marketing",
        courses: 90,
        icon: "fa-bullhorn"
    },
    {
        id: 4,
        name: "Mobile Development",
        courses: 85,
        icon: "fa-mobile-alt"
    },
    {
        id: 5,
        name: "Graphic Design",
        courses: 110,
        icon: "fa-palette"
    },
    {
        id: 6,
        name: "Business",
        courses: 95,
        icon: "fa-briefcase"
    }
]; 