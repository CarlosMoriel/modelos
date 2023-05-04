from fastai.vision.all import *
from fastai.vision.utils import *
import matplotlib.pyplot as plt
import gradio as gr
import numpy as np
import json

learn = load_learner('brands_components/brands_components.pkl')
categories = ("amd_cpu", "amd_gpu", "intel_cpu", "macbook", "nvidia_gpu", "pc_gamer")

def classify_brands(img, threshold=0.8):
    imgToPredict = plt.imread(img)
    pred = learn.predict(imgToPredict)
    pred_probs_dec = [f"{p:.20f}" for p in pred[2].tolist()]
    max_prob = max(pred[2].tolist())
    if max_prob >= threshold:
        return pred[0], pred_probs_dec
    else:
        return "Uncertain", pred_probs_dec

def getClassesForLearner(learner):
    return learner.dls.vocab

def getLearner():
    return learn

def getCategories():
    return categories

def getProbsInDecimal(pred):
    pred_probs_dec = [f"{p:.20f}" for p in pred[2].tolist()]
    return pred_probs_dec