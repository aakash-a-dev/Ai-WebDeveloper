require('dotenv').config();
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "./prompts";

const anthropic = new Anthropic();

async function main() {
    // Detailed messages including user-provided instructions and file details
    const messages = [
        {
            role: 'user' as const,
            content: `# Project Files

The following is a list of all project files and their complete contents that are currently visible and accessible:

1. **eslint.config.js**: ESlint configuration using TypeScript, React hooks, and React refresh plugins.
2. **index.html**: HTML entry point with a root div and script inclusion for main.tsx.
3. **package.json**: Includes Vite, React, TypeScript, Tailwind CSS, and Lucide React dependencies.
4. **src** directory with components like App.tsx, main.tsx, and styles (index.css).
5. Tailwind CSS setup in \`tailwind.config.js\`.

Other configuration files: \`tsconfig.json\`, \`tsconfig.app.json\`, and \`vite.config.ts\`.

For all designs, ensure:
- Beautiful, production-ready pages.
- JSX syntax with Tailwind CSS and React hooks.
- Lucide React for icons.
- Stock photos from Unsplash using valid URLs.

### Objective:
Create a "Todo App" with:
1. Responsive and beautiful UI using Tailwind CSS.
2. Icons from Lucide React.
3. Sample data and Unsplash placeholders.
4. Production-ready code.`
        },
        {
            role: 'user' as const,
            content: `Build the app as a single-page React application. 
- Include a dynamic todo list with add, edit, and delete functionality.
- Use React hooks (e.g., useState, useEffect) for state management.
- Showcase responsiveness and good UX/UI design using Tailwind CSS classes.
- Integrate placeholder icons from Lucide React for each action.
- Provide Unsplash image links as placeholders for background or section designs.`
        },
        {
            role: 'user' as const,
            content: `Ensure the app adheres to the provided project structure and standards:
- Use the existing \`eslint.config.js\` and \`tailwind.config.js\`.
- Do not add unnecessary dependencies.
- Use placeholder images from Unsplash for aesthetic purposes but do not download them.`
        }
    ];

    // Call the Anthropic API with the messages
    await anthropic.messages.stream({
        messages: messages,
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8192,
        system: getSystemPrompt()
    }).on('text', (text) => {
        console.log(text);
    });
}

main();
