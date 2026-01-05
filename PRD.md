# Product Requirements Document: FitTrack

## 1. Product Overview

**FitTrack** is a high-performance, aesthetically premium workout tracking application designed for fitness enthusiasts. It focuses on reducing friction during a workout while providing a sleek, motivating environment to log progress.

## 2. Target Audience

- **Gym Goers**: People who need a quick way to log sets and reps.
- **Home Athletes**: Users following specific routines.
- **Fitness Minimalists**: Users who want a clean, fast UI without the bloat of social features or complex "coaching" algorithms.

## 3. Core Features

### 3.1. Routine Management

- Create and edit custom workout routines (e.g., "Leg Day", "Full Body").
- Add multiple exercises to each routine.
- Set default targets for sets and reps.

### 3.2. Active Workout Tracking

- Start a session based on a saved routine.
- Log sets in real-time (Weight and Reps).
- Visual "Complete" state for sets to track progress through the session.
- Quick-add exercise functionality for ad-hoc adjustments during a workout.

### 3.3. Integrated Rest Timer

- Automatic or manual rest timer triggers after finishing a set.
- Visual countdown display.
- Audio/Visual notification when rest is complete.

### 3.4. History & Persistence

- Dashboard showing a summary of recent workouts.
- Automatic saving to `localStorage` to ensure no data is lost on page refresh.
- Export/Clear data options for management.

## 4. User Experience & Design (Neo-Athletic)

The application must feel "Premium" and "High-Energy."

- **Color Palette**:
  - Primary: Deep Charcoal (`#121212`)
  - Secondary: Obsidian (`#1E1E1E`)
  - Accent: Electric Lime (`#CCFF00`) or Vibrant Cyan (`#00F0FF`)
- **Typography**: Bold, modern sans-serif fonts (e.g., _Inter_ or _Outfit_).
- **Aesthetics**:
  - Glassmorphism effects for cards.
  - Subtle neon glows around active elements.
  - Smooth layout transitions using CSS animations.
- **Responsiveness**: Mobile-first design is critical. Interactions should be thumb-friendly.

## 5. Technical Requirements

- **Framework**: Vite + React (TypeScript preferred).
- **State Management**: React Context or lightweight signal-based state.
- **Styling**: Vanilla CSS with modern features (Variables, Grid, Flexbox).
- **Storage**: `localStorage` API for data persistence.
- **Icons**: Lucide React.

## 6. Implementation Phases

### Phase 1: Foundation

- Project scaffolding.
- Global CSS setup (Design Tokens).
- Basic navigation structure.

### Phase 2: Routine Builder

- Interface to create/edit routines.
- Exercise selection logic.

### Phase 3: Workout Execution

- Active session UI.
- Set logging functionality.
- Rest timer integration.

### Phase 4: History & Polish

- Workout history view.
- Data persistence layer.
- Advanced animations and UI refinements.

---

**Status**: Planning
**Date**: 2026-01-04
