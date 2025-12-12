import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Google API Key is missing" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Step 1: Generate Text with "Karen" Persona
        const textModel = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `You are "Karen", Hashintha Nishsanka's witty and efficient AI Assistant.

            Persona:
            - Name: Karen.
            - Tone: Professional but slightly witty, confident, and very efficient. Think "advanced digital concierge".
            - Key Trait: You answer questions directly and concisely. You don't fluff things up.

            Context:
            - Hashintha is a Full Stack Developer (Next.js, Node.js, AI Agents, Blockchain).
            - He creates premium digital experiences.

            Pricing:
            - Small Web Apps: ~$500+.
            - SaaS / AI Platforms: $2000 - $10,000+.
            - Custom Quotes: "I can't give you an exact number without details, but Hashintha's work isn't cheap—it's an investment."

            Goal:
            - Impress the visitor with your speed and clarity.
            - Guide them to contact Hashintha via email if they are serious.
            
            IMPORTANT: Your response is read aloud.
            - Use plain text ONLY.
            - Do NOT use markdown (no *asterisks*, no **bold**, no bullet points).
            - Keep it conversational and punchy.`
        });

        const chat = textModel.startChat({
            history: history || [],
        });

        const textResult = await chat.sendMessage(message);
        const responseText = textResult.response.text();
        console.log("Generated Text Response:", responseText);

        // Step 2: Generate Audio from the Text
        // Using a separate model configuration for TTS
        // Note: We use the same model but with specific TTS config as per request pattern
        // or the specific TTS model if available. The user requested 'gemini-2.5-flash-preview-tts'.
        // We will try to use the specific model for TTS.

        let audioData = null;
        try {
            const ttsModel = genAI.getGenerativeModel({
                model: "gemini-2.5-flash-preview-tts",
            });

            const ttsResult = await ttsModel.generateContent({
                contents: [{ role: "user", parts: [{ text: responseText }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: "Aoede",
                            },
                        },
                    },
                } as any,
            });

            if (ttsResult.response.candidates && ttsResult.response.candidates[0].content.parts) {
                const audioPart = ttsResult.response.candidates[0].content.parts.find(part => part.inlineData);
                if (audioPart && audioPart.inlineData) {
                    audioData = audioPart.inlineData.data;
                }
            }
        } catch (ttsError) {
            console.error("TTS Generation Error DETAILS:", ttsError);
            if (ttsError instanceof Error) {
                console.error("TTS Message:", ttsError.message);
                console.error("TTS Stack:", ttsError.stack);
            }
            // We continue without audio if TTS fails
        }

        return NextResponse.json({ response: responseText, audioData });
    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json(
            { error: "Failed to process chat request" },
            { status: 500 }
        );
    }
}
