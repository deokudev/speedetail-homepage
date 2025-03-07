import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { navigation } from '@/lib/navigation'
import { Icon } from './Icon'

// info: Firebase Hosting 새로고침 404 에러를 위해, trailingSlash 설정으로 인해 끝에 '/'가 붙는 경우를 위해 추가
function normalizePathname(path: string) {
  return path.replace(/\/$/, '') // 끝에 있는 '/' 제거
}

export function Navigation({
  className,
  onLinkClick,
}: {
  className?: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  let pathname = usePathname()
  let normalizedPathname = normalizePathname(pathname)

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-proxyma font-bold text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul
              role="list"
              className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            >
              {section.links.map((link) => {
                const isVideo = link.href.startsWith('https://www.youtube.com')
                const normalizedLinkHref = normalizePathname(link.href)
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className={clsx(
                        'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                        normalizedLinkHref === normalizedPathname
                          ? 'font-semibold text-sky-500 before:bg-sky-500'
                          : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
                      )}
                    >
                      {isVideo && (
                        <Icon
                          icon="video"
                          width={16}
                          className="mr-1 inline"
                          color="currentColor"
                        />
                      )}
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
