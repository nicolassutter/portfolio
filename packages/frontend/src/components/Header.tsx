import MoonIcon from 'lucide-solid/icons/moon'
import SunIcon from 'lucide-solid/icons/sun'
import ComputerIcon from 'lucide-solid/icons/monitor'
import BurgerIcon from 'lucide-solid/icons/menu'
import CloseIcon from 'lucide-solid/icons/x'
import { createSignal, createUniqueId, For, onMount, Show } from 'solid-js'
import { useTheme } from '../modules/theme'
import { Switch } from 'solid-js'
import { Match } from 'solid-js'
import type { Component } from 'solid-js'
import { Button } from './Buttons'
import type { Profile } from '../modules/requests'

export const ThemeToggle = () => {
  const iconClasses =
    'h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
  const { theme, setTheme } = useTheme()

  return (
    // the button doesn't take any space with position absolute
    // that way it doesn't affect the layout of the header when the client hydrates
    <Button
      onClick={() => {
        const nextTheme = theme() === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
      }}
      class='size-full relative p-0'
      title={`Toggle theme, current theme: ${theme()}`}
      aria-label={`Toggle theme, current theme: ${theme()}`}
    >
      <Switch>
        <Match when={theme() === 'dark'}>
          <SunIcon class={iconClasses} />
        </Match>

        <Match when={theme() === 'light'}>
          <MoonIcon class={iconClasses} />
        </Match>

        <Match when={theme() === 'system'}>
          <ComputerIcon class={iconClasses} />
        </Match>
      </Switch>
    </Button>
  )
}

export const Header: Component<{
  profile: Profile
}> = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false)
  let dialogRef: HTMLDialogElement | undefined
  let dialogContainer: HTMLDivElement | undefined

  const links = [
    { href: '/', label: 'home' },
    { href: '/projects', label: 'projects' },
    { href: '/blog', label: 'blog' },
    { href: '/homelab', label: 'Homelab' },
  ]

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
    dialogRef?.showModal()
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    dialogRef?.close()
  }

  // Handle dialog close event (including ESC key)
  const handleDialogClose = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle backdrop click
  const handleDialogClick = (e: MouseEvent) => {
    const path = e.composedPath()
    const isInDialog = path.includes(dialogContainer)
    if (!isInDialog) {
      closeMobileMenu()
    }
  }

  const [mounted, setMounted] = createSignal(false)
  onMount(() => {
    setMounted(true)
  })

  const dialogId = createUniqueId()

  return (
    <>
      <header
        aria-label='Navigation'
        role='navigation'
        class='fixed z-30 w-full top-2 lg:top-4 xl:top-6 px-4 left-0'
      >
        <div class='mx-auto w-full flex max-w-(--base-container) items-center justify-between gap-4 p-4 rounded-full border border-border backdrop-blur-lg bg-background/60'>
          <a
            href='/'
            class='transition-colors duration-300 ease-in-out font-custom flex shrink-0 items-center gap-2 text-xl font-bold'
            aria-label='Home'
            title='Home'
          >
            <span
              class='transition-opacity duration-200 ease-in-out text-content'
              aria-hidden={true}
            >
              {props.profile.name}
            </span>
          </a>

          <div class='flex items-center gap-2 md:gap-4'>
            {/* Desktop Navigation */}
            <nav
              class='hidden items-center gap-6 md:flex'
              aria-label='Main navigation'
              role='navigation'
            >
              <For each={links}>
                {(link) => (
                  <div class='relative'>
                    <a
                      href={link.href}
                      class='inline-block ease-in-out text-sm font-medium capitalize transition-colors duration-200 relative py-1 px-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary'
                    >
                      {link.label}
                    </a>
                  </div>
                )}
              </For>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              class='md:hidden p-3'
              onClick={openMobileMenu}
              aria-label={
                isMobileMenuOpen() ? 'Close mobile menu' : 'Open mobile menu'
              }
              aria-expanded={isMobileMenuOpen()}
              aria-controls={dialogId}
            >
              <Switch>
                <Match when={!isMobileMenuOpen()}>
                  <BurgerIcon class='size-6' />
                </Match>
                <Match when={isMobileMenuOpen()}>
                  <CloseIcon class='size-6' />
                </Match>
              </Switch>
            </Button>

            {/* reserve the height for the toggle */}
            <div class='size-10'>
              <Show when={mounted()}>
                <ThemeToggle />
              </Show>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      <dialog
        ref={dialogRef}
        id={dialogId}
        class='md:hidden backdrop:bg-background/80 backdrop:backdrop-blur-sm bg-transparent p-0 m-0 max-w-none max-h-none size-full border-0 outline-0'
        onClose={handleDialogClose}
        onClick={handleDialogClick}
        aria-label='Mobile navigation menu'
      >
        {/* Menu positioned at top */}
        <div
          ref={dialogContainer}
          class='fixed top-12 left-4 right-4 z-50'
        >
          <nav
            class='flex flex-col gap-1 p-4 rounded-2xl border border-border backdrop-blur-lg bg-background/95 shadow-lg'
            aria-label='Mobile navigation'
            role='navigation'
          >
            {/* Close button at the top of the menu */}
            <div class='flex justify-end mb-2'>
              <Button
                onClick={closeMobileMenu}
                class='p-2'
                aria-label='Close mobile menu'
                title='Close menu'
              >
                <CloseIcon />
              </Button>
            </div>

            <For each={links}>
              {(link, index) => (
                <a
                  href={link.href}
                  class='block px-4 py-3 text-sm font-medium capitalize transition-colors duration-200 rounded-lg hover:bg-muted hover:text-primary text-foreground'
                  onClick={closeMobileMenu}
                  {...{
                    autofocus: index() === 0, // Focus first item when dialog opens
                  }}
                >
                  {link.label}
                </a>
              )}
            </For>
          </nav>
        </div>
      </dialog>
    </>
  )
}
