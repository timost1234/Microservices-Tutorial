from flask import Flask, request, jsonify
from flask_cors import CORS
import json

import base64
import skimage.io
from skimage.transform import resize
import matplotlib.pyplot as plt

import tensorflow as tf
import tensorflow.keras as keras

import numpy as np



def base64_to_rgb(base64_str):

    if isinstance(base64_str, bytes):
        base64_str = base64_str.decode("utf-8")

    imgdata = base64.b64decode(base64_str)
    img = skimage.io.imread(imgdata, plugin='imageio')
    return img


app = Flask(__name__)
CORS(app)

@app.route("/v1/models/wood-iz_224-dr_0.3-lr_0.01:classify/", methods=['POST'])
def get_classify():

    result = request.get_json(silent=True)
    base = result['examples'][0]['image']['b64']

    

    img = base64_to_rgb(base)
    prediction = predict(img)

    return jsonify(prediction)


def predict(img):

    class_names = ['MaSx', 'PcSx', 'TgSx', 'UpSx', 'ZsSx']

    img = (resize(img, (160, 160))*255).astype(np.int)
    img = tf.expand_dims(img, 0) # Create a batch

    model = keras.models.load_model("model.h5")
    model.trainable=False

    optimizer = tf.keras.optimizers.Adam(0.001)
    model.compile(optimizer=optimizer,
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=['accuracy'])

    predictions = model.predict(img)
    score = tf.nn.softmax(predictions[0]).numpy()

    result = {"result": [[['MaSx', str(score[0])], ['PcSx', str(score[1])], ['TgSx', str(score[2])], ['UpSx', str(score[3])], ['ZsSx', str(score[4])]]]}
    
    print(
    "This image most likely belongs to {} with a {:.2f} percent confidence."
    .format(class_names[np.argmax(score)], 100 * np.max(score))
    )
    return result


if __name__ == '__main__':
    # app.debug = True
    app.run(host='localhost')