# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

Inspiration: [rhythm challenge](https://youtu.be/z_fJTMWPqcw?si=a3XxshY8nKx28pDA)

## how to calculate BPM

BPM = 1 min / beat duration
BPM = 60s / beat duration

ex: 60s/0.5s = 120 BPM

Beat duration = 60 / BPM
ex: 60s / 100 BPM = 0.6s = 600ms

## Todos:
- [ ] metronome logic
- [ ] clickable icons
- [ ] adjustable volume
- [ ] pause and play with space bar button
- [ ] slider for tempo, can also just type it in


probably use svelte context api