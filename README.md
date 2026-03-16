# OmniGem AI 🧠

OmniGem AI is a **voice-powered screen assistant** that captures your screen and uses **Google Gemini AI** to analyze, explain, and summarize what’s happening on your screen in real time.

Built for the **Gemini Live Agent Challenge**.

---

## 🚀 Features

- 🎤 Voice commands like **"OmniGem explain this screen"**
- 📸 Automatic screen capture
- 🤖 AI-powered screen understanding using **Google Gemini**
- 📊 Structured insights:
  - What AI sees
  - Possible risks
  - Suggested actions
- 💻 Code explanation and debugging
- 🧩 UI analysis and improvement suggestions

---

## 🏗️ System Architecture

<h3 align="center">Architecture</h3>

<p align="center">
  <img src="assets/architecture.png" width="700">
</p>


Voice Command
      ↓
Frontend (HTML + JavaScript)
      ↓
Screen Capture
      ↓
Node.js Backend (Express)
      ↓
Google Gemini API
      ↓
AI Analysis
      ↓
Results Displayed in UI
```

---

## 🛠️ Tech Stack

- **Frontend**
  - HTML
  - CSS
  - JavaScript
  - Web Speech API

- **Backend**
  - Node.js
  - Express.js

- **AI**
  - Google Gemini API

- **Utilities**
  - screenshot-desktop
  - dotenv
  - CORS

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/pranav-n29/OmniGem-AI.git
cd OmniGem-AI
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

Start the server:

```bash
node backend/server.js
```

Open the frontend:

```
frontend/index.html
```

---

## 🎤 Example Voice Commands

```
OmniGem explain this screen
OmniGem summarize this page
OmniGem fix this code
OmniGem analyze this UI
```

---

## 📷 Example Workflow

1. User speaks command
2. Screen is captured
3. Image sent to backend
4. Gemini AI analyzes the screen
5. AI returns structured insights

---

## 📚 What We Learned

- Building multimodal AI applications
- Voice interaction with web apps
- Integrating Google Gemini API
- Designing AI-powered developer tools

---

## 🔮 Future Improvements

- Chrome extension for analyzing any tab
- Automatic code detection and fixing
- Cross-application support
- AI-powered productivity assistant

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

- Google Gemini AI
- Node.js community
- Web Speech API