# No Fake समाचार

A MERN stack web application that analyzes text or news articles to detect whether content is **AI-generated** or **Fake News** using machine learning models and Hugging Face APIs.
**Pramaan** AI Powered chatbot which says labels, why and how the text is **AI / Fake text**



## Features

- **AI Detection:** Identify if a piece of text is AI-generated or human-written.  
- **Fake News Check:** Estimate the credibility of news articles with a trust score.  
- **Interactive UI:** Paste text or news, select mode, and get results instantly.  
- **Responsive Design:** Works on desktop and mobile.  
- **ML Powered:** Integrates Hugging Face `fakespot-ai/roberta-base-ai-text-detection-v1` for AI text detection.  

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Backend:** Node.js, Express.js ,FastAPI 
- **Database:** MongoDB  
- **APIs :** Hugging Face Inference API, Pramaan API (text verification),Gemini API
- **ML Models:** skLearn, RoBERT, Pandas, nltk

---

## Project Structure
```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ daily_ping.yml
├── 📁 Client
│   ├── 📁 assets
│   │   ├── 🖼️ image1.jpeg
│   │   ├── 🖼️ image2.jpeg
│   │   ├── 🖼️ logo.jpeg
│   │   └── 🖼️ rename.jpeg
│   ├── 📁 components
│   │   ├── 📁 ChatbotPage
│   │   │   └── 📄 chatbot.jsx
│   │   ├── 📁 External
│   │   │   ├── 📄 Aboutus.jsx
│   │   │   ├── 📄 CustomScrollbarWithText.jsx
│   │   │   ├── 📄 FullNews.jsx
│   │   │   ├── 📄 Headlines.jsx
│   │   │   ├── 📄 NewsSection.jsx
│   │   │   └── 📄 PramaanChatbot.jsx
│   │   └── 📁 Landing
│   │       ├── 📄 Hand.jsx
│   │       └── 📄 Heading.jsx
│   ├── 📁 public
│   │   ├── 🖼️ favicon-512.png
│   │   ├── 📄 favicon.ico
│   │   └── 🖼️ vite.svg
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.jsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.jsx
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 vite.config.js
├── 📁 MLService
│   ├── 📁 Data
│   │   ├── 📄 Fake.csv
│   │   └── 📄 True.csv
│   ├── ⚙️ .gitignore
│   ├── 📄 No_Fake_Samachar.ipynb
│   ├── 🐍 app.py
│   ├── 📄 requirements.txt
│   ├── 📄 text_model_.pkl
│   └── 📄 vectorizer_.pkl
├── 📁 Server
│   ├── 📁 config
│   │   └── 📄 db.js
│   ├── 📁 controllers
│   │   ├── 📄 mlcontroller.js
│   │   ├── 📄 newsController.js
│   │   ├── 📄 pramaanController.js
│   │   ├── 📄 roberController.js
│   │   └── 📄 userController.js
│   ├── 📁 middleware
│   │   └── 📄 userMiddleware.js
│   ├── 📁 models
│   │   └── 📄 userModel.js
│   ├── 📁 routes
│   │   ├── 📄 chatbotRoutes.js
│   │   ├── 📄 newsRoutes.js
│   │   └── 📄 userRoute.js
│   ├── 📁 utils
│   │   └── 📄 try.js
│   ├── ⚙️ .gitignore
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js
├── ⚙️ .gitattributes
└── 📝 README.md
```
