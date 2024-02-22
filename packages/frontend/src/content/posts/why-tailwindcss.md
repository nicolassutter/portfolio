---
id: 219553e2-3c10-4450-bd2a-660944247fa3
title: Why I use Tailwind CSS
lang: en
thumbnail: /why-tailwindcss.png
---

So... I have been using [Tailwind CSS](https://tailwindcss.com/) for about 4 years at this point and in this article I would like to present why I wouldn't want to write CSS any other way.

## A bit of history

Before using Tailwind, I only used SCSS to generate some utility classes. This came with a lot of poorly readable code that always looked the same from project to project since these were "essential" utilities. At some point I asked myself if there wasn't a better way to somewhat automate this utilities generation process and that's when I stumbled upon Tailwind CSS.

## My Tailwind CSS debut

When I started using Tailwind, I ended up kind of lost. While it did simplify the generation of utility classes, it also came with **a lot** of vocabulary. So, for the first few weeks I ended up spending most of my time switching between my code and the Tailwind documentation.

> What's the class to modify the line height of this element ? ... Ah right, `leading-2`, of course.

After those few weeks though, that's when I understood.

## Blazingly fast

Once I memorized the few obscure utility classes like `leading-2` and the more obvious ones like `m-2` (for margin) I felt like and absolute HTML and CSS god 😅.

**The first advantage** (and most important in my opinion) is that I never needed to leave my HTML (or whatever framework), everything was in one place, this felt great as I always knew where to look when things inevitably broke.

This also meant that I could integrate my designs a lot faster than before since I didn't need to jump around files, I could just concentrate on the task at hand.

## Maintainability

Since my styles now lived with my HTML, I no longer needed to maintain multiple CSS files. For example in React, I often used to have my `ComponentName.tsx` file and a `ComponentName.scss` file. After switching to Tailwind, I only needed my `ComponentName.tsx` file, that means that if my `hotpink` div is not `hotpink` anymore, all I have to do is check the div in my component and immediately notice I wrote `bg-pink`.

Another benefit was that I didn't have to spend time thinking of class names anymore, which to be honest, is a major pain and probably the hardest thing in CSS (really, naming things in general). Every CSS class I needed already existed, which is definitely a time saver !

## Maintainability #2

If you've been on Twitter recently... or really ever, you might have seen the Tailwind drama that seems to occur once every full moon. The main reason for this drama is that while Tailwind has every utility you could imagine, that means that for each utility comes a class name that needs to be added to your HTML.
Here's an example of my `hotpink` button:

```html
<button
  class="rounded-md px-5 py-2 font-bold outline outline-2 outline-[hotpink] transition-colors hover:bg-[hotpink]"
>
  Button
</button>
```

It's kind of a lot.
Especially if that button needs to be reused.

**But**, nowadays you're probably using some sort of framework or at least a tool that allows you to import / include html parts, or "components". This means that you can, and definitely should, leverage these tools to create reusable Tailwind styled components.

By doing this you can:

- Benefit from very fast and reliable utility classes generation
- Integrate your designs blazingly fast
- **and** reuse that code without bloating your HTML

Yes your HTML is still more bloated than before when the only classes you'd have would be `btn btn-hotpink` but I strongly believe that having everything in one place outweighs the slightly heavier HTML, especially when you quickly need to fix some CSS.

## Avoiding specificity

With Tailwind, every CSS class is generated without any additional specificity, that means that you no longer need to maintain specific rules, and when you need to edit some CSS you do not risk breaking anything else in your design since everything is decoupled in small utilities.

The fact that you do not need to ask yourself if changing this one "small line of CSS" is going to break anything else that you didn't even know existed is just pure joy 🫶.

## Final words

I really think I could not go back to writing "normal CSS" as Tailwind just made my workflow so much faster and easier. Although... I am very interested to look into [UnoCSS](https://unocss.dev/) to see what it has to offer.

On that note, I hope I managed to get my thoughts across ! 😉

See you. 👋
