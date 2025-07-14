import type { Component } from 'solid-js'
import { Typography } from './Typography'
import { Badge, Button } from './Buttons'
import { Show, For } from 'solid-js'
import { cn } from '../modules/utils'
import { DIRECTUS_PUBLIC_URL } from 'astro:env/client'
import type { Project } from '../modules/requests'
import ExternalLinkIcon from 'lucide-solid/icons/external-link'

export const ProjectCard: Component<{
  project: Project
  class?: string
}> = (props) => {
  return (
    <article
      class={cn(
        'relative p-4 bg-card text-card-foreground rounded-xl border border-border py-6 focus-within:ring-1 focus-within:ring-ring group flex flex-col gap-3',
        props.class,
      )}
    >
      <Show when={typeof props.project.thumbnail === 'string'}>
        <img
          src={`${DIRECTUS_PUBLIC_URL}/assets/${props.project.thumbnail}`}
          alt=''
          class='rounded-lg mb-2 w-full aspect-video object-cover'
        />
      </Show>

      <Typography.h3 class='group-hover:text-primary'>
        {props.project.title}
      </Typography.h3>

      {/* tags for used technologies */}
      <div>
        <p class='sr-only'>Technologies used:</p>
        <ul class='flex flex-wrap gap-1.5'>
          <For each={props.project.technologies}>
            {(tech) => (
              <li>
                <Badge>{tech}</Badge>
              </li>
            )}
          </For>
        </ul>
      </div>

      <Show when={props.project.description}>
        <div
          class='mt-2 text-muted-foreground'
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={props.project.description!}
        />
      </Show>

      <Show when={props.project.link}>
        <div class='mt-auto'>
          <Button
            as='a'
            href={props.project.link!}
            variant='muted'
            target='_blank'
            rel='noopener noreferrer'
            class='group/btn'
          >
            See it live
            <span class='sr-only'>in a new browser tab</span>
            <ExternalLinkIcon
              class='group-hover/btn:ml-2 transition-[margin-left] will-change-[margin-left]'
              aria-hidden='true'
            />
          </Button>
        </div>
      </Show>
    </article>
  )
}
