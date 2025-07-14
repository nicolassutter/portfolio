import { type Component, For } from 'solid-js'
import ServerIcon from 'lucide-solid/icons/server'
import BlocksIcon from 'lucide-solid/icons/blocks'
import type { getHomelabData, getHomelabServices } from '../modules/requests'
import { DynamicIcon } from './DynamicIcon'

export const HeroSection: Component = () => {
  return (
    <section class='grid gap-8'>
      <h1 class='text-4xl font-bold flex items-center gap-4'>
        <ServerIcon
          class='text-primary'
          aria-hidden={true}
        />
        My Homelab Journey
      </h1>

      <p class='text-lg max-w-4xl leading-relaxed'>
        My homelab is more than just a collection of servers, it's my personal
        playground for learning, experimenting, and hosting the services I rely
        on daily. What started as a single Raspberry Pi has evolved into a
        robust infrastructure that teaches me about distributed systems, DevOps
        practices, and infrastructure management.
      </p>

      <div class='bg-card border border-border rounded-lg p-6'>
        <h3 class='text-xl font-semibold mb-4'>Philosophy</h3>
        <p class='leading-relaxed max-w-4xl'>
          I believe in <strong class='text-foreground'>self-hosting</strong> for
          privacy, learning, and control. Every service I run teaches me
          something new about networking, security, or system administration.
        </p>
      </div>
    </section>
  )
}

export const ArchitectureSection: Component = () => {
  return (
    <section class='grid gap-8'>
      <h2 class='text-3xl font-bold flex items-center gap-4'>
        <BlocksIcon class='text-primary' />
        Architecture & Design Decisions
      </h2>

      <p class='leading-relaxed max-w-4xl'>
        I have two homelabs: one at home and one hosted on Hetzner. My home
        server runs everything for my media server, personal projects, and
        development environment. The Hetzner server is used for more critical
        services, like my Immich (photo management), Nextcloud (cloud storage)
        and Vaultwarden (password management) instances, which need higher
        availability, say in the case of if my cat decides to chew through my
        fiber cable... 🐈
      </p>

      <div class='relative w-full aspect-video rounded-lg overflow-hidden'>
        <div
          aria-hidden='true'
          class='absolute z-0 bg-muted flex items-center justify-center w-full h-full'
        >
          <p class='text-muted-foreground'> Figjam board loading... </p>
        </div>
        <iframe
          style='border: 1px solid rgba(0, 0, 0, 0.1);'
          width='800'
          height='450'
          title='Homelab Architecture Overview'
          allowfullscreen
          class='size-full relative z-1'
          src={
            'https://embed.figma.com/board/XYMrshniyKxFbrEWydQP2o/homebox-and-vps-architecture?node-id=0-1&embed-host=share'
          }
        />
      </div>
    </section>
  )
}

export const ServicesSection: Component<{
  services: Awaited<ReturnType<typeof getHomelabServices>>
}> = (props) => {
  return (
    <section>
      <h2 class='text-3xl font-bold mb-8 flex items-center gap-3'>
        <svg
          class='w-7 h-7 text-primary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <ellipse
            cx='12'
            cy='5'
            rx='9'
            ry='3'
          />
          <path d='m3 5 9 9 9-9' />
          <path d='m3 12 9 9 9-9' />
          <path d='m3 5v14c0 3 4.5 4 9 4s9-1 9-4V5' />
        </svg>
        Services & Applications
      </h2>
      <div class='grid gap-8'>
        <For each={Object.entries(props.services)}>
          {([categoryName, { services, icon }]) => (
            <div class='bg-card border border-border rounded-lg p-6'>
              <h3 class='text-xl font-semibold mb-4 text-primary flex items-center gap-2'>
                <DynamicIcon icon={icon} />
                {categoryName}
              </h3>
              <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <For each={services}>
                  {(service) => (
                    <div class='bg-muted rounded-lg p-4'>
                      <h4 class='font-semibold mb-2'>{service.name}</h4>
                      <p class='text-base text-muted-foreground mb-3'>
                        {service.description}
                      </p>
                      <div class='text-base text-primary'>
                        Why: {service.why}
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </section>
  )
}

export const LearningSection: Component<{
  learnings: Awaited<ReturnType<typeof getHomelabData>>['learnings']
}> = (props) => {
  return (
    <section>
      <h2 class='text-3xl font-bold mb-8 flex items-center gap-3'>
        <svg
          class='w-7 h-7 text-primary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <rect
            width='20'
            height='14'
            x='2'
            y='3'
            rx='2'
          />
          <line
            x1='8'
            x2='16'
            y1='21'
            y2='21'
          />
          <line
            x1='12'
            x2='12'
            y1='17'
            y2='21'
          />
        </svg>
        What I've Learned
      </h2>
      <div class='bg-card border border-border rounded-lg p-8'>
        <div class='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h3 class='text-xl font-semibold mb-4 text-primary'>
              Technical Skills
            </h3>
            <ul class='grid gap-3'>
              <For each={props.learnings?.technicalSkills}>
                {(skill) => (
                  <li class='flex items-center gap-3 before:content-[""] before:size-2 before:bg-primary before:rounded-full'>
                    <span>{skill.text}</span>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div>
            <h3 class='text-xl font-semibold mb-4 text-primary'>Key Lessons</h3>

            <ul class='grid  gap-3'>
              <For each={props.learnings?.keyLessons}>
                {(lesson) => (
                  <li>
                    <h4 class='font-semibold mb-1'>{lesson.title}</h4>
                    <p class='text-base text-muted-foreground'>
                      {lesson.description}
                    </p>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>

        <div class='mt-8 pt-8 border-t border-border'>
          <h3 class='text-xl font-semibold mb-4 text-primary'>
            Architecture Evolution
          </h3>
          <ol class='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <For each={props.learnings?.architecturePhases}>
              {(phase) => (
                <li class='bg-muted rounded-lg p-4'>
                  <h4 class='font-semibold mb-2'>{phase.title}</h4>
                  <p class='text-muted-foreground'>{phase.description}</p>
                </li>
              )}
            </For>
          </ol>
        </div>

        <div class='mt-8 pt-8 border-t border-border'>
          <h3 class='text-xl font-semibold mb-4 text-primary'>
            Biggest Challenges Overcome
          </h3>
          <ul class='grid gap-4'>
            <For each={props.learnings?.biggestChallenges}>
              {(challenge) => (
                <li class='flex gap-4'>
                  <div class='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0'></div>
                  <div>
                    <h4 class='font-semibold mb-1'>{challenge.title}</h4>
                    <p class='text-muted-foreground'>{challenge.description}</p>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </section>
  )
}
