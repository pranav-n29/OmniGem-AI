const express = require("express");
const cors = require("cors");
const screenshot = require("screenshot-desktop");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "15mb" }));

app.get("/capture", async (req, res) => {
  try {
    const img = await screenshot({ format: "png" });
    res.type("png");
    res.send(img);
  } catch (err) {
    console.error("Capture Error:", err);
    res.status(500).json({ error: "Error capturing screen" });
  }
});

app.post("/analyze", async (req, res) => {
  try {
    const { question, image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image received" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY in .env" });
    }

   const jsonRules = `
You are an AI screen assistant.
Analyze the screenshot and respond in JSON format like this:

{
 "what_ai_sees": ["short point","short point","short point"],
  "risks": ["risk1","risk2"] OR "none",
  "suggestions": ["suggestion1","suggestion2"]
}

Rules:
- Each point must be one short sentence
- Maximum 12 words per point
- Do not write paragraphs
- Do not add explanations
`;

    const prompt = question && question.trim() !== ""
      ? `User asked: "${question}"\n\n${jsonRules}`
      : `${jsonRules}`;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: "image/png",
                    data: image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response received");

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API request failed",
        details: data,
      });
    }

 let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

try {
  // remove markdown json wrappers if Gemini adds them
  aiText = aiText.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(aiText);
  res.json(parsed);
} catch (err) {
  console.log("JSON parse fallback");

  res.json({
    what_ai_sees: [aiText],
    risks: "none",
    suggestions: []
  });
}
  } catch (error) {
    console.error("Analyze Error:", error);
    res.status(500).json({ error: "Failed to analyze screen" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OmniGem server running on port ${PORT}`);
});