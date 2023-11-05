import OpenAI from "openai";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runConversation(messageContent: string) {
  const message: OpenAI.ChatCompletionMessageParam = {
    role: "user",
    content: messageContent,
  };

  const functions = [
    {
      name: "get_cbt_thinking_traps",
      description:
        "Gets an array of known CBT thinking traps from a given text.",
      parameters: {
        type: "object",
        properties: {
          traps: {
            type: "array",
            description: "CBT thinking traps",
            items: {
              type: "string",
              description: "A CBT thinking trap",
              enum: [
                "Mind Reading",
                "Catastrophizing",
                "Personalization",
                "Black and White Thinking",
                "Overgeneralization",
                "Emotional Reasoning",
                "Should Statements",
                "Labeling and Mislabeling",
                "Filtering",
                "Jumping to Conclusions / Fortune Telling",
                "All-or-Nothing Thinking",
                "Discounting the Positive",
                "Magnification and Minimization",
              ],
            },
          },
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [message],
    functions: functions,
    function_call: "auto", // auto is default, but we'll be explicit
  });

  const responseMessage = response.choices[0].message;

  if (responseMessage.function_call) {
    const functionArgs = JSON.parse(responseMessage.function_call.arguments);
    return functionArgs["traps"];
  }
}
