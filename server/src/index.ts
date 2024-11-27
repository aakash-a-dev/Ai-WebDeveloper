require('dotenv').config();

import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { TextBlock } from "@anthropic-ai/sdk/resources";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import { basePrompt as nodeBasePrompt } from "./defaults/node";

const anthropic = new Anthropic();
const app = express();
app.use(express.json());

app.post("/template", async(req, res) => {
    const prompt = req.body.prompt;

    const response = await anthropic.messages.create({
        messages: [{role: 'user', content: prompt}],
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: "Just give me single word answer about the project whether it is a frontend project or backend project, if frontend return single word answer react, if backend return single word answer node. No need to give any other response or answer I strictly want only one answer"
    })

    const answer = (response.content[0] as TextBlock).text; 

    // if (answer != "react" && answer != "node"){
    //     res.status(403).json({message: "You can't access this"});
    //     return;
    // }

    if(answer == "react"){
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        return
    }

    if(answer == "node"){
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return
    }

            res.status(403).json({message: "You can't access this"});
        return;
})

async function main() {
    // Detailed messages including user-provided instructions and file details
    const messages = [
        {
            role: 'user' as const,
            content: ''
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
        system: "Just give me single word answer about the project whether it is a frontend project or backend project, if frontend return single word answer react, if backend return single word answer node. No need to give any other response or answer I strictly want only one answer"
    }).on('text', (text) => {
        console.log(text);
    });
}

// main();


app.listen(3000, ()=> {
    console.log(`listening, at http://localhost:3000`)
})