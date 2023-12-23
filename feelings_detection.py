from transformers import AutoTokenizer, pipeline
from optimum.onnxruntime import ORTModelForSequenceClassification

model_id = "SamLowe/roberta-base-go_emotions-onnx"
file_name = "onnx/model_quantized.onnx"

model = ORTModelForSequenceClassification.from_pretrained(model_id, file_name=file_name)
tokenizer = AutoTokenizer.from_pretrained(model_id)

def label_emotion_scores(input_text):
    onnx_classifier = pipeline(
        task="text-classification",
        model=model,
        tokenizer=tokenizer,
        top_k=None,
        function_to_apply="sigmoid",  # optional as is the default for the task
    )

    model_outputs_results = onnx_classifier(input_text)

    return model_outputs_results


def enhanced_results_scores(results, filter_score):
    """
    :param results: results from the text-classification pipeline
    :param filter_score: value for which it should be marked as True or False for filtering
    :return:
    """

    emotions_dict = {
        'admiration': "Finding something impressive or worthy of respect",
        'amusement': "Finding something funny or being entertained",
        'anger': "A strong feeling of displeasure or antagonism",
        'annoyance': "Mild anger, irritation",
        'approval': "Having or expressing a favorable opinion",
        'caring': "Displaying kindness and concern for others",
        'confusion': "Lack of understanding, uncertainty",
        'curiosity': "A strong desire to know or learn something",
        'desire': "A strong feeling of wanting something or wishing for something to happen",
        'disappointment': "Sadness or displeasure caused by the nonfulfillment of one’s hopes or expectations",
        'disapproval': "Having or expressing an unfavorable opinion",
        'disgust': "Revulsion or strong disapproval aroused by something unpleasant or offensive",
        'embarrassment': "Self-consciousness, shame, or awkwardness",
        'excitement': "Feeling of great enthusiasm and eagerness",
        'fear': "Being afraid or worried",
        'gratitude': "A feeling of thankfulness and appreciation",
        'grief': "Intense sorrow, especially caused by someone’s death",
        'joy': "A feeling of pleasure and happiness",
        'love': "A strong positive emotion of regard and affection",
        'nervousness': "Apprehension, worry, anxiety",
        'optimism': "Hopefulness and confidence about the future or the success of something",
        'pride': "Pleasure or satisfaction due to one's own achievements or the achievements of those with whom one is closely associated",
        'realization': "Becoming aware of something",
        'relief': "Reassurance and relaxation following release from anxiety or distress",
        'remorse': "Regret or guilty feeling",
        'sadness': "Emotional pain, sorrow",
        'surprise': "Feeling astonished, startled by something unexpected",
        'neutral': "No particular emotion label detected"
    }
    emotions_dict.setdefault('No definition found')

    # Enhancing the text-classification model results with important metadata
    enhanced_results = []

    for emotion_result in results:
        # Augment the emotion_result with additional information
        emotion_name = emotion_result.get('label')
        enhance_emotion_result = {
            'emotion': emotion_name,  # Renaming the key from the classifier model
            'definition': emotions_dict.get(emotion_name),
            'score': emotion_result.get('score'),
            'filter': filter_score < emotion_result.get('score')  # Any scores below a certain threshold can be filtered
        }

        enhanced_results.append(enhance_emotion_result)

    return enhanced_results

def process_single_result(input_text, acceptable_filter_score):

    single_result = label_emotion_scores(input_text)[0]
    enhanced_single_result = enhanced_results_scores(single_result, acceptable_filter_score)

    return enhanced_single_result

def main():
    input_text = ("I just feel mentally exhausted you know. I don't even know why I am tired in the first place and "
                  "what's weighing me down. And because of that, I feel like I've lost progress on the last few "
                  "weeks. I was mainly lying down in bed, suffering, but I can't even tell what. I guess it weighs on "
                  "me to not feel like I have made more progress - is that being fair to myself?")

    print(process_single_result(input_text=input_text, acceptable_filter_score=0.1))


if __name__ == "__main__":
    main()
