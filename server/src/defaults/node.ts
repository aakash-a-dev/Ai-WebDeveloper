export const basePrompt =  `# Project Files

The following is a list of all project files and their complete contents:

1. **index.js**: Contains a simple Node.js script to log the Node.js version.
2. **package.json**: Basic configuration file with no dependencies other than Node.js scripts.

Here is the request:
- Create a "Todo App" backend using Node.js.
- The backend should expose RESTful APIs to:
  - Create, read, update, and delete todo items (CRUD operations).
  - Use in-memory storage for simplicity.
  - Provide meaningful responses in JSON format.
  - Include appropriate error handling and HTTP status codes.
- Ensure the code is modular and production-ready.`