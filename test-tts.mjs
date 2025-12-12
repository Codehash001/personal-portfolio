import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.error("API Key not found in env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });

async function run() {
    try {
        console.log("Testing TTS generation...");
        // Note: The structure here mimics what we do in route.ts
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: "Hello, this is a test." }] }],
            generationConfig: {
                // @ts-ignore
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Aoede",
                        },
                    },
                },
            },
        });

        console.log("Success! Response received.");
        if (result.response.candidates && result.response.candidates[0].content.parts) {
            const audioPart = result.response.candidates[0].content.parts.find(part => part.inlineData);
            if (audioPart) {
                console.log("Audio data present.");
            } else {
                console.log("No audio data found in response.");
                console.log(JSON.stringify(result.response, null, 2));
            }
        }
    } catch (e) {
        console.error("Error detected:");
        console.error(e);
    }
}

run();
