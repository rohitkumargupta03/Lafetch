# Task Management Dashboard

A modern, responsive task management dashboard built with **Next.js 14**, **TypeScript**, **TailwindCSS**, and **Redux Toolkit**. This application provides a complete task management system with role-based access control, featuring both admin and user roles.

## 🚀 Features

### Core Features

- ✅ **Authentication System**
  - Login page with form validation (React Hook Form)
  - Mock authentication with role-based access (Admin & User)
  - Token storage in localStorage
  - Protected routes with automatic redirection
- ✅ **Dashboard Layout**

  - Responsive sidebar navigation
  - Header with user info and theme toggle
  - Mobile-friendly hamburger menu
  - Smooth animations and transitions

- ✅ **Task Management**

  - **Task List Page**:

    - Display all tasks with title, description, status, assigned user, and dates
    - Real-time search by task title
    - Filter tasks by status (Pending, In Progress, Completed)
    - Pagination support (6 tasks per page)
    - Task statistics cards

  - **Task Details View**:

    - Modal-based detail view
    - Full task information display
    - Role-based editing:
      - **Admin**: Can edit title, description, status, and assigned user
      - **User**: Can only update task status
    - Real-time updates

  - **Create Task (Admin Only)**:
    - Form with complete validation
    - Assign tasks to specific users
    - Set initial status
    - Immediate task list update

- ✅ **Theme Support**

  - Light/Dark mode toggle
  - System preference detection
  - Persistent theme selection (localStorage)
  - Smooth theme transitions

- ✅ **Profile Page**
  - View user information
  - Display role and permissions
  - User avatar with initials

### Technical Highlights

#### Architecture

- **Clean Folder Structure**:
  ```
  task-management/
  ├── app/                    # Next.js app directory
  │   ├── dashboard/         # Dashboard pages
  │   │   ├── page.tsx      # Main tasks page
  │   │   └── profile/      # Profile page
  │   ├── login/            # Authentication
  │   ├── layout.tsx        # Root layout
  │   └── page.tsx          # Home page (redirects)
  ├── components/            # React components
  │   ├── auth/             # Authentication components
  │   ├── layout/           # Layout components (Sidebar, Header)
  │   ├── tasks/            # Task-related components
  │   ├── ui/               # Reusable UI components
  │   └── providers/        # Context providers
  ├── store/                # Redux Toolkit store
  │   ├── slices/           # Redux slices
  │   └── index.ts          # Store configuration
  ├── lib/                  # Utilities and API layer
  │   └── api.ts            # API abstraction
  ├── hooks/                # Custom React hooks
  ├── types/                # TypeScript definitions
  └── db.json               # Mock API database
  ```

#### State Management

- **Redux Toolkit** with proper slice organization
- Async thunks for API calls
- Type-safe with TypeScript
- Separate slices for auth, tasks, and users

#### API Abstraction Layer

- Centralized API calls in `lib/api.ts`
- No direct fetch calls in components
- Error handling with custom ApiError class
- Request/response type safety

#### Reusable Components

- `Button` - Multiple variants and sizes
- `Input` - With label, error, and validation support
- `Select` - Dropdown with error handling
- `Textarea` - Multi-line input
- `Modal` - Flexible modal with keyboard support
- `Badge` - Status badges with color coding
- `LoadingSpinner` - Loading states

#### Form Validation

- **React Hook Form** integration
- Client-side validation
- Real-time error messages
- Accessible form controls

#### Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg
- Touch-friendly interfaces
- Optimized for all screen sizes

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup Steps

1. **Clone or Navigate to the Project**

   ```powershell
   cd "c:\Users\Yutrp User\Desktop\Lafetch\task-management"
   ```

2. **Install Dependencies**

   ```powershell
   npm install
   ```

3. **Environment Setup**
   The `.env.local` file is already configured with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## 🚀 Running the Application

### Option 1: Run Everything Together (Recommended)

```powershell
npm run dev:all
```

This will start both the JSON Server API (port 3001) and Next.js dev server (port 3000).

### Option 2: Run Separately

**Terminal 1 - Start JSON Server:**

```powershell
npm run api
```

**Terminal 2 - Start Next.js:**

```powershell
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001

## 🔐 Test Credentials

### Admin User

- **Email**: `admin@test.com`
- **Password**: `admin123`
- **Permissions**: Full access - create, edit, delete tasks, assign users

### Regular User

- **Email**: `user@test.com`
- **Password**: `user123`
- **Permissions**: View tasks, update task status only

### Additional User

- **Email**: `bob@test.com`
- **Password**: `bob123`

## 📚 API Endpoints

The mock API (JSON Server) provides the following endpoints:

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Tasks

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Query Parameters

- `GET /tasks?title_like=search` - Search tasks by title
- `GET /tasks?status=pending` - Filter by status

## 🎨 Features Walkthrough

### 1. Login

- Navigate to `/login`
- Use test credentials
- Form validation in real-time
- Error handling for invalid credentials

### 2. Dashboard

- View all tasks in a grid layout
- See task statistics (Pending, In Progress, Completed)
- Use search to filter tasks by title
- Use dropdown to filter by status
- Paginate through tasks (6 per page)

### 3. Task Details

- Click any task card to view details
- See full description and metadata
- Edit task (based on role):
  - Admin: Edit all fields
  - User: Edit status only
- Changes reflect immediately

### 4. Create Task (Admin Only)

- Click "Create Task" button
- Fill in the form:
  - Title (min 3 characters)
  - Description (min 10 characters)
  - Assign to user
  - Set status
- Validation errors shown in real-time
- New task appears immediately

### 5. Profile

- View personal information
- See role and permissions
- User avatar with initials

### 6. Theme Toggle

- Click sun/moon icon in header
- Switch between light and dark modes
- Preference saved in localStorage

## 🛠️ Technologies Used

### Frontend

- **Next.js 14** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** (v4)
- **Redux Toolkit**
- **React Redux**
- **React Hook Form**

### Development

- **JSON Server** (Mock API)
- **ESLint** (Code quality)
- **PostCSS** (CSS processing)
- **Concurrently** (Run multiple scripts)

## 📁 Project Structure Details

### Components Organization

- **`components/ui/`** - Reusable, presentation components
- **`components/layout/`** - Layout-specific components
- **`components/tasks/`** - Task feature components
- **`components/auth/`** - Authentication components
- **`components/providers/`** - Context providers

### State Management

- **`store/slices/authSlice.ts`** - Authentication state
- **`store/slices/tasksSlice.ts`** - Tasks state and operations
- **`store/slices/usersSlice.ts`** - Users state
- **`store/index.ts`** - Store configuration

### Custom Hooks

- **`useRedux.ts`** - Typed Redux hooks
- **`useTheme.ts`** - Theme management

### Type Definitions

- **`types/index.ts`** - All TypeScript interfaces and types
