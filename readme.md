# JigsawStack Prompt Engine Template

[JigsawStack](https://jigsawstack.com) is an AI SDK that integrates into any backend, automating tasks like web scraping, OCR, and translation using LLMs. The Prompt Engine automatically selects the best LLM for every prompt with Groq-powered inference and built-in safety features. 

This starter template demonstrates how to use the Prompt Engine's Mixture-of-Agents approach to automatically choose optimal models for your prompts without manual selection.


## Overview

This template demonstrates how to use [JigsawStack's](https://jigsawstack.com) Prompt Engine powered by Groq's LPU™ Inference Engine and is built as a complete starter that you can fork, customize, and deploy to automate AI tasks like content generation, data processing, translation, and more without the complexity of model selection and infrastructure management.

The [JigsawStack Prompt Engine](https://jigsawstack.com/docs/examples/core-ai/prompt-engine) automatically chooses the best LLM for every one of your prompts, delivering lightning-fast inference speed and performance powered by Groq.

The JigsawStack Prompt Engine uses a Mixture-of-Agents (MoA) approach where each prompt runs across 5 LLMs from GroqCloud simultaneously. The outputs are then ranked by similarity and quality before being merged into a single, optimized result that you can return to your application.

> Read about how JigsawStack's [Mixture of Agents approach outperforms single LLMs while reducing costs](https://jigsawstack.com/blog/jigsawstack-mixture-of-agents-moa-outperform-any-single-llm-and-reduce-cost-with-prompt-engine) in their technical blog.

**Key Features:**
- **Mixture-of-Agents (MoA) Approach:** Automatically selects the best LLMs for your task, combining outputs for higher quality and faster results.
- **Prompt Caching:** Optimizes performance for repeated prompt runs
- **Automatic Prompt Optimization:** Improves performance without manual intervention
- **Response Schema Validation:** Ensures accuracy and consistency in outputs
- **Prompt Guard (Llama Guard 3 by Groq):** Prevents prompt injection and unsafe content including privacy protection, hate speech filtering, sexual content blocking, election misinformation prevention, code interpreter abuse protection, and unauthorized professional advice prevention
- **Reusable prompt engines:** Create once, use many times

## Architecture

**Tech Stack:**
- **Backend:** Node.js with JigsawStack SDK
- **AI Infrastructure:** JigsawStack Prompt Engine powered by Groq
- **Safety:** Llama Guard 3 for content filtering

## Quick Start

### Prerequisites
- Node.js
- JigsawStack API key ([Get one here](https://jigsawstack.com))
- (Groq API key is not needed, as requests come through JigsawStack)

### Setup

1. **Clone the repository**
   ```bash
   gh repo clone janzheng/groq-jigsawstack-template
   cd groq-jigsawstack-template
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create a `.env` file** and add your API key:
   ```env
   JIGSAWSTACK_API_KEY=your-api-key-here
   ```

4. **Run the examples**
   ```bash
   # Run a direct prompt
   pnpm run direct-prompt
   
   # Create and run a prompt engine
   pnpm run engine-prompt
   ```

## Usage Examples

### 1. Run a Direct Prompt
Run a prompt directly, specifying variables and prompt guard options:

```js
import dotenv from "dotenv";
import { JigsawStack } from "jigsawstack";

dotenv.config();

const jigsaw = JigsawStack({ apiKey: process.env.JIGSAWSTACK_API_KEY });

async function main() {
  const result = await jigsaw.prompt_engine.run_prompt_direct({
    prompt: "Tell me a story about {about}",
    inputs: [
      {
        key: "about",
        optional: false,
        initial_value: "Leaning Tower of Pisa",
      },
    ],
    return_prompt: "Return the result in a markdown format",
    prompt_guard: ["sexual_content", "defamation"],
    input_values: {
      about: "Tower of babel",
    },
  });
  console.log(result);
}

main().catch(console.error);
```

### 2. Create and Reuse a Prompt Engine
You can create a prompt engine for repeated tasks, then run it with different variables as needed:

```js
import dotenv from "dotenv";
import { JigsawStack } from "jigsawstack";

dotenv.config();

const jigsaw = JigsawStack({ apiKey: process.env.JIGSAWSTACK_API_KEY });

async function main() {
  // Step 1: Create the prompt engine
  const engine = await jigsaw.prompt_engine.create({
    prompt: "How to cook {dish}",
    inputs: [{ key: "dish" }],
    return_prompt: [
      {
        step: "step counter",
        instructions: "details of this step",
      },
    ],
    prompt_guard: ["sexual_content", "defamation"],
  });

  // Step 2: Run the prompt engine with input values
  const resp = await jigsaw.prompt_engine.run({
    id: engine.prompt_engine_id,
    input_values: {
      dish: "Singaporean chicken rice",
    },
  });

  console.log(resp);
}

main().catch(console.error);
```

## Customization
This template is designed to be a foundation for you to get started with. Key areas for customization:
- **Prompt Templates:** Update prompts and input structures in the example files
- **Prompt Guard Categories:** Configure safety filters based on your use case
- **Response Schemas:** Define custom output structures for consistent results

## Next Steps
### For Developers
- **Give this repo a star:** Show us your support for this template and we'll build more like this for you! ⭐
- **Build and customize:** Fork this repo and start customizing to build out your own application.
- **Get support:** Connect with our team and other developers building on Groq on our new [Groq Developer Forum](https://community.groq.com).

### For Founders and Business Leaders
- **Like what you see or want to learn more?** This template showcases production-ready AI that can handle realtime business workloads with built-in safety features powered by Groq technology. If you're interested in learning more about how Groq can accelerate your AI initiatives, [contact our team](https://groq.com/enterprise-access/) for us to explore how we can help you.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Credits
Created by Jan Zheng & JigsawStack. 