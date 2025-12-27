# Task Management Dashboard

A modern task management system with role-based access control, built with Next.js 14, TypeScript, TailwindCSS, and Redux Toolkit.

## 📋 What This App Does

- **Manage Tasks**: Create, view, edit, and track tasks with different statuses
- **Role-Based Access**: Admin users can create and edit tasks, regular users can update task status
- **Search & Filter**: Find tasks by title or filter by status (Pending, In Progress, Completed)
- **Light/Dark Theme**: Toggle between themes with persistent settings
- **Responsive Design**: Works on desktop, tablet, and mobile devices

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```powershell
npm install
```

### Step 2: Start the Application

```powershell
npm run dev
```

This starts the Next.js development server with built-in API routes.

### Step 3: Open in Browser

Visit **http://localhost:3000** and login with:

**Admin Account:**

- Email: `admin@test.com`
- Password: `admin123`

**User Account:**

- Email: `user@test.com`
- Password: `user123`

---

## 📖 How to Use

### 1. **Login**

- Go to the login page
- Enter email and password
- Click "Sign in"

### 2. **View Tasks**

- After login, you'll see the dashboard with all tasks
- View task cards showing title, status, assigned user, and dates
- See statistics at the top (total tasks, completed, pending, etc.)

### 3. **Search & Filter Tasks**

- Use the search box to find tasks by title
- Use the status dropdown to filter (All, Pending, In Progress, Completed)
- Navigate pages using pagination buttons

### 4. **View Task Details**

- Click on any task card
- A modal opens showing full task information
- Edit task details (based on your role)

### 5. **Create New Task** (Admin Only)

- Click the "Create Task" button
- Fill in task title, description, assign to user, and set status
- Click "Create Task" to save

### 6. **Update Task**

- **Admin**: Can edit title, description, status, and assigned user
- **User**: Can only change task status
- Changes save automatically

### 7. **Toggle Theme**

- Click the sun/moon icon in the header
- Switch between light and dark mode

### 8. **View Profile**

- Click "Profile" in the sidebar
- See your user information and permissions

---

## ✨ Key Features

| Feature               | Admin | User |
| --------------------- | ----- | ---- |
| View all tasks        | ✅    | ✅   |
| Search tasks          | ✅    | ✅   |
| Filter by status      | ✅    | ✅   |
| View task details     | ✅    | ✅   |
| Update task status    | ✅    | ✅   |
| Create new tasks      | ✅    | ❌   |
| Edit task details     | ✅    | ❌   |
| Assign tasks to users | ✅    | ❌   |

---

## 🔧 Technical Stack

**Frontend:**

- Next.js 14 (App Router)
- React 19
- TypeScript
- TailwindCSS v4
- Redux Toolkit
- React Hook Form

**Backend:**

- Next.js API Routes (Built-in)
- In-memory data store (resets on deployment)
- JSON Server (Optional, for local development only)

---

## 📁 Project Structure

```
task-management/
├── app/                    # Next.js app directory
│   ├── api/              # API routes (backend)
│   │   ├── data/        # In-memory data store
│   │   ├── tasks/       # Task endpoints
│   │   └── users/       # User & auth endpoints
│   ├── dashboard/       # Dashboard page (task list)
│   ├── login/           # Login page
│   └── profile/         # User profile page
├── components/           # React components
│   ├── auth/            # Protected route component
│   ├── layout/          # Sidebar, Header
│   ├── tasks/           # Task cards, modals
│   └── ui/              # Buttons, inputs, modals
├── store/               # Redux state management
│   └── slices/          # Auth, tasks, users slices
├── lib/                 # API client functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
└── db.json              # Mock data (reference only)
```

---

## 🛠️ Available Scripts

```powershell
# Start development server (recommended)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Optional: Run with JSON Server (local dev only)
npm run dev:all
```

---

## 🌐 Access URLs

- **App**: http://localhost:3000
- **API**: http://localhost:3000/api
- **API Endpoints**:
  - http://localhost:3000/api/tasks
  - http://localhost:3000/api/users
  - http://localhost:3000/api/tasks/[id]
  - http://localhost:3000/api/users/[id]

---

## 👥 Test Accounts

| Role  | Email          | Password | Permissions    |
| ----- | -------------- | -------- | -------------- |
| Admin | admin@test.com | admin123 | Full access    |
| User  | user@test.com  | user123  | Limited access |
| User  | bob@test.com   | bob123   | Limited access |

---

## 🎨 Features in Detail

### Authentication

- Form validation with real-time error messages
- Protected routes (auto-redirect if not logged in)
- Token stored in localStorage
- Role-based permissions

### Task Management

- **Create**: Admin can create new tasks with title, description, assignee, and status
- **Read**: All users can view tasks in a grid layout
- **Update**: Admin can edit all fields, users can update status only
- **Search**: Real-time search by task title
- **Filter**: Filter by status (Pending, In Progress, Completed)
- **Pagination**: 6 tasks per page with navigation controls

### Theme System

- Light and dark mode
- Smooth transitions between themes
- Persistent preference (saved in localStorage)
- System preference detection

### Responsive Design

- Mobile-first approach
- Touch-friendly UI elements
- Hamburger menu on mobile
- Grid layout adapts to screen size
