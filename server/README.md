# Personalized Workout Generator

## Table of Contents

1. [Requirements](#requirements)
2. [Setup and Installation](#setup-and-installation)
3. [Dataset Format](#dataset-format)
4. [Model Training](#model-training)
5. [Generating Personalized Workouts](#generating-personalized-workouts)

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

1. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

2. **Install Requirements:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Start Jupyter Notebook**
   Launch Jupyter Notebook to run the project interactively:

   ```bash
   jupyter notebook
   ```

4. **Run the Scripts:**
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
