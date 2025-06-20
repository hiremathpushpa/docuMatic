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
        Also include a section for clearing all tasks and show the screenshot 'todo-app-before-clear.png'.
    `;

    console.log('--- AI Prompt ---');
    console.log(prompt);

    const aiResponse = `
# DocuMatic - User Guide (v${version})

Welcome to DocuMatic! This guide will help you get started with managing your tasks.

## Features
${features.map(f => `- ${f}`).join('\n')}

## Adding a Task

To add a new task, simply type your task into the input field at the top of the application and click the "Add Task" button.

Here's an example of the app after adding a task:

![Screenshot of adding a task](./todo-app-task-added.png)

## Clearing All Tasks

You can remove all tasks from your list at once by clicking the "Clear All" button, located at the top-right of the task list.

Here's what the application looks like with a few tasks before clearing them:

![Screenshot of tasks before clearing](./todo-app-before-clear.png)

That's it!
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
        'Clear all tasks at once',
    ];

    const markdownContent = generateAIDocumentation(version, features);

    await fs.writeFile(path.join(versionedDocsDir, 'user-guide.md'), markdownContent);

    const screenshotSource1 = path.join(TEST_RESULTS_DIR, 'todo-app-task-added.png');
    const screenshotDest1 = path.join(versionedDocsDir, 'todo-app-task-added.png');
    if (fs.existsSync(screenshotSource1)) {
        await fs.copy(screenshotSource1, screenshotDest1);
        console.log(`📸 Copied screenshot to ${screenshotDest1}`);
    }

    const screenshotSource2 = path.join(TEST_RESULTS_DIR, 'todo-app-before-clear.png');
    const screenshotDest2 = path.join(versionedDocsDir, 'todo-app-before-clear.png');

    if (fs.existsSync(screenshotSource2)) {
        await fs.copy(screenshotSource2, screenshotDest2);
        console.log(`📸 Copied screenshot to ${screenshotDest2}`);
    } else {
        console.warn(`❗️ Screenshot not found at ${screenshotSource2}. This may be expected if this version does not include this feature.`);
    }

    console.log('✅ Documentation generated successfully!');
};

run(); 