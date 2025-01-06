# AngularJS to Angular Migration Project

This project demonstrates a hybrid application that combines AngularJS (1.8) and Angular (19) using the ngUpgrade module. It's structured as a monorepo using NX and uses Yarn for package management.

## Migration Strategy

The project follows these migration principles:

1. **Bottom-Up Migration**:
   - Start with leaf components
   - Gradually move up the component tree
   - Keep parent components in AngularJS until children are migrated

2. **Service Migration**:
   - Create interfaces for AngularJS services
   - Use upgradeService to access AngularJS services in Angular
   - Gradually replace with Angular services

3. **Router Migration**:
   - Use hash-based routing during migration
   - Maintain both router configurations
   - Gradually move routes to Angular

## Architecture Decisions

1. **Standalone Components**:
   - All new Angular components are standalone
   - Reduces need for NgModule configuration
   - Easier lazy loading

2. **State Management**:
   - Legacy state handled by AngularJS services
   - New state management in Angular services
   - Gradual migration of state management

3. **Styling Strategy**:
   - Legacy styles maintained in SCSS
   - New styles use standalone component CSS
   - Global styles managed through angular.json

## Project Structure

```
.
├── apps/
│   ├── barq/           # Main Angular 19 application
│   ├── legacy/         # Legacy AngularJS 1.8 application
│   └── barq-e2e/       # E2E tests
├── libs/
│   ├── feature/        # Feature library
│   └── shared/         # Shared library
└── package.json
```

## Prerequisites

- Node.js >= 20.18.1
- Package manager (`Yarn`)
- Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/angularjs-migration.git
   cd angularjs-migration
   ```

2. Clone the legacy repository into the `apps/legacy` directory:

   ```bash
   cd apps/legacy
   git clone https://github.com/lehcode/delivery-admin-ui.git .
   cd ../..
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

## Development

### Running the Applications

1. Start the development server:

   ```bash
   yarn start
   ```

   This will start the hybrid application at `http://localhost:4200`

2. Run the legacy application separately (for development/comparison):

   ```bash
   cd apps/legacy
   yarn install
   yarn start
   ```

   The legacy application will be available at `http://localhost:8000`

### Development Workflow

The project uses a hybrid approach where:

- New features are developed in Angular (`apps/barq`)
- Legacy features are gradually migrated from AngularJS (`apps/legacy`)
- Shared code is placed in the libs directory

#### Key Files

- `apps/barq/src/main.ts`: Bootstrap file for the hybrid application
- `apps/barq/src/app/upgrade/upgrade.service.ts`: Service for AngularJS integration
- `apps/legacy/app/legacy-init.js`: AngularJS initialization
- `apps/barq/src/app/app.component.ts`: Root Angular component

### Building

1. Development:

   ```bash
   yarn start --watch
   ```

2. Production build:

   ```bash
   yarn build
   ```

### Testing

1. Run unit tests:

   ```bash
   yarn test
   ```

2. Run e2e tests:

   ```bash
   yarn e2e
   ```

3. Run linting:

   ```bash
   yarn lint
   ```

## License

MIT
See LICENSE
