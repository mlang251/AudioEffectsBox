# AudioEffectsBox

__Victoria Suha, Mark Lang, Jack Davis, Chris Babroski, Nick Knaian__
--------
### Introduction

The purpose behind our project is to create a device which enables the user to intuitively create audio effects in 3D space. At the project’s most basic level, we are attempting to map three separate parameters of audio processing to x-y-z axes, the coordinates of which the user is able to set and change fluidly using his or her own hands. Typically, effects are applied using sliders or knobs on a mixing board, which is uninteresting and sometimes tedious. We believe that moving one’s hand and hearing the levels of applied musical effects mirror that movement will not only make for a very natural, emotive experience, but will also revolutionize the way that modern musical artists and performers utilize post-processing effects.

We intend to use motion-tracking technology to map the user’s hand movements in real-time within a “cube of interactivity.” We will then send the coordinates of these movements to a DSP module, wherein the values on any given axis will be assigned to an effect parameter. An example of this is a bandpass filter, in which case the three variable parameters might be center frequency, selectivity, and gain. The effects will be applied to the digitized audio input and then outputted as an analog signal, ready to be played through a speaker.
