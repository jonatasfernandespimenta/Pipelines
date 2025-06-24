# Pipelines Front

A modern React application built with Next.js that provides drag-and-drop pipeline management and dynamic form building capabilities. The project follows Atomic Design principles for maintainable and scalable component architecture.

## 🚀 Features

### Pipeline Management
- **Visual Pipeline Builder**: Create and manage task pipelines with drag-and-drop interface
- **Column-based Organization**: Organize tasks in customizable columns
- **Real-time Updates**: Interactive pipeline management with immediate visual feedback

### Dynamic Form Builder
- **Visual Form Designer**: Build forms through an intuitive drag-and-drop interface
- **Field Types**: Support for multiple field types including:
  - Text input
  - Number input
  - Password fields
  - Textarea (long text)
  - Select dropdowns
  - Checkboxes
  - Radio buttons
  - Date pickers
  - Time inputs
- **Field Configuration**: Edit field properties including labels, placeholders, validation rules, and options
- **Form Validation**: Built-in validation with error messaging
- **Export Functionality**: Save forms in structured JSON format

### User Experience
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, professional interface with consistent styling
- **Accessibility**: WCAG-compliant components with proper labeling and keyboard navigation

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Drag & Drop**: React DnD with HTML5 Backend
- **State Management**: React Hooks (useState, useEffect)
- **Notifications**: React Toastify
- **Icons**: React Icons
- **Styling Variants**: Tailwind Variants

## 📁 Project Structure

The project follows **Atomic Design** principles for component organization:

```
src/
├── app/                          # Next.js app router
│   ├── page.tsx                 # Pipeline management page
│   ├── form-builder/            
│   │   └── page.tsx            # Form builder page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button.tsx          # Enhanced button with variants
│   │   ├── Input.tsx           # Form input with validation
│   │   ├── Select.tsx          # Dropdown component
│   │   ├── Textarea.tsx        # Multi-line text input
│   │   ├── Checkbox.tsx        # Boolean input
│   │   ├── Label.tsx           # Form labeling
│   │   ├── IconButton.tsx      # Icon-only buttons
│   │   ├── Text.tsx            # Typography
│   │   ├── Card.tsx            # Card container
│   │   ├── Badge.tsx           # Status badges
│   │   └── Divider.tsx         # Visual separators
│   ├── molecules/              # Component combinations
│   │   ├── FieldConfigForm.tsx # Field configuration logic
│   │   ├── FieldConfigModal.tsx# Modal for field editing
│   │   ├── FormBuilderHeader.tsx# Form builder header
│   │   ├── DraggableFormField.tsx# Draggable field component
│   │   ├── Modal.tsx           # Generic modal
│   │   └── DropZone.tsx        # Drop target component
│   ├── organisms/              # Complex features
│   │   ├── FormBuilderOrg.tsx  # Main form builder logic
│   │   ├── Column.tsx          # Pipeline column
│   │   └── Pipeline.tsx        # Pipeline management
│   └── templates/              # Layout templates
│       └── FormBuilderTemplate.tsx# Complete form builder layout
├── types/
│   └── FieldType.ts            # Field type definitions
├── utils/
│   └── Constants.ts            # Application constants
└── mocks/
    └── form.ts                 # Mock data for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pipelines-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Usage

### Pipeline Management
1. Navigate to the home page (`/`)
2. Create columns for different pipeline stages
3. Add cards/tasks to columns
4. Drag and drop to reorganize tasks between columns

### Form Builder
1. Navigate to `/form-builder`
2. **Add Fields**: Drag field types from the sidebar to the form area
3. **Configure Fields**: Click the edit icon on any field to modify its properties
4. **Reorder Fields**: Drag fields within the form to change their order
5. **Remove Fields**: Click the delete icon to remove unwanted fields
6. **Save Form**: Use the save button to export your form configuration

## 🏗 Architecture

### Atomic Design Implementation

The project follows Brad Frost's Atomic Design methodology:

- **Atoms**: Basic UI elements (buttons, inputs, labels)
- **Molecules**: Simple component combinations (forms, modals)
- **Organisms**: Complex features (form builder, pipeline)
- **Templates**: Layout structures combining organisms
- **Pages**: Specific instances of templates with real content

### Key Benefits
- **Reusability**: Atomic components can be used across the application
- **Consistency**: Standardized design patterns
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to extend and modify

### State Management
- Local component state using React hooks
- Form state managed at the organism level
- Toast notifications for user feedback
- No external state management library (Redux, Zustand) needed for current scope

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- Custom color palette defined in configuration
- Responsive design utilities
- Component variants using `tailwind-variants`
- Consistent spacing and typography scales

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` includes:
- Custom color palette (cx-blue, gray-01, gray-02, gray-03)
- Extended spacing scale
- Custom font families

### Next.js
- App Router for modern routing
- Turbopack for fast development builds
- TypeScript for type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use Atomic Design principles for component organization
- Maintain consistent naming conventions
- Add proper TypeScript types for all props and state
- Write descriptive commit messages
