# तत्त्व चक्र (Tattva Chakra) - Interactive Periodic Table

An interactive periodic table with Indian historical theme, featuring all 118 elements with detailed isotope and radioactivity information.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/paddyoaktreepot-gmailcoms-projects/v0-interactive-periodic-table)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/HXJck1dhk6X)
[![TypeScript](https://img.shields.io/badge/TypeScript-98.6%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

- **Interactive Element Cards**: Click on any element to view detailed information
- **Element Comparison**: Compare properties of any two elements side by side
- **Category Filtering**: Filter elements by their categories (e.g., Metals, Non-metals)
- **Periodic Trends**: Visualize various periodic trends with color-coded representations
- **Isotope Information**: Access detailed isotope and radioactivity data for each element
- **Responsive Design**: Optimal viewing experience across all device sizes
- **Dark Mode Support**: Easy on the eyes with dark mode compatibility
- **Indian Historical Theme**: Unique cultural perspective on the periodic table

## 📊 Architecture

### Component Structure
```mermaid
flowchart TD
    A[App] --> B[PeriodicTable]
    B --> C[ElementCard]
    B --> D[ElementDetails]
    B --> E[ElementComparison]
    B --> F[PeriodicTrends]
    C --> G[Element Display]
    D --> H[Isotope Info]
    D --> I[Properties]
    E --> J[Compare View]
    F --> K[Trend Selector]
    F --> L[Trend Legend]
```

### Data Flow
```mermaid
flowchart LR
    A[User Input] --> B[State Management]
    B --> C[Element Selection]
    B --> D[Category Filter]
    B --> E[Comparison Mode]
    C --> F[Element Details]
    D --> G[Filtered View]
    E --> H[Comparison View]
    F --> I[Display Update]
    G --> I
    H --> I
```

### State Management
```mermaid
stateDiagram-v2
    [*] --> Normal
    Normal --> ElementView: Click Element
    Normal --> ComparisonMode: Toggle Comparison
    Normal --> FilteredView: Select Category
    ElementView --> Normal: Close Details
    ComparisonMode --> Normal: Exit Comparison
    FilteredView --> Normal: Clear Filter
    ComparisonMode --> ComparisonView: Select 2 Elements
    ComparisonView --> ComparisonMode: Close Comparison
```

## 🚀 Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [V0 by Vercel](https://v0.dev/) - Development platform

## 🛠️ Development

To get started with local development:

```bash
# Clone the repository
git clone https://github.com/Kedhareswer/interactive-periodic-table.git

# Navigate to the project directory
cd interactive-periodic-table

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see the application running.

## 🎯 Project Structure

### Directory Structure
```mermaid
graph TD
    A[interactive-periodic-table] --> B[app]
    A --> C[components]
    A --> D[data]
    A --> E[lib]
    A --> F[types]
    C --> G[element-card.tsx]
    C --> H[element-comparison.tsx]
    C --> I[element-details.tsx]
    C --> J[periodic-table.tsx]
    C --> K[periodic-trends.tsx]
    D --> L[element-isotopes.ts]
    E --> M[categorize-elements.ts]
    E --> N[utils.ts]
    F --> O[element.ts]
```

## 🌟 Features in Detail

### Element Comparison
Users can select any two elements to compare their properties side by side. This feature helps in understanding the similarities and differences between elements.

### Periodic Trends
The application visualizes various periodic trends through color coding, making it easier to understand patterns across the periodic table.

### Category Filtering
Elements can be filtered by their categories, allowing users to focus on specific groups of elements like metals, non-metals, or noble gases.

### User Interaction Flow
```mermaid
sequenceDiagram
    participant U as User
    participant PT as Periodic Table
    participant ED as Element Details
    participant EC as Element Comparison
    
    U->>PT: Click Element
    alt Comparison Mode Off
        PT->>ED: Show Element Details
        ED->>U: Display Information
    else Comparison Mode On
        PT->>EC: Add to Comparison
        alt Two Elements Selected
            EC->>U: Show Comparison View
        end
    end
```

## 🚀 Deployment

The project is automatically deployed on Vercel through continuous integration. Any changes pushed to the main branch will trigger a new deployment.

### Deployment Flow
```mermaid
flowchart LR
    A[Code Changes] -->|Push| B[GitHub]
    B -->|Trigger| C[Vercel CI/CD]
    C -->|Build| D[Build Process]
    D -->|Deploy| E[Production]
    D -->|Failed| F[Notification]
    E -->|Success| G[Live Site]
```

## 📝 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- Data sources for element properties and isotopes
- [V0 by Vercel](https://v0.dev/) for development platform support
- The open-source community for various tools and libraries used in this project

## 🔗 Links

- [Live Demo](https://vercel.com/paddyoaktreepot-gmailcoms-projects/v0-interactive-periodic-table)
- [V0 Project](https://v0.dev/chat/projects/HXJck1dhk6X)
- [GitHub Repository](https://github.com/Kedhareswer/interactive-periodic-table)

---
*Last updated: 2025-06-05 14:09:44 UTC by @Kedhareswer*
