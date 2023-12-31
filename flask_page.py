from flask import Flask, render_template, request, redirect, url_for
from feelings_detection import process_single_result

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method =='POST':
        return redirect(url_for('home'))
    return render_template('index.html')

@app.route('/processed_emotion', methods=['GET', 'POST'])
def processed_emotion():
    input_text = request.form['input_text']
    acceptable_filter_score = 0.1
    single_result = process_single_result(input_text=input_text, acceptable_filter_score=acceptable_filter_score)

    return render_template('processed_text.html', input_text=input_text, filtering_threshold=acceptable_filter_score, emotion_results=single_result)

@app.route('/results', methods=['GET'])
def all_results():
    return render_template('all_results.html')


@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/analytics', methods=['GET'])
def analytics():
    return render_template('analytics.html')
  
if __name__ == "__main__":
    app.run()