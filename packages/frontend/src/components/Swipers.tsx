import type { Component } from 'solid-js'
import { SwiperWrapper } from './SwiperWrapper'
import type { Article } from '../../types/types'
import { Button } from './Button'
import { Dynamic } from 'solid-js/web'
import type { CollectionEntry } from 'astro:content'

export const PostsSwiper: Component<{
  posts: (Article & { slug?: string })[]
}> = (props) => {
  return (
    <SwiperWrapper
      ariaDescribedBy='posts-title'
      config={{
        slidesPerView: 1.3,
        spaceBetween: 24,
        breakpoints: {
          640: {
            slidesPerView: 2.3,
          },
          768: {
            slidesPerView: 3.3,
          },
          1024: {
            slidesPerView: 4.3,
          },
        },
      }}
    >
      {props.posts.map((post) => (
        <Dynamic
          component='swiper-slide'
          class='h-auto rounded-xl bg-zinc-900 p-6 flex gap-5 flex-col-reverse justify-end'
        >
          <div class='h-full flex flex-col'>
            <h3 class='font-bold text-xl'>{post.title}</h3>

            {(post.url || post.slug) && (
              <div class='mt-auto'>
                <Button
                  tag='a'
                  href={post.url ?? `/blog/${post.slug}`}
                  class='max-w-[unset] w-full mt-8'
                  target={post.url ? '_blank' : undefined}
                  rel={post.url ? 'noopener noreferrer' : undefined}
                >
                  Read
                  {!post.slug && (
                    <>
                      <i class='lucide:external-link text-lg'></i>
                      <span class='sr-only'>in new tab</span>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <img
            src={post.thumbnail}
            alt=''
            class='rounded-lg w-full aspect-[16/9] object-cover'
          />
        </Dynamic>
      ))}
    </SwiperWrapper>
  )
}

export const ProjectsSwiper: Component<{
  projects: CollectionEntry<'projects'>[]
}> = (props) => {
  return (
    <SwiperWrapper
      ariaDescribedBy='projects-title'
      config={{
        slidesPerView: 1.3,
        spaceBetween: 24,
        breakpoints: {
          640: {
            slidesPerView: 2.3,
          },
          1024: {
            slidesPerView: 3.3,
          },
        },
      }}
    >
      {props.projects.map((project) => (
        <Dynamic
          component={'swiper-slide'}
          class='rounded-xl bg-zinc-900 p-6 h-auto flex flex-col'
        >
          <h3 class='font-bold text-xl'>{project.data.title}</h3>

          {project.data.stack && (
            <>
              <span class='sr-only'>Technologies&nbsp;:</span>
              <ul class='flex flex-wrap gap-2 mt-4'>
                {project.data.stack?.map((tech) => (
                  <li>
                    <span class='block bg-zinc-700 font-medium text-zinc-200 text-xs p-1 rounded-md'>
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div
            class='mt-8 [&_a]:(underline text-white font-semibold transition-opacity) [&_a]:hover:(opacity-80) [&_p:not(:first-child)]:(mt-2)'
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
                <i class='lucide:external-link text-lg'></i>
                <span class='sr-only'>in new tab</span>
              </Button>
            </div>
          )}
        </Dynamic>
      ))}
    </SwiperWrapper>
  )
}
