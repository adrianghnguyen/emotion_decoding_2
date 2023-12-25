var all_keys = [];

const emotionsObject = [
    {'emotion': 'confusion', 'definition': 'Lack of understanding, uncertainty', 'score': 0.5115205645561218, 'filter': true},
    {'emotion': 'disappointment', 'definition': 'Sadness or displeasure caused by the nonfulfillment of one’s hopes or expectations', 'score': 0.4156789779663086, 'filter': true},
    {'emotion': 'sadness', 'definition': 'Emotional pain, sorrow', 'score': 0.2096347063779831, 'filter': true},
    {'emotion': 'nervousness', 'definition': 'Apprehension, worry, anxiety', 'score': 0.07384779304265976, 'filter': false},
    {'emotion': 'annoyance', 'definition': 'Mild anger, irritation', 'score': 0.060360051691532135, 'filter': false},
    {'emotion': 'curiosity', 'definition': 'A strong desire to know or learn something', 'score': 0.04968513548374176, 'filter': false},
    {'emotion': 'realization', 'definition': 'Becoming aware of something', 'score': 0.04236293584108353, 'filter': false},
    {'emotion': 'disapproval', 'definition': 'Having or expressing an unfavorable opinion', 'score': 0.042225245386362076, 'filter': false},
    {'emotion': 'neutral', 'definition': 'No particular emotion label detected', 'score': 0.042141273617744446, 'filter': false},
    {'emotion': 'approval', 'definition': 'Having or expressing a favorable opinion', 'score': 0.023495947942137718, 'filter': false},
    {'emotion': 'remorse', 'definition': 'Regret or guilty feeling', 'score': 0.022241998463869095, 'filter': false},
    {'emotion': 'embarrassment', 'definition': 'Self-consciousness, shame, or awkwardness', 'score': 0.01206277683377266, 'filter': false},
    {'emotion': 'fear', 'definition': 'Being afraid or worried', 'score': 0.01028563641011715, 'filter': false},
    {'emotion': 'joy', 'definition': 'A feeling of pleasure and happiness', 'score': 0.008482920937240124, 'filter': false},
    {'emotion': 'caring', 'definition': 'Displaying kindness and concern for others', 'score': 0.008348815143108368, 'filter': false},
    {'emotion': 'optimism', 'definition': 'Hopefulness and confidence about the future or the success of something', 'score': 0.006742945406585932, 'filter': false},
    {'emotion': 'anger', 'definition': 'A strong feeling of displeasure or antagonism', 'score': 0.00634998083114624, 'filter': false},
    {'emotion': 'grief', 'definition': 'Intense sorrow, especially caused by someone’s death', 'score': 0.006329686846584082, 'filter': false},
    {'emotion': 'love', 'definition': 'A strong positive emotion of regard and affection', 'score': 0.006209855899214745, 'filter': false},
    {'emotion': 'admiration', 'definition': 'Finding something impressive or worthy of respect', 'score': 0.005935585591942072, 'filter': false},
    {'emotion': 'surprise', 'definition': 'Feeling astonished, startled by something unexpected', 'score': 0.005242573097348213, 'filter': false},
    {'emotion': 'desire', 'definition': 'A strong feeling of wanting something or wishing for something to happen', 'score': 0.004599140956997871, 'filter': false},
    {'emotion': 'relief', 'definition': 'Reassurance and relaxation following release from anxiety or distress', 'score': 0.004395181778818369, 'filter': false},
    {'emotion': 'excitement', 'definition': 'Feeling of great enthusiasm and eagerness', 'score': 0.004051568452268839, 'filter': false},
    {'emotion': 'disgust', 'definition': 'Revulsion or strong disapproval aroused by something unpleasant or offensive', 'score': 0.0031628129072487354, 'filter': false},
    {'emotion': 'amusement', 'definition': 'Finding something funny or being entertained', 'score': 0.0017975474474951625, 'filter': false},
    {'emotion': 'gratitude', 'definition': 'A feeling of thankfulness and appreciation', 'score': 0.0012866099132224917, 'filter': false},
    {'emotion': 'pride', 'definition': "Pleasure or satisfaction due to one's own achievements or the achievements of those with whom one is closely associated", 'score': 0.0008876784704625607, 'filter': false}
  ];
  
const entry_1 = {
    inputtext: 'first one',
    timestamp: '1',
    emotionResults: emotionsObject
};

const entry_2 = {
    inputtext: 'second one',
    timestamp: '2',
    emotionResults: emotionsObject
};

const test_keys = [entry_1, entry_2]

local_storage_keys = Object.keys(test_keys) //Object.keys(localStorage);

func display_keys(){
    
}

display_keys(local_storage_keys);
console.log(all_keys)

// document.getElementById("entries").innerHTML = all_keys.join('<br>'); // Inserts each entry key and a break