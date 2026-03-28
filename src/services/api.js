// src/services/api.js
// ─────────────────────────────────────────────────────────────────────────────
// WIRE MAP
//   AuthService     → /auth/login, /auth/register
//   CourseService   → /courses, /courses/:id, /users/me/courses, /courses/:id/enroll
//   CartService     → /cart, /cart/:id (add/remove)
//   TutorService    → /tutors/courses, /tutors/analytics
//   AdminService    → /admin/stats, /admin/courses/:id/moderate
//   ProfileService  → /users/me, /users/me (PATCH)
//   PaymentService  → /payments/checkout
// ─────────────────────────────────────────────────────────────────────────────
import axios from "axios"

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://api.vsintellecta.com/v1"

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

// Auto-attach JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vsintellecta_token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

// ── Mock engine ──
const simulateRequest = (mockData, delay = 750) =>
  new Promise((resolve) => setTimeout(() => resolve({ data: mockData }), delay))

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export const AuthService = {
  login: async (credentials) => {
    // REAL: return await apiClient.post('/auth/login', credentials);
    const roleMap = {
      "learner@vs.com": "learner",
      "tutor@vs.com": "tutor",
      "admin@vs.com": "admin",
      "superadmin@vs.com": "superadmin",
    }
    const role = roleMap[credentials.identifier] || "learner"
    return simulateRequest({
      token: `mock_jwt_${role}_token_123`,
      user: {
        id: 1,
        firstName: role.charAt(0).toUpperCase() + role.slice(1),
        lastName: "User",
        username: `${role}user`,
        email: credentials.identifier,
        role,
        mobile: "+91 9876543210",
        avatar: null,
      },
    })
  },

  // register: async (userData) => {
  //   // REAL: return await apiClient.post('/auth/register', userData);
  //   return simulateRequest({ message: "User registered successfully" });
  // },
}

// ─────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────
export const CourseService = {
  getAllCourses: async () => {
    // REAL: return await apiClient.get('/courses', { params: filters });
    return simulateRequest([
      {
        id: 101,
        title: "Career Guidance Post 12th",
        author: "Surabhi Dewra",
        price: "₹1,499",
        rating: 4.9,
        category: "Competitive Exams",
        level: "Beginner",
        tag: "Bestseller",
        img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
        vid: "Pow-yUGYbVs",
      },
      {
        id: 102,
        title: "Engineering Entrance Prep",
        author: "Surabhi Dewra",
        price: "₹999",
        rating: 4.8,
        category: "Competitive Exams",
        level: "Advanced",
        tag: "Trending",
        img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
        vid: "O12p01-ITCY",
      },
      {
        id: 103,
        title: "Class 10 Math Complete Prep",
        author: "Surabhi Dewra",
        price: "₹1,499",
        rating: 4.7,
        category: "Secondary",
        level: "Class 10",
        tag: "CBSE/SSC",
        img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
        vid: "p1Zle7wRG7E",
      },
      {
        id: 104,
        title: "UPSC GS & CSAT Masterclass",
        author: "Surabhi Dewra",
        price: "₹4,999",
        rating: 4.9,
        category: "UPSC",
        level: "Advanced",
        tag: "Comprehensive",
        img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
        vid: "5KgSWcPFXks",
      },
      {
        id: 105,
        title: "CAT VARC & DILR Intensive",
        author: "Surabhi Dewra",
        price: "₹3,299",
        rating: 4.7,
        category: "Management",
        level: "Graduate",
        tag: "Popular",
        img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
        vid: "Wy-_idAGHxc",
      },
      {
        id: 106,
        title: "Intermediate MPC Foundation",
        author: "Surabhi Dewra",
        price: "₹1,999",
        rating: 4.8,
        category: "Intermediate",
        level: "1st Year",
        tag: "Hot",
        img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
        vid: "4RjPZnatm8M",
      },
    ])
  },

  getCourseById: async (id) => {
    // REAL: return await apiClient.get(`/courses/${id}`);
    return simulateRequest({
      id,
      title: "Career Guidance Masterclass",
      instructor: "Surabhi Dewra",
      tag: "CareerGuide",
      price: "₹1,499",
      originalPrice: "₹2,999",
      rating: 4.9,
      students: "14,500+",
      modules: [
        {
          id: 1,
          title: "Module 1: Foundation & Mindset",
          videos: [
            {
              id: "Pow-yUGYbVs",
              title: "Top 5 Career Options After 12th",
              duration: "12:45",
              completed: true,
            },
            {
              id: "O12p01-ITCY",
              title: "Psychometric Testing Explained",
              duration: "18:20",
              completed: true,
            },
            {
              id: "p1Zle7wRG7E",
              title: "How to Choose the Right Career",
              duration: "15:10",
              completed: false,
            },
          ],
        },
        {
          id: 2,
          title: "Module 2: Deep Dive Pathways",
          videos: [
            {
              id: "5KgSWcPFXks",
              title: "Engineering Careers & Scope",
              duration: "22:15",
              completed: false,
            },
            {
              id: "Wy-_idAGHxc",
              title: "Commerce Pathways & Opportunities",
              duration: "19:30",
              completed: false,
            },
            {
              id: "4RjPZnatm8M",
              title: "Arts & Humanities Careers",
              duration: "14:50",
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: "Module 3: Preparation Strategy",
          videos: [
            {
              id: "eAfqu9BiyxU",
              title: "Resume Building Masterclass",
              duration: "25:00",
              completed: false,
            },
            {
              id: "fBbjc9Pq_8Y",
              title: "Interview Strategy & Tips",
              duration: "21:10",
              completed: false,
            },
          ],
        },
      ],
      resources: [
        {
          id: "r1",
          name: "Career Decision Framework.pdf",
          size: "1.2 MB",
          type: "pdf",
        },
        {
          id: "r2",
          name: "Psychometric Test Guide.pdf",
          size: "840 KB",
          type: "pdf",
        },
        {
          id: "r3",
          name: "Resume Template.docx",
          size: "320 KB",
          type: "docx",
        },
        { id: "r4", name: "Module 1 Notes.pdf", size: "560 KB", type: "pdf" },
      ],
    })
  },

  getMyPrograms: async () => {
    // REAL: return await apiClient.get('/users/me/courses');
    return simulateRequest([
      {
        id: 101,
        title: "Career Guidance Post 12th",
        progress: 65,
        videoId: "Pow-yUGYbVs",
        sessions: 6,
      },
      {
        id: 103,
        title: "Class 10 Math Complete Prep",
        progress: 30,
        videoId: "p1Zle7wRG7E",
        sessions: 8,
      },
    ])
  },

  enroll: async () => {
    // REAL: return await apiClient.post(`/courses/${courseId}/enroll`);
    return simulateRequest({ message: "Successfully enrolled" })
  },

  saveProgress: async () => {
    // REAL: return await apiClient.post(`/courses/${courseId}/progress`, { videoId, completed: true });
    return simulateRequest({ message: "Progress saved" }, 400)
  },
}

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────
export const CartService = {
  getCart: async () => {
    // REAL: return await apiClient.get('/cart');
    const cart = JSON.parse(localStorage.getItem("vsintellecta_cart") || "[]")
    return simulateRequest(cart, 200)
  },

  addToCart: async (course) => {
    // REAL: return await apiClient.post('/cart', { courseId: course.id });
    const cart = JSON.parse(localStorage.getItem("vsintellecta_cart") || "[]")
    const exists = cart.find((c) => c.id === course.id)
    if (!exists) {
      cart.push(course)
      localStorage.setItem("vsintellecta_cart", JSON.stringify(cart))
    }
    return simulateRequest({ message: "Added to cart", cart }, 200)
  },

  removeFromCart: async (courseId) => {
    // REAL: return await apiClient.delete(`/cart/${courseId}`);
    const cart = JSON.parse(localStorage.getItem("vsintellecta_cart") || "[]")
    const updated = cart.filter((c) => c.id !== courseId)
    localStorage.setItem("vsintellecta_cart", JSON.stringify(updated))
    return simulateRequest({ message: "Removed from cart", cart: updated }, 200)
  },

  clearCart: async () => {
    localStorage.removeItem("vsintellecta_cart")
    return simulateRequest({ message: "Cart cleared" }, 200)
  },
}

// ─────────────────────────────────────────────
// TUTOR
// ─────────────────────────────────────────────
export const TutorService = {
  createCourse: async () => {
    // REAL: return await apiClient.post('/tutors/courses', courseData);
    return simulateRequest({ message: "Course submitted for admin approval" })
  },

  getAnalytics: async () => {
    // REAL: return await apiClient.get('/tutors/analytics');
    return simulateRequest({
      totalRevenue: "₹2,45,000",
      activeScholars: 1204,
      livePrograms: 4,
      avgRating: 4.8,
    })
  },

  getLiveClasses: async () => {
    // REAL: return await apiClient.get('/tutors/live-classes');
    return simulateRequest([
      {
        id: "lc1",
        title: "UPSC Prelims Live Doubt Session",
        scheduledAt: new Date(Date.now() + 3600000).toISOString(),
        enrolled: 340,
        meetLink: "https://meet.google.com/abc-def-ghi",
      },
      {
        id: "lc2",
        title: "Class 10 Math — Chapter 6 Live",
        scheduledAt: new Date(Date.now() + 7200000).toISOString(),
        enrolled: 210,
        meetLink: "https://meet.google.com/xyz-uvw-rst",
      },
    ])
  },

  scheduleLiveClass: async () => {
    // REAL: return await apiClient.post('/tutors/live-classes', data);
    return simulateRequest({
      message: "Live class scheduled",
      meetLink: "https://meet.google.com/new-link",
    })
  },
}

// ─────────────────────────────────────────────
// ADMIN / SUPER ADMIN
// ─────────────────────────────────────────────
export const AdminService = {
  getPlatformStats: async () => {
    // REAL: return await apiClient.get('/admin/stats');
    return simulateRequest({
      totalPlatformRevenue: "₹1.24 Cr",
      totalActiveUsers: "24,592",
      publishedCourses: 142,
      platformProfit: "₹37.2 L",
      pendingApprovals: 4,
    })
  },

  getUsers: async () => {
    // REAL: return await apiClient.get('/admin/users');
    return simulateRequest([
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        role: "Learner",
        status: "Active",
        joined: "Today",
        courses: 3,
      },
      {
        id: 2,
        name: "Priya Patel",
        email: "priya.tutor@example.com",
        role: "Tutor",
        status: "Active",
        joined: "Yesterday",
        courses: 5,
      },
      {
        id: 3,
        name: "Amit Kumar",
        email: "amit.k@example.com",
        role: "Learner",
        status: "Suspended",
        joined: "Oct 12",
        courses: 0,
      },
      {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.r@example.com",
        role: "Tutor",
        status: "Active",
        joined: "Oct 10",
        courses: 2,
      },
    ])
  },

  getPendingCourses: async () => {
    // REAL: return await apiClient.get('/admin/courses/pending');
    return simulateRequest([
      {
        id: 201,
        title: "Advanced Data Structures in C++",
        instructor: "Tech Academy",
        price: "₹2,499",
        submitted: "2 hours ago",
        length: "45 Hours",
        description:
          "A complete deep dive into Trees, Graphs, and Dynamic Programming.",
        curriculum: [
          {
            title: "1. Introduction to Trees",
            duration: "45:00",
            video: "https://www.youtube.com/embed/7AvYL8R7XlI",
          },
          {
            title: "2. Graph Traversal Algorithms",
            duration: "55:30",
            video: "https://www.youtube.com/embed/Lk6K9BgzpPw",
          },
        ],
      },
      {
        id: 202,
        title: "IBPS PO Complete Strategy",
        instructor: "Banking Prep Co.",
        price: "₹1,999",
        submitted: "5 hours ago",
        length: "30 Hours",
        description: "Master quantitative aptitude and reasoning for IBPS PO.",
        curriculum: [
          {
            title: "1. Syllogisms Masterclass",
            duration: "50:00",
            video: "https://www.youtube.com/embed/e3dA11TlfnU",
          },
          {
            title: "2. Data Interpretation",
            duration: "40:00",
            video: "https://www.youtube.com/embed/zhpcgpqWc1Q",
          },
        ],
      },
      {
        id: 203,
        title: "JEE Advanced Chemistry Intensive",
        instructor: "Dr. Ramesh Kumar",
        price: "₹3,499",
        submitted: "1 day ago",
        length: "60 Hours",
        description:
          "Comprehensive physical, organic and inorganic chemistry for JEE.",
        curriculum: [
          {
            title: "1. Atomic Structure",
            duration: "48:00",
            video: "https://www.youtube.com/embed/Lk6K9BgzpPw",
          },
        ],
      },
    ])
  },

  moderateCourse: async (courseId, status) => {
    // REAL: return await apiClient.patch(`/admin/courses/${courseId}/moderate`, { status });
    return simulateRequest({ message: `Course ${status} successfully` })
  },

  getTransactions: async () => {
    // REAL: return await apiClient.get('/admin/transactions');
    return simulateRequest([
      {
        id: "TXN-8921",
        user: "Rahul Sharma",
        item: "UPSC General Studies",
        amount: "₹4,999",
        date: "Today, 10:24 AM",
        status: "Completed",
      },
      {
        id: "TXN-8920",
        user: "Sneha Reddy",
        item: "Tutor Payout",
        amount: "-₹12,450",
        date: "Yesterday",
        status: "Processed",
      },
      {
        id: "TXN-8919",
        user: "Priya Patel",
        item: "CAT Intensive",
        amount: "₹3,299",
        date: "Oct 14",
        status: "Completed",
      },
    ])
  },
}

// ─────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────
export const ProfileService = {
  getProfile: async () => {
    // REAL: return await apiClient.get('/users/me');
    const u = JSON.parse(
      localStorage.getItem("vsintellecta_active_user") || "{}",
    )
    return simulateRequest(u)
  },

  updateProfile: async (data) => {
    // REAL: return await apiClient.patch('/users/me', data);
    const u = JSON.parse(
      localStorage.getItem("vsintellecta_active_user") || "{}",
    )
    const updated = { ...u, ...data }
    localStorage.setItem("vsintellecta_active_user", JSON.stringify(updated))
    return simulateRequest({ message: "Profile updated", user: updated })
  },
}

// ─────────────────────────────────────────────
// PAYMENT
// ─────────────────────────────────────────────
export const PaymentService = {
  checkout: async () => {
    // REAL: return await apiClient.post('/payments/checkout', payload);
    // payload: { courseIds, paymentMethod, email }
    return simulateRequest(
      { message: "Payment successful", orderId: `ORD-${Date.now()}` },
      2000,
    )
  },
}
