const fs = require('fs-extra');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const TEST_RESULTS_DIR = path.join(__dirname, '..', 'test-results');

const getPackageVersion = () => {
    const pkg = fs.readJsonSync(path.join(__dirname, '..', 'package.json'));
    return pkg.version;
};

const generateAIDocumentation = (version, features) => {
    // This is a placeholder for a real AI call.
    // In a real implementation, you would use a library like 'openai'
    // to send a prompt and get a generated response.
    console.log('🤖 Simulating AI documentation generation...');

    const prompt = `
        Create a user guide for the application "DocuMatic" version ${version}.
        The application is a simple To-Do list manager.
        
        Cover the following features:
        ${features.map(f => `- ${f}`).join('\n')}

        Include a section for adding tasks and show the screenshot 'todo-app-task-added.png'.
    `;

    console.log('--- AI Prompt ---');
    console.log(prompt);

    const aiResponse = `
# DocuMatic - User Guide (v${version})

Welcome to DocuMatic! This guide will help you get started with managing your tasks.

## Features
- Adding new tasks
- Deleting existing tasks
- Simple and clean user interface

## Adding a Task

To add a new task, simply type your task into the input field at the top of the application and click the "Add Task" button.

Here's an example of the app after adding a task:

![Screenshot of adding a task](./todo-app-task-added.png)

That's it! Your task is now added to the list.
    `;

    console.log('--- Simulated AI Response ---');
    return aiResponse.trim();
};

const run = async () => {
    const version = getPackageVersion();
    const versionedDocsDir = path.join(DOCS_DIR, `v${version}`);

    console.log(`🚀 Generating documentation for version ${version}...`);

    await fs.ensureDir(versionedDocsDir);

    const features = [
        'Create a new task',
        'Delete a task',
    ];

    const markdownContent = generateAIDocumentation(version, features);

    await fs.writeFile(path.join(versionedDocsDir, 'user-guide.md'), markdownContent);

    const screenshotSource = path.join(TEST_RESULTS_DIR, 'todo-app-task-added.png');
    const screenshotDest = path.join(versionedDocsDir, 'todo-app-task-added.png');

    if (fs.existsSync(screenshotSource)) {
        await fs.copy(screenshotSource, screenshotDest);
        console.log(`📸 Copied screenshot to ${screenshotDest}`);
    } else {
        console.error(`❗️ Screenshot not found at ${screenshotSource}. Make sure to run tests first.`);
    }

    console.log('✅ Documentation generated successfully!');
};

run(); 