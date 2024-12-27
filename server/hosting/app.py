from flask import Flask, request
import pickle
import json
from tensorflow import keras
import numpy as np
import random
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def sample_decode(input_sequence, model, max_output_length, start_token, end_token, temperature=1.0):
    decoder_input = np.array([[start_token]])  
    generated_sequence = []
    
    encoder_input = np.array([input_sequence])  
    
    for _ in range(max_output_length):
        decoder_output = model.predict([encoder_input, decoder_input])[0, -1, :]
        
        probs = np.exp(decoder_output / temperature) / np.sum(np.exp(decoder_output / temperature))
        
        predicted_token = np.random.choice(len(probs), p=probs)  
        
        if predicted_token == end_token:
            break
        
        generated_sequence.append(predicted_token)
        decoder_input = np.array([[predicted_token]]) 

    return generated_sequence

def format_workout(sequence):
    decoded_sequence = [output_tokenizer.index_word.get(token, '') for token in sequence]
    decoded_sequence = [word for word in decoded_sequence if word not in ['start', 'end']]

    formatted_workout = ""
    day_count = 1
    for word in decoded_sequence:
        if word.startswith("Day"):
            formatted_workout += f"\n\nDay {day_count}:\n"
            day_count += 1
        else:
            formatted_workout += f"{word} "

    return formatted_workout.strip()

def generate_workout(user_input, input_tokenizer, output_tokenizer, days, max_input_length=107, max_output_length=50, temperature=1.0):
     # Tokenize User Input
    input_sequences = input_tokenizer.texts_to_sequences([user_input])
    input_vocab_size = len(input_tokenizer.word_index) + 1

    # Pad the input sequence to match the expected max input length used during training
    padded_input_sequences = keras.preprocessing.sequence.pad_sequences(input_sequences, maxlen=max_input_length, padding='post')

    # Define the special tokens for the output sequence
    start_token = output_tokenizer.word_index['start']
    end_token = output_tokenizer.word_index['end']

    # Generate the workout using temperature sampling
    generated_sequence = sample_decode(padded_input_sequences[0], model, max_output_length, start_token, end_token, temperature)

    # Convert generated sequence of tokens back to words
    generated_words = [output_tokenizer.index_word[token] for token in generated_sequence]

    # Join the words into a workout description
    length = days * random.randint(7, 9)
    generated_workout = ' '.join(generated_words[:length])
    
    return generated_workout

def create_workout_template_with_variations(generated_output, days=5):
    exercises = generated_output[1:-1].split("' '")
    
    # Distribute exercises into days
    day_workouts = {f"Day {i+1}": [] for i in range(days)}
    for idx, exercise in enumerate(exercises):
        day = f"Day {(idx % days) + 1}"  # Cycle through days

        if re.findall(r"\d", exercise) == [] and re.findall(r"day", exercise) == []:
            day_workouts[day].append(exercise)
            
        
    
    # Format the workout template with random sets and reps
    template = []
    for day, workout in day_workouts.items():
        if workout:  # Skip empty days
            template.append(f"{day}:")
            for exercise in workout:
                # Generate varying sets and reps
                sets = random.randint(2, 5)  # Randomize sets between 2 to 5
                reps = random.choice([8, 10, 12, 15])  # Randomize reps
                template.append(f"{exercise.replace('_', ' ').title()} (Sets: {sets}, Reps: {reps})")
            template.append("")  # Add a blank line after each day
    
    return "\n".join(template)

@app.route('/', methods=['POST'])
def get_workout():
    # Example usage
    data = request.json
    print(data)
    user_input = data.get('input')
    days = int(data.get('days'))
    
    # Generate workout using the function
    generated_workout = generate_workout(user_input, input_tokenizer, output_tokenizer, days)
    templated = create_workout_template_with_variations(generated_workout, days)

    return templated

if __name__ == '__main__':
    with open('../model/hosting_info/input_tokenizer.pkl', 'rb') as file:
        input_tokenizer = pickle.load(file)

    # Load output tokenizer
    with open('../model/hosting_info/output_tokenizer.pkl', 'rb') as file:
        output_tokenizer = pickle.load(file)
    
    with open('../model/hosting_info/config.json', 'r') as file:
        config = json.load(file)

    max_input_length = config['max_input_length']
    max_output_length = config['max_output_length']

    input_vocab_size = len(input_tokenizer.word_index) + 1
    output_vocab_size = len(output_tokenizer.word_index) + 1

    # Define Encoder
    encoder_input = keras.layers.Input(shape=(max_input_length,))
    encoder_embedding = keras.layers.Embedding(input_vocab_size, 128)(encoder_input)
    encoder_lstm, state_h, state_c = keras.layers.LSTM(128, return_state=True)(encoder_embedding)
    encoder_states = [state_h, state_c]
    encoder_model = keras.models.Model(encoder_input, encoder_states)

    # Define Decoder
    decoder_input = keras.layers.Input(shape=(max_output_length,))
    decoder_embedding = keras.layers.Embedding(output_vocab_size, 128)(decoder_input)
    decoder_lstm = keras.layers.LSTM(128, return_sequences=True)(decoder_embedding, initial_state=encoder_states)
    decoder_output = keras.layers.Dense(output_vocab_size, activation='softmax')(decoder_lstm)
    decoder_model = keras.models.Model([decoder_input] + encoder_states, decoder_output)

    # Full Model
    decoder_input_full = keras.layers.Input(shape=(max_output_length,))
    decoder_output_full = decoder_model([decoder_input_full] + encoder_states)
    model = keras.models.Model([encoder_input, decoder_input_full], decoder_output_full)

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    model.load_weights('../model/model_info/weights_10.weights.h5')

    app.run()