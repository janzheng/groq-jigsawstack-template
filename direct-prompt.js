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