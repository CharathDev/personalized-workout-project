# Personalized Workout Generator

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Setup and Installation](#setup-and-installation)
5. [Dataset Format](#dataset-format)
6. [Model Training](#model-training)
7. [Generating Personalized Workouts](#generating-personalized-workouts)

---

## Overview

The Personalized Workout Generator is a machine learning project that creates customized workout plans based on user preferences. It uses a sequence-to-sequence model trained with neural networks to predict structured workout plans tailored to input features like goals, experience level, time, available equipment, and more.

---

## Features

- Generate structured, personalized multi-day workout plans.
- Specify inputs such as fitness goals, level, days per week, session duration, equipment, and gender.
- Utilize a tokenized and embedded neural network model for natural language generation.
- Save and load trained tokenizers and models for reuse.

---

## Requirements

- Python 3.8+
- TensorFlow 2.x
- NumPy
- Pandas
- Keras Preprocessing
- Matplotlib (for visualizing training performance)

---

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/CharathDev/personalized-workout-project.git
   cd personalized-workout-project
   ```

2. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install Requirements:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Start Jupyter Notebook**
   Launch Jupyter Notebook to run the project interactively:

   ```bash
   jupyter notebook
   ```

5. **Run the Scripts:**
   Go to server/model/src and run the following files in order

   1. Scraping.ipynb
   2. DataProcessingAndAnalysis.ipynb
   3. DataVariation.ipynb
   4. Mode.ipynb

   Open these files in the Jupyter Notebook interface and execute the cells sequentially to train and test the model.

---

## Dataset Format

The dataset should include the following columns:

| Column     | Description                                           |
| ---------- | ----------------------------------------------------- |
| Goals      | Fitness goals (e.g., Build Muscle, Lose Fat).         |
| Level      | User experience level (e.g., Beginner, Intermediate). |
| Days       | Number of workout days per week.                      |
| Time       | Duration of each session in minutes.                  |
| Equipments | List of available equipment (e.g., Dumbbells, Bands). |
| Gender     | User gender.                                          |
| Workout    | Multi-day workout plans in JSON format.               |

**Example Workout Plan (JSON):**

```json
[
  [
    { "exercise": "dumbbell press", "sets": 3, "reps": 10 },
    { "exercise": "push-ups", "sets": 3, "reps": 12 }
  ],
  [{ "exercise": "squats", "sets": 4, "reps": 10 }]
]
```

---

## Model Training

1. **Preprocess the Dataset:**
   - Convert `Workout` column from string to JSON and flatten into a format suitable for sequence generation.
2. **Tokenize Inputs and Outputs:**
   - Use `Tokenizer` to convert text to integer sequences.
3. **Train the Model:**
   - Sequence-to-sequence architecture with an LSTM-based encoder-decoder.
   - Include beam search for improved generation during inference.

---

## Generating Personalized Workouts

1. **Load Tokenizers and Model:**
   - Tokenizers and model weights are saved as `.pkl` and `.h5` files, respectively.
2. **Input User Preferences:**
   - Provide details like goals, level, days, time, equipment, and gender.
3. **Run the Server:**

   ```bash
   cd server/hosting
   python app.py
   ```

4. **Get the Data**
   - API call is `http://127.0.0.1:5000/` with the method `POST` and input the following
   ```
   {
       "input": Build Muscle, Intermediate, 4 days, 60 minutes, Dumbbells, Male",
       "days": 4
   }
   ```

---

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
