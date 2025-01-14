import type { Component } from 'solid-js'
import type { Article } from '../../types/types'
import { Button } from './Button'
import type { CollectionEntry } from 'astro:content'
import { For } from 'solid-js'

export const PostsSwiper: Component<{
  posts: (Article & { slug?: string })[]
}> = (props) => {
  return (
    <div class='w-full flex gap-2 overflow-x-auto'>
      <For each={props.posts}>
        {(post) => (
          <div class='rounded-xl bg-zinc-900 p-6 flex gap-5 flex-col-reverse justify-end relative shrink-0 w-full max-w-sm'>
            <div class='h-full flex flex-col'>
              <h3 class='font-bold text-xl'>{post.title}</h3>

              {(post.url || post.slug) && (
                <div class='mt-auto'>
                  <a
                    href={post.url ?? `/blog/${post.slug}`}
                    class='absolute inset-0'
                    target={post.url ? '_blank' : ''}
                    rel={post.url ? 'noopener noreferrer' : ''}
                  >
                    <span class='sr-only'>Read</span>
                    {!post.slug && (
                      <>
                        <span class='sr-only'>in new tab</span>
                      </>
                    )}
                  </a>
                </div>
              )}
            </div>

            <img
              src={post.thumbnail}
              alt=''
              class='rounded-lg w-full aspect-[16/9] object-cover'
            />
          </div>
        )}
      </For>
    </div>
  )
}

export const ProjectsSwiper: Component<{
  projects: CollectionEntry<'projects'>[]
}> = (props) => {
  return (
    <div class='w-full flex gap-2 overflow-x-auto'>
      <For each={props.projects}>
        {(project) => (
          <div class='rounded-xl bg-zinc-900 p-6 flex flex-col w-full max-w-sm shrink-0'>
            <h3 class='font-bold text-xl'>{project.data.title}</h3>

            {project.data.stack && (
              <>
                <span class='sr-only'>Technologies&nbsp;:</span>
                <ul class='flex flex-wrap gap-2 mt-4'>
                  <For each={project.data.stack}>
                    {(tech) => (
                      <li>
                        <span class='block bg-zinc-700 font-medium text-zinc-200 text-xs p-1 rounded-md'>
                          {tech}
                        </span>
                      </li>
                    )}
                  </For>
                </ul>
              </>
            )}

            <div
              class='mt-8 [&_a]:(underline text-white font-semibold transition-opacity) [&_a]:hover:(opacity-80) [&_p:not(:first-child)]:(mt-2)'
              // eslint-disable-next-line solid/no-innerhtml
              innerHTML={project.body}
            />

            {project.data.link && (
              <div class='mt-auto'>
                <Button
                  tag='a'
                  href={project.data.link}
                  class='max-w-[unset] w-full mt-8'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Open
                  <i class='lucide:external-link text-lg' />
                  <span class='sr-only'>in new tab</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </For>
    </div>
  )
}
