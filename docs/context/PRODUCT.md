# Product — Static Gym App MVP

> Absolute truth of the current product. Update when the product meaningfully changes.
> Human-maintained — `lane fold` does not write to this file.

## What it is
A React + TypeScript single-page app, built to static files (Vite), that helps a gym
user pick a workout routine for their goal, calculate a personalized nutrition plan,
and browse exercises by target muscle with demo videos. No backend/API — all data and
logic ship in the static bundle.

## Who uses it
Individual gym-goers (beginner to intermediate) who want a quick, no-signup answer to
"what should I train / eat / do for muscle X" without installing an app or creating an
account.

## What it does
- Generates a weekly workout routine from a chosen goal (abs, bulk, cut/lean, general
  fitness, strength, endurance) using rule-based static data.
- Calculates BMR/TDEE, calorie target, and macro (protein/carb/fat) breakdown from
  gender, age, height, weight, and activity level (Mifflin-St Jeor formula), plus
  static baseline vitamin/mineral guidance.
- Lists exercises filterable by target muscle/body part, each linking to a YouTube
  demo video.
- Presents all of the above through one shared Tailwind-based design system (tokens +
  reusable component library).

## What it doesn't do
- No user accounts, login, or persisted history/progress tracking.
- No payments/subscriptions.
- No real-time tracking or wearable integration.
- No custom video hosting (YouTube links/embeds only).
- No server-side rendering or backend API — output is purely static files.
