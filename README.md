# Mastra Rick and Morty Agent

This project utilizes the Mastra AI framework to create a conversational agent that's an expert on the "Rick and Morty" animated series. This agent, named "rick'n'Morty," can answer questions about the show, provide detailed facts about episodes and characters, and even offer analyses of episodes in the distinctive, sarcastic tone of Rick Sanchez.

## Key Features

*   **Rick and Morty Expertise:** The agent is trained to be knowledgeable about all things related to the Rick and Morty universe.
*   **Fact Retrieval:** Uses the `rickFact` tool to fetch verified information about episodes and characters from the official Rick and Morty API.
*   **Rick's Persona:** Mimics Rick Sanchez's personality, including his sarcasm, quirks, and scientific jargon.
*   **Episode Analysis:** Provides not only facts but also analyses of episodes, adding a layer of interpretation and humor.
*   **Mastra Framework:** Built using the powerful Mastra AI agent framework, allowing for easy agent definition, tool integration, and model selection.
* **Llama-3 Model:** Uses the cutting edge `llama-3.3-70b-versatile` model for intelligent and versatile responses.

## Project Structure

The project is structured as follows:

*   **`src/mastra/index.ts`:**
    *   **Entry Point:** This file serves as the main entry point for the Mastra setup.
    *   **Agent Registration:** It registers the `rickMorty` agent with the Mastra core.
    *   **Mastra Instance:** Creates an instance of the `Mastra` class, configuring it with the defined agents.
*   **`src/mastra/agents/index.ts`:**
    *   **Agent Definition:** Defines the `rickMorty` agent, including its instructions, model, and tools.
    *   **Instructions:** The `instructions` variable contains the core prompt that guides the agent's behavior and personality. This prompt sets the stage for the agent's expertise, tone, and use of tools.
    *   **Model Selection:** The `model` property specifies the LLM that will power the agent. In this case, it's `groq("llama-3.3-70b-versatile")`.
    *   **Tool Integration:**  The `tools` property links the `rickFact` tool to the agent, making it available for use within conversations.
*   **`src/mastra/tools/index.ts`:**
    *   **Tool Creation:** Defines the `rickFact` tool using the `createTool` function from `@mastra/core/tools`.
    *   **Data Fetching:** Contains the logic for fetching episode data from the Rick and Morty API.
    *   **GraphQL Queries:** Utilizes GraphQL queries to retrieve specific episode or episode list information.
    * **Schema Validation:** uses the `zod` library to validate the data coming from the rick and morty api.
    *   **Data Processing:** Includes functions like `getEpisodeFact` and `searchEpisode` to interact with the API and return data in a structured way.
    *   **Tool Execution:** The `execute` method of the `rickFact` tool handles the input (episode name) and orchestrates the data-fetching process.
    * **Async Handling**: Uses `Promise.all` to handle the async requests.

## Core Components

1.  **Agent (`rickMorty`):**
    *   **Name:** `rick'n'Morty`
    *   **Role:** Rick and Morty expert assistant.
    *   **Instructions:** A detailed prompt specifying its responsibilities, tone, and tool usage.
    *   **Model:** `groq("llama-3.3-70b-versatile")`
    *   **Tools:** `rickFact`

2.  **Tool (`rickFact`):**
    *   **ID:** `Get rick and morty facts`
    *   **Description:** Fetches Rick and Morty episode data from the API.
    *   **Input:** `name` (episode name)
    *   **Output:** An array of `Episode` objects.
    *   **Execution:** Uses GraphQL queries and the Rick and Morty API to retrieve data.

3.  **Data Schema (`EpisodeSchema`, `CharacterSchema`)**:
    *   **Validation:** `zod` schemas to ensure the data is correct before using it.
    * **Structure:** defines the structure of the data from the API.

## How It Works

1.  **Initialization:** The `Mastra` instance is created in `index.ts`, and the `rickMorty` agent is registered.
2.  **Conversation:** When a user interacts with the agent, the `rickMorty` agent is activated.
3.  **Prompt:** The agent's instructions guide its responses and behavior.
4.  **Tool Invocation:** When the user asks about a specific episode, the agent recognizes the need for information and automatically invokes the `rickFact` tool.
5.  **Data Fetching:** The `rickFact` tool queries the Rick and Morty API using GraphQL and returns an array of `Episode` objects.
6.  **Response Generation:** The agent combines its base instructions, the user's question, and the data from the tool to generate a detailed response, including:
    *   Direct answers to the user's questions.
    *   Relevant facts about the episode and characters.
    *   An analysis of the episode in Rick's tone.
    *   Natural incorporation of the fetched facts.
7.  **Output:** The agent presents a well-formatted and organized response to the user.

## Prerequisites

*   Node.js
*   A Mastra AI framework compatible project.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the project: `npm run dev`

## Usage

Once the project is running, you can interact with the "rick'n'Morty" agent through the Mastra interface or API. Ask it questions about Rick and Morty episodes, characters, or anything related to the show. For example:

*   "Tell me about the episode 'Pickle Rick'."
*   "What are the main characters in the show?"
* "What happened in the first episode?"
* "Give me information about the character morty"

The agent will use its tools and knowledge to provide informative and entertaining responses.

## Future Enhancements

*   **Character Search:** Add a tool to fetch information about specific characters directly.
*   **More Rick-like Quirks:** Further refine the agent's personality to be even more like Rick.
*   **Contextual Memory:** Implement a system to allow the agent to remember details from previous turns in the conversation.
* **Error Handling**: Add more error handling in case the API is down.
* **Logging**: Add logging to track how the AI uses its tools.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
