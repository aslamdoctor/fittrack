# FitTrack

A premium, high-performance workout tracking application with Neo-Athletic design aesthetics. Built with Vite, React, and TypeScript.

![FitTrack Banner](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Features

### 💪 Routine Management
- Create and edit custom workout routines
- Exercise library with 23 exercises across 6 categories (Chest, Back, Legs, Shoulders, Arms, Core)
- Set default targets for sets and reps per exercise
- Custom exercise creation

### 🏋️ Active Workout Tracking
- Real-time workout sessions
- Quick set logging with weight and reps
- Visual progress tracking with completion states
- Ad-hoc exercise additions during workouts
- Previous set reference for progressive overload

### ⏱️ Intelligent Rest Timer
- Automatic timer starts after completing a set
- Customizable rest duration
- Visual countdown with circular progress indicator
- Browser notifications when rest is complete
- Quick adjust controls (±30 seconds)

### 📊 History & Analytics
- Comprehensive workout history
- Statistics dashboard with:
  - Weekly workout count
  - Total sets completed
  - Total volume lifted
  - Current workout streak
  - Most frequent exercise
- Detailed workout summaries with expandable views

### 💾 Data Management
- Auto-save to localStorage
- Export workout data as JSON
- Import data from backup files
- Clear all data option with confirmation

### 🎨 Premium Design (Neo-Athletic)
- Deep charcoal background (#121212)
- Electric lime accents (#CCFF00)
- Glassmorphism effects with backdrop blur
- Neon glow animations
- Smooth page transitions
- Stagger animations for lists
- Mobile-first responsive design

### ♿ Accessibility
- WCAG AA compliant color contrast
- Keyboard navigation support
- ARIA labels throughout
- Skip-to-main-content link
- Focus-visible indicators
- Screen reader friendly

### ⚡ Performance
- Code splitting with lazy-loaded pages
- React.memo optimization for components
- useMemo for expensive calculations
- Optimized bundle size
- 60fps animations

## Tech Stack

- **Framework**: Vite 5.4 + React 18.2
- **Language**: TypeScript 5.6
- **Routing**: React Router v6
- **State Management**: React Context API
- **Storage**: localStorage API
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with design tokens (BEM methodology)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kb-pages
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── history/          # History and statistics components
│   ├── layout/           # Layout components (AppShell, Header, BottomNav)
│   ├── routine/          # Routine management components
│   ├── timer/            # Rest timer components
│   ├── ui/               # Reusable UI components (Button, Card, Input, Modal)
│   ├── workout/          # Active workout tracking components
│   └── ErrorBoundary.tsx # Error boundary wrapper
├── context/              # React Context providers
│   ├── AppContext.tsx    # App settings
│   ├── RoutineContext.tsx
│   ├── WorkoutContext.tsx
│   └── HistoryContext.tsx
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useRestTimer.ts
│   └── useNotification.ts
├── pages/                # Route pages
│   ├── HomePage.tsx
│   ├── RoutinesPage.tsx
│   ├── WorkoutPage.tsx
│   └── HistoryPage.tsx
├── styles/               # CSS files
│   ├── components/       # Component-specific styles
│   ├── pages/            # Page-specific styles
│   ├── tokens.css        # Design system tokens
│   ├── typography.css    # Font and text styles
│   ├── animations.css    # Reusable animations
│   └── utilities.css     # Utility classes
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── storage.ts        # localStorage utilities
│   ├── calculations.ts   # Statistics calculations
│   ├── dateFormat.ts     # Date formatting
│   └── generateId.ts     # UUID generation
└── data/                 # Static data
    ├── exerciseLibrary.ts
    └── constants.ts
```

## Usage Guide

### Creating a Routine

1. Navigate to the **Routines** page
2. Click **Create New Routine**
3. Enter routine name and optional description
4. Add exercises from the library
5. Set target sets and reps for each exercise
6. Save the routine

### Starting a Workout

1. From the **Workout** page, select a routine or start a quick workout
2. Log sets by entering weight and reps
3. Click **Complete Set** to log each set
4. Rest timer starts automatically (if enabled in settings)
5. Navigate between exercises using Previous/Next buttons
6. Click **Finish Workout** when complete

### Viewing History

1. Navigate to the **History** page
2. View all past workouts in chronological order
3. Click on any workout to expand and see details
4. View statistics on the dashboard

### Managing Data

1. Go to **History** page
2. Scroll to **Data Management** section
3. Options:
   - **Export Data**: Download all workout data as JSON
   - **Import Data**: Upload a previously exported JSON file
   - **Clear All Data**: Remove all data (requires confirmation)

## Keyboard Shortcuts

- `Tab` - Navigate between interactive elements
- `Enter` - Activate buttons and links
- `Escape` - Close modals
- `Tab` (first press on page load) - Show skip-to-content link

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Built with [Claude Code](https://claude.com/claude-code) - Anthropic's official CLI for Claude.

---

**Made with ❤️ for fitness enthusiasts**
