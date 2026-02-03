# Design System: Weekly Meal Planner Dashboard
**Project ID:** 4760003883079972590

## 1. Visual Theme & Atmosphere

The Weekly Meal Planner Dashboard embodies a **vibrant, health-focused vitality** that radiates energy and wellness. The interface feels **fresh and invigorating**, combining the clean precision of modern health apps with the warmth of a personal nutrition companion. The design philosophy centers on making healthy eating feel achievable, organized, and even delightful.

The overall mood is **energetic yet organized**, creating an approachable aesthetic that motivates users to maintain healthy habits. The interface feels **utilitarian in its clarity** but uplifting in its execution, with the vibrant green palette reinforcing the connection to fresh, wholesome food. The atmosphere evokes the feeling of a bright, modern kitchen where meal planning becomes an enjoyable ritual rather than a chore.

**Key Characteristics:**
- Clean, breathable layouts with purposeful whitespace
- Energetic color accents that inspire healthy choices
- Card-based organization for easy meal visualization
- Friendly, approachable component styling
- Clear visual hierarchy guiding users through planning workflows
- Fresh, modern aesthetic that feels contemporary and trustworthy

## 2. Color Palette & Roles

### Primary Foundation
- **Fresh Spring Green** (#13EC5B) – Primary accent and action color. This vibrant, energetic green evokes fresh produce and healthy living, serving as the signature brand color for buttons, active states, and key interactive elements.
- **Pure Clean White** (#FFFFFF) – Primary background color. Creates a crisp, hygienic canvas that keeps the interface feeling fresh and uncluttered.
- **Soft Cloud Gray** (#F8F9FA) – Secondary surface color used for card backgrounds, input fields, and alternate content areas. Provides gentle visual separation while maintaining the airy, clean aesthetic.

### Neutral Scale
- **Charcoal Deep** (#1A1A1A) – Primary text color for headlines, meal names, and important labels. Provides strong readable contrast while maintaining sophistication.
- **Slate Medium** (#4A5568) – Secondary text used for descriptions, nutritional information, and supporting metadata. Creates clear typographic hierarchy.
- **Misty Gray** (#A0AEC0) – Tertiary color for placeholders, disabled states, and subtle structural elements.
- **Feather Light** (#E2E8F0) – Border and divider color for subtle separation without visual weight.

### Functional States
- **Success Emerald** (#10B981) – Confirmation states, completed meals, positive indicators
- **Alert Coral** (#EF4444) – Budget warnings, overdue items, critical notifications
- **Info Sky** (#3B82F6) – Informational tips, help text, neutral system messages
- **Warm Amber** (#F59E0B) – Pending states, reminders, attention-needed items

## 3. Typography Rules

**Primary Font Family:** Manrope  
**Character:** Modern geometric sans-serif with friendly, approachable letterforms. Balances professionalism with warmth, making nutrition data feel accessible rather than clinical.

### Hierarchy & Weights
- **Display Headlines (H1):** Bold weight (700), tight letter-spacing (-0.02em), 2.5-3rem size. Used for page titles and major section headers like "Weekly Meal Plan" or "Nutrition Analytics".
- **Section Headers (H2):** Semi-bold weight (600), normal letter-spacing, 1.75-2rem size. Day names (Monday, Tuesday), category labels (Breakfast, Lunch, Dinner).
- **Card Titles (H3):** Semi-bold weight (600), normal letter-spacing, 1.25-1.5rem size. Meal names, recipe titles, and feature headings.
- **Body Text:** Regular weight (400), comfortable line-height (1.6), 1rem size. Descriptions, ingredient lists, and general content.
- **Small Text/Meta:** Regular weight (400), line-height (1.5), 0.875rem size. Nutritional values, calorie counts, timestamps, and metadata.
- **Data/Numbers:** Semi-bold weight (600), 1-1.25rem size. Budget figures, calorie totals, macro counts—numerical data that needs emphasis.
- **Button Text:** Semi-bold weight (600), subtle letter-spacing (0.01em), 0.875-1rem size. Clear, action-oriented labeling.

### Spacing Principles
- Headers use tight letter-spacing for modern, impactful presence
- Body text maintains comfortable line-height (1.6) for easy reading of recipes and descriptions
- Consistent vertical rhythm with 1.5rem between related text blocks
- Generous margins (3-4rem) between major sections to create clear content zones

## 4. Component Stylings

### Buttons
- **Shape:** Modern rounded corners (8px radius) – friendly and contemporary without being overly playful
- **Primary CTA:** Fresh Spring Green (#13EC5B) background with Charcoal Deep (#1A1A1A) text, comfortable padding (0.75rem vertical, 1.5rem horizontal)
- **Hover State:** Slight brightness increase with subtle shadow lift, smooth 200ms ease transition
- **Focus State:** Soft outer ring in Fresh Spring Green for accessibility
- **Secondary CTA:** Outlined style with Fresh Spring Green border, white background, fills with pale green tint on hover
- **Tertiary/Text Button:** Transparent background, Charcoal Deep text, underline on hover for subtle actions

### Cards & Content Containers
- **Corner Style:** Modern rounded corners (12px radius) creating soft, approachable edges
- **Background:** Pure Clean White (#FFFFFF) or Soft Cloud Gray (#F8F9FA) depending on layering context
- **Shadow Strategy:** Subtle, soft elevation by default (`0 1px 3px rgba(0,0,0,0.08)`). On hover, gentle lift with enhanced shadow (`0 4px 12px rgba(0,0,0,0.1)`)
- **Border:** Optional 1px Feather Light (#E2E8F0) border for definition when shadows are minimal
- **Internal Padding:** Comfortable 1.5-2rem creating breathing room for meal information
- **Meal Card Structure:** Image thumbnail, meal name, calorie count, quick actions (add/edit)

### Navigation
- **Style:** Clean horizontal layout with generous spacing (1.5-2rem) between navigation items
- **Typography:** Semi-bold weight (600), normal case, comfortable letter-spacing
- **Default State:** Slate Medium (#4A5568) text
- **Active/Hover State:** Smooth color transition to Fresh Spring Green (#13EC5B)
- **Active Indicator:** Underline or pill-shaped highlight in Fresh Spring Green
- **Mobile:** Converts to hamburger menu with slide-out drawer maintaining color scheme

### Inputs & Forms
- **Stroke Style:** Refined 1px border in Feather Light (#E2E8F0)
- **Background:** Soft Cloud Gray (#F8F9FA) transitioning to white on focus
- **Corner Style:** Matching button roundness (8px) for visual consistency
- **Focus State:** Border shifts to Fresh Spring Green (#13EC5B) with subtle glow
- **Padding:** Comfortable 0.75rem vertical, 1rem horizontal for touch-friendly targets
- **Placeholder Text:** Misty Gray (#A0AEC0), unobtrusive and elegant

### Meal Planning Grid Components
- **Day Column Cards:** Vertical stack with day header, meal slots for breakfast/lunch/dinner/snacks
- **Meal Slot:** Rounded container with hover state, drag-and-drop friendly
- **Empty State:** Gentle dashed border in Misty Gray with "+ Add Meal" prompt
- **Filled State:** White background with meal thumbnail, name, and calorie badge
- **Calorie Badge:** Small pill-shaped indicator in Soft Cloud Gray with Slate Medium text

### Data Visualization Components
- **Charts:** Clean lines in Fresh Spring Green and complementary blues
- **Progress Rings:** Fresh Spring Green fill on Soft Cloud Gray track
- **Stat Cards:** White background, large bold numbers, small descriptive labels
- **Budget Bars:** Segmented progress with color coding (green for under budget, amber for approaching, coral for over)

## 5. Layout Principles

### Grid & Structure
- **Max Content Width:** 1280px for optimal readability and focused planning experience
- **Grid System:** Responsive 12-column grid with fluid gutters (16px mobile, 24px desktop)
- **Meal Plan Grid:** 7 columns for days of the week on desktop, horizontal scroll on mobile
- **Breakpoints:**
  - Mobile: <640px (single column, stacked layout)
  - Tablet: 640-1024px (2-3 columns, adjusted meal grid)
  - Desktop: 1024-1280px (full 7-day view)
  - Large Desktop: >1280px (enhanced spacing, sidebar options)

### Whitespace Strategy
- **Base Unit:** 8px for micro-spacing, 16px for component spacing
- **Vertical Rhythm:** Consistent 1.5rem (24px) between related elements
- **Section Margins:** 3-4rem (48-64px) between major sections creating clear content separation
- **Edge Padding:** 1rem (16px) mobile, 2rem (32px) tablet/desktop for comfortable framing
- **Card Internal Spacing:** 1.5rem padding creating comfortable content breathing room

### Alignment & Visual Balance
- **Text Alignment:** Left-aligned for meal names and descriptions (optimal readability), centered for empty states and call-to-action sections
- **Visual Hierarchy:** Day headers anchor each column, meal cards stack vertically, actions align to bottom or right
- **Symmetry:** 7-day grid creates natural horizontal rhythm with equal column widths
- **Focal Points:** Current day highlighted with subtle background tint, primary actions in Fresh Spring Green draw attention
- **Reading Flow:** Top-to-bottom within each day column, left-to-right across the week

### Responsive Behavior & Touch
- **Mobile-First:** Core experience designed for planning on-the-go
- **Progressive Enhancement:** Full 7-day view on desktop, focused day-by-day on mobile
- **Touch Targets:** Minimum 44x44px for all interactive elements (meal slots, buttons, navigation)
- **Meal Grid:** Horizontal scroll on mobile with snap-to-day behavior, full grid on desktop
- **Collapsing Strategy:** Navigation collapses to hamburger, sidebar moves to bottom sheet, grid adapts columns

## 6. Design System Notes for Stitch Generation

When creating new screens for this project using Stitch, reference these specific instructions:

### Language to Use
- **Atmosphere:** "Fresh, vibrant health-focused dashboard with energetic green accents"
- **Button Shapes:** "Modern rounded corners" (8px radius)
- **Shadows:** "Soft, subtle elevation" and "gentle lift on hover"
- **Spacing:** "Comfortable breathing room" and "clear content separation"

### Color References
Always use the descriptive names with hex codes:
- Primary CTA: "Fresh Spring Green (#13EC5B)"
- Backgrounds: "Pure Clean White (#FFFFFF)" or "Soft Cloud Gray (#F8F9FA)"
- Text: "Charcoal Deep (#1A1A1A)" or "Slate Medium (#4A5568)"
- Borders: "Feather Light (#E2E8F0)"

### Component Prompts
- "Create a meal card with modern rounded corners, soft shadow, and comfortable internal padding"
- "Design a primary call-to-action button in Fresh Spring Green (#13EC5B) with rounded corners and bold text"
- "Add a 7-day meal planning grid with day headers and meal slots for breakfast, lunch, dinner"
- "Include a nutrition stats card with large bold numbers and small descriptive labels"

### Incremental Iteration
When refining existing screens:
1. Focus on ONE component at a time (e.g., "Update the meal card styling")
2. Be specific about what to change (e.g., "Increase the shadow depth on meal card hover")
3. Reference this design system language consistently
