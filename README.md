This project was inspired by [a YouTube tutorial I saw by Catalin Miron](https://www.youtube.com/watch?v=g5rCMlPTgrM&feature=youtu.be). While I picked up on some concepts via osmosis while following his tutorial, I believe that you don't truly understand something until you can explain it to others.

As such, I challenged myself to analyze Catalin's code so deeply that I was actually able to improve on it! I used the _Feynman Technique_ to continually question which parts of this project I needed to develop a better understanding of before I would feel confident walking other developers on my team through this codebase.

Here are some of the questions and answers I came up with over the last couple weeks working on this project on the side of my full-time dev job.

Hopefully after looking through my code and the following Q&As you too will feel confident starting to implement React Native Animated in your own projects or your projects at work! :D

---

## Why do we need the CellRendererComponent prop?

When creating a stacked flatlist it’s important to note that the zIndex of flatlist items increments with each item. In other words, by default the final flatlist items rendered will have the greatest zIndex values and thus render at the top of one’s stack.

As a result, the default behavior of flatlist is to have the last item rendered appear at the top of the stack.

We want to reverse this effect so that the user perceived items rendered later on as appearing “behind” the previously rendered items.

---

## I can’t find the CellRendererProp in the React Native FlatList Docs. Where did this prop come from?

It comes from VirtualizedList which is the base implementation upon which FlatList and SectionList were built upon.

---

## Why do we need to disable scroll behaviors?

We set the FlatList scrollenabled prop to false in order to rely on gestures from the react-native-gesture-library rather than flatlist’s default gestures.

---

## What does the removeClippedSubviews prop do?

This Flatlist prop is said to sometimes improve the scrolling performance of large lists. Unfortunately this prop is also known to sometimes result in missing content. We need to set this prop to false because it’s default value is true on Android.

---

## What is the importance of useNativeDriver?

By using the native driver, we’re able to send all of the information about the animation to native before the animation begins. This enables the native code to perform the animation on the UI thread. As a result, our animation will not have to cross the React Native Bridge on each frame. Thus, our users will still enjoy a smooth animation even if the JS thread were to get blocked.

---

## What is Animated.Spring()?

The docs say that this method,

> “Animates a value according to an analytical spring model based on damped harmonic oscillation”

As such, you can probably imagine this is difficult to explain concisely in an accessible manner to those not coming from a physics background. In essence, however, Animated.spring allows us to define values that will be animated from start to finish without needing to define a specific animation duration length.

This method of animating also mimics the physics of movement in the real world.

---

## What is interpolation?

Interpolation is a way of estimating unknown values within a range of known values.

---

## Why do we need to use React-Native-Gesture-Handler?

---

The default gesture system in React is called “Gesture Responder System”. Gesture Responder System, however, unfortunately handles gestures in the JS thread.

React-Native-Gesture-Handler was created used to implement smooth gesture interactions that run in the UI thread instead of the JS thread. This ensures gestures will still run smoothly even if the JS thread is blocked.

---

## How do the React-Native-Gesture-Handler library’s gesture handlers work?

Gesture handlers are basically “state machines” that at any given time are assigned one of six possible states. The assigned state has the potential to change when certain touch events occur.

By monitoring a given gesture handler’s state using the onHandlerStateChange() method we can drive different actions in our app.

---

## What is Animated.Value?

Animated.Value is the standard value for driving animations typically initialized with the following line of code:

```
new Animated.Value(0)
```

---

## How do we change the value of an Animated Value?

The most common way to do so would be to use the setValue() method.

---

## Why should we use Animated.Value instead of simply using state?

The performance offered by Animated.Value and the setValue() method is superior (in part due to value changes not resulting in re-renders).

---

## What is the benefit of using the useWindowDimensions hook vs using the Dimensions API?

---

The useWindowDimensions hook automatically updates as the user’s window changes sizes (due to device rotations, foldable devices, etc.)

With the Dimensions API, however, it is necessary to manually set up event listeners to subscribe to these changes.
