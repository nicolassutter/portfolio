// THIS FILE NEEDS TO BE TSX FOR UNO CSS TO SCAN

export const profile = {
  name: 'Sutter Nicolas',
  bio: `I am currently a **freelance full-stack software engineer** after 5 years of full-time web dev and a year as a **Lead Developer**.


I love to discover new technologies (and the JS ecosystem changes every 2 minutes, so that's nice I guess 🙃).

I also love making pizzas, but I am not sure it is relevant here. 🍕

On a more serious note, I am passionate about software and hardware as I love to solve problems and build things.

I currently host my own home media server on Docker with Caddy and a whole lot of open source projets.

I am looking for missions or full-time jobs opportunitites based on **React, Vue.js or SolidJS (❤️),  Node.js and TypeScript.**

I believe to be a good fit for a team that values quality, performance and maintainability; especially with all the JS based tech coming out these days.`,
  email: 'contact@sutter-nicolas.com',
  socials: {
    Github: {
      url: 'https://github.com/nicolassutter',
      icon: 'grommet-icons:github',
    },
    Malt: {
      url: 'https://www.malt.fr/profile/nicolassutter1',
      icon: 'custom:malt',
    },
    LinkedIn: {
      url: 'https://www.linkedin.com/in/nicolas-sutter-abb18b188/',
      icon: 'grommet-icons:linkedin',
    },
  } satisfies Record<string, { url: string; icon: string }>,
}
