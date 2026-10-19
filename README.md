# PS MEDIA Official website
Vite + React + TypeScript + Tailwind. Edit text, brands and contact details in `src/data/site.ts`.

## Deploy (GitHub Actions -> GitHub Pages)
Settings -> Pages -> Source: GitHub Actions. `.github/workflows/deploy.yml` builds on every commit.

## Forms
Create a Formspree form that sends to psmediaofficial6@gmail.com, then add a repository variable
`VITE_FORM_ENDPOINT` (Settings -> Secrets and variables -> Actions -> Variables) with the form URL.
Until it is set, forms show an error and never pretend to send.

## Local
`npm install && npm run dev`
