# Contributing

Thank you for your interest in contributing to the project! We appreciate your help in making it even better. Please follow the guidelines below to contribute effectively.

## Installation

Ensure that bun is installed globally on your system. You can install bun using one of the following methods:

```bash
npm install -g bun
```

Alternatively, you can follow the official bun installation guide for detailed instructions.
Once bun is installed, run the following command to install project dependencies:

```bash
bun install
```

## Running Tests

To ensure the code is working correctly, run the tests with the following command:

```bash
bun test --watch
```

This command runs all tests and watches for changes so you can quickly verify any modifications you make.

## Generating Documentation

To generate and preview the documentation from the source code, use:

```bash
bunx typedoc src/index.ts
```

This command will generate a preview of the documentation for review.

## How to Contribute

### 1. Fork the Repository

Create a fork of the repository to have your own copy. This allows you to make changes without affecting the original project.

### 2. Clone Your Fork

Clone your forked repository to your local environment using:

```bash
git clone https://github.com/your-username/western-signs.git
```

### 3. Set Upstream Remote

Add the original repository as an upstream remote to stay updated:

```bash
git remote add upstream https://github.com/marcmarine/western-signs.git
```

### 4. Create a New Branch

Create a branch for your new feature or fix:

```bash
git checkout -b feature/your-feature-name
```

### 5. Make Your Changes

Make the necessary changes, following the project's conventions and standards.

### 6. Commit Your Changes

Commit your changes with a concise and meaningful message following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention. This helps maintain a consistent commit history and makes it easier to generate changelogs.

```bash
git add .
git commit -m "feat(data): Enhance sign information with additional details"
```

### 7. Push to Your Fork

Push your changes to your forked repository:

```bash
git push origin feature/your-feature-name
```

Ensure that the branch you are pushing matches the purpose of your changes (e.g., `feature/your-feature-name`, `fix/your-bug-description`, or `chore/your-task-description`).

### 8. Create a Pull Request (PR)

Open a pull request from your forked repository to the original project. Provide a detailed description of your changes.

## Issues

If you find any issues or bugs, please open an issue before submitting a pull request. This helps maintainers understand the problem and prioritize tasks.

Thank you for contributing! Your help makes this project better for everyone 🚀.
