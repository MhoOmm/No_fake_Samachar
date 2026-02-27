import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-offwhite text-charcoal min-h-screen px-6 md:px-20 py-16">

      {/* HERO SECTION */}
      <section className="text-center mb-20">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-widest uppercase">
          Inside The Verification Engine
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          A multi-layer AI-powered editorial system designed to detect misinformation,
          clickbait manipulation and AI-generated content in real time.
        </p>

        <div className="w-32 h-[3px] bg-newsred mx-auto mt-6"></div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl uppercase mb-16 text-center">
          The Verification Workflow
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* STEP 1 */}
          <div className="border-t-4 border-newsred pt-6 md:w-1/3">
            <h3 className="font-heading text-xl uppercase mb-4">
              Step 1 — Input Analysis
            </h3>
            <p className="leading-relaxed">
              The submitted article is cleaned, tokenized and preprocessed.
              Noise and irrelevant formatting are removed before analysis.
            </p>
          </div>

          {/* ARROW */}
          <div className="text-newsred text-4xl font-bold hidden md:block">
            →
          </div>

          {/* STEP 2 */}
          <div className="border-t-4 border-newsred pt-6 md:w-1/3">
            <h3 className="font-heading text-xl uppercase mb-4">
              Step 2 — Multi-Model Detection
            </h3>

            <ul className="space-y-3 leading-relaxed text-sm">
              <li>• Fake News — Logistic Regression + TF-IDF</li>
              <li>• Clickbait — Headline Classification Model</li>
              <li>• AI Detection — RoBERTa Transformer</li>
            </ul>
          </div>

          {/* ARROW */}
          <div className="text-newsred text-4xl font-bold hidden md:block">
            →
          </div>

          {/* STEP 3 */}
          <div className="border-t-4 border-newsred pt-6 md:w-1/3">
            <h3 className="font-heading text-xl uppercase mb-4">
              Step 3 — Trust Score Aggregation
            </h3>
            <p className="leading-relaxed">
              Model outputs combine into a unified Trust Score generating
              final classification: Safe, Caution or High Risk.
            </p>
          </div>

        </div>
      </section>

      {/* ARCHITECTURE SECTION */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl uppercase mb-12 text-center">
          System Architecture
        </h2>

        <div className="max-w-3xl mx-auto text-center space-y-6 text-lg">

          <p>User Submission</p>
          <div className="text-newsred text-2xl">↓</div>

          <p>Text Preprocessing Layer</p>
          <div className="text-newsred text-2xl">↓</div>

          <p>Parallel Model Execution</p>
          <div className="text-newsred text-2xl">↓</div>

          <p>Scoring Engine</p>
          <div className="text-newsred text-2xl">↓</div>

          <p className="font-semibold text-newsred">Trust Meter Output</p>

        </div>
      </section>

      {/* WHY TRUST US SECTION */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl uppercase mb-12 text-center">
          Why You Can Trust Our System
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          <div className="border-l-4 border-newsred pl-6 relative">
            <span className="absolute -left-3 top-2 text-newsred">➤</span>
            <h4 className="font-semibold text-xl mb-2">Transparent Scoring</h4>
            <p>Every output includes independent probability scores.</p>
          </div>

          <div className="border-l-4 border-newsred pl-6 relative">
            <span className="absolute -left-3 top-2 text-newsred">➤</span>
            <h4 className="font-semibold text-xl mb-2">Open Dataset Training</h4>
            <p>Trained on publicly available datasets for transparency.</p>
          </div>

          <div className="border-l-4 border-newsred pl-6 relative">
            <span className="absolute -left-3 top-2 text-newsred">➤</span>
            <h4 className="font-semibold text-xl mb-2">Real-Time Evaluation</h4>
            <p>Lightweight ML pipelines optimized for rapid verification.</p>
          </div>

          <div className="border-l-4 border-newsred pl-6 relative">
            <span className="absolute -left-3 top-2 text-newsred">➤</span>
            <h4 className="font-semibold text-xl mb-2">Multi-Layer Detection</h4>
            <p>Statistical ML + Transformer AI for stronger coverage.</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Aboutus;