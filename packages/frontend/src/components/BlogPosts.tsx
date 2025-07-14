import type { Component } from 'solid-js'
import { Typography } from './Typography'
import { Button } from './Buttons'
import slugify from 'slugify'
import { Show } from 'solid-js'
import { cn } from '../modules/utils'
import { DIRECTUS_PUBLIC_URL } from 'astro:env/client'
import type { Post } from '../modules/requests'

export const BlogPost: Component<{
  post: Post
  class?: string
}> = (props) => {
  return (
    <article
      class={cn(
        'relative p-4 bg-card text-card-foreground rounded-xl border border-border py-6 focus-within:ring-1 focus-within:ring-ring group grid gap-3 content-start',
        props.class,
      )}
    >
      <Show when={props.post.thumbnail}>
        <img
          src={`${DIRECTUS_PUBLIC_URL}/assets/${props.post.thumbnail}`}
          alt=''
          class='rounded-lg w-full aspect-video object-cover'
        />
      </Show>

      <Typography.h3 class='group-hover:text-primary'>
        {props.post.title}
      </Typography.h3>
      <Typography.p class='text-muted-foreground'>
        {props.post.excerpt}
      </Typography.p>

      <Button
        href={`/blog/${slugify(props.post.title!, { lower: true })}/${props.post.id}`}
        as='a'
        class='before:absolute before:inset-0 h-0 w-0 block opacity-0 p-0'
      >
        Read
      </Button>
    </article>
  )
}
