// THIS FILE NEEDS TO BE TSX FOR UNO CSS TO SCAN

export const profile = {
  name: 'Sutter Nicolas',
  bio: `I am currently a freelance full-stack developer living in Strasbourg, France.
I love to discover new technologies (and the JS ecosystem changes every 2 minutes, so that's nice I guess 🙃).
I also repair printers for my family as all developers do obviously, and I game on my free time.

On a more serious note, I am passionate about web development and I am always looking for new challenges.

I am looking for missions mostly based on React, Vue.js or SolidJS (❤️), Node.js and TypeScript.
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
