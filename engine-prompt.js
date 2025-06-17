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