const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runConversation() {
  const messages = [{
    "role": "user",
    "content": "I'm feeling really anxious about my upcoming exam. I'm worried I'm going to fail and not get into college.",
  }];

  const functions = [
    {
      "name": "get_cbt_thinking_traps",
      "description": "Get an array of CBT thinking traps from a given text",
      "parameters": {
        "type": "object",
        "properties": {
            "traps": {
                "type": "array",
                "description": "CBT thinking traps",
                "items": {
                  "type": "string",
                  "description": "A CBT thinking trap",
                  "enum": [
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
                }
            }
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      functions: functions,
      function_call: "auto",  // auto is default, but we'll be explicit
  });
  const responseMessage = response.choices[0].message;

  if (responseMessage.function_call) {
      // const functionName = responseMessage.function_call.name;
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      console.log(functionArgs);
  }
}

runConversation().catch(console.error);