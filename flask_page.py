from flask import Flask, render_template, request
from feelings_detection import process_single_result

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
    return render_template('index.html')

@app.route('/processed_emotion', methods=['GET', 'POST'])
def processed_emotion():
    input_text = request.form['input_text']
    acceptable_filter_score = 0.1
    single_result = process_single_result(input_text=input_text, acceptable_filter_score=acceptable_filter_score)
    return render_template('processed_text.html', input_text=input_text, filtering_threshold=acceptable_filter_score, emotion_results=single_result)

if __name__ == "__main__":
    app.run()