import React, { useState } from "react";

const options = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

const questions = {
  "Inattention": [
    "Does you/your ward frequently make careless mistakes in work, school, or daily activities?",
    "Does you/your ward often struggle to focus on tasks or activities, even those that interest them?",
    "Does you/your ward often have trouble organizing tasks and activities?",
    "Does you/your ward frequently lose important items such as keys, wallets, or school/work materials?",
    "Does you/your ward find themselves easily distracted by external stimuli or random thoughts?",
    "Does you/your ward frequently forget to complete daily activities or appointments?",
  ],
  "Hyperactivity & Impulsivity": [
    "Does you/your ward often feel the need to move around in situations where they are expected to stay seated?",
    "Does you/your ward frequently fidget, tap their hands or feet, or have difficulty staying still?",
    "Does you/your ward often blurt out answers or interrupt conversations before the other person finishes speaking?",
    "Does you/your ward have difficulty waiting for their turn in conversations or activities?",
    "Does you/your ward feel restless, as if driven by a motor, or have difficulty engaging in leisure activities quietly?",
  ],
  "Emotional Regulation & Social Interactions": [
    "Does you/your ward often feel overwhelmed by emotions, such as frustration or anger, and struggle to control them?",
    "Does you/your ward frequently experience mood swings or sudden emotional changes?",
    "Does you/your ward find it challenging to maintain friendships or social relationships due to impulsive behavior?",
    "Does you/your ward often feel mentally exhausted due to overthinking or difficulty in processing information?",
  ],
  "Lifestyle & Daily Functioning": [
    "Does you/your ward struggle with time management, often running late or missing deadlines?",
    "Does you/your ward frequently procrastinate or find it difficult to start tasks?",
    "Does you/your ward experience difficulty in completing long-term projects due to lack of focus or motivation?",
    "Does you/your ward find it difficult to follow instructions or stay on track when performing complex tasks?",
    "To what extent do these symptoms affect you/your ward’s daily life, including work, school, or relationships?",
  ],
};


const optionValues = {
  "Never": 1,
  "Rarely": 2,
  "Sometimes": 3,
  "Often": 4,
  "Very Often": 5,
};

const ADHDQuestionnaire = () => {
  const [formData, setFormData] = useState({});
  const [score, setScore] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateScore = () => {
    let totalScore = 0;
    // Calculate score by adding the numerical values of selected options
    Object.values(formData).forEach((answer) => {
      if (answer && optionValues[answer] !== undefined) {
        totalScore += optionValues[answer];
      }
    });
    setScore(totalScore);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateScore();
    console.log(formData);
    console.log("Total Score:", score);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">ADHD Questionnaire</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
        {Object.entries(questions).map(([section, qs]) => (
          <fieldset key={section} className="border border-gray-700 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-blue-300">{section}</legend>
            {qs.map((q, idx) => (
              <div key={idx} className="mt-4">
                <label className="block font-medium text-gray-300">{q}</label>
                <div className="flex gap-4 mt-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="radio" name={q} value={option} onChange={handleChange} className="accent-blue-400" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        ))}

        <fieldset className="border border-gray-700 p-4 rounded-lg">
          <legend className="text-lg font-semibold text-blue-300">Additional Information</legend>
          <label className="block font-medium text-gray-300 mt-4">Do you have a formal ADHD diagnosis?</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No", "Not Sure"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="adhdDiagnosis" value={option} onChange={handleChange} className="accent-blue-400" />
                {option}
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-300 mt-4">Do you have any other diagnosed conditions?</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="otherConditions" value={option} onChange={handleChange} className="accent-blue-400" />
                {option}
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-300 mt-4">If yes, please specify:</label>
          <input type="text" name="conditionsDetails" onChange={handleChange} className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />

          <label className="block font-medium text-gray-300 mt-4">What strategies or treatments have you tried?</label>
          <textarea name="strategies" onChange={handleChange} className="w-full h-24 p-2 border border-gray-700 rounded-md bg-gray-800 text-white"></textarea>

          <label className="block font-medium text-gray-300 mt-4">Any other symptoms or concerns?</label>
          <textarea name="otherConcerns" onChange={handleChange} className="w-full h-24 p-2 border border-gray-700 rounded-md bg-gray-800 text-white"></textarea>
        </fieldset>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition">Submit</button>
      </form>

      {score > 0 && (
        <div className="mt-6 text-center text-lg font-semibold text-blue-400">
          <p>Your Total Score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default ADHDQuestionnaire;