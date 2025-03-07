import clsx from 'clsx'
import Link from 'next/link'
import { SvgIcon } from './SvgIcon'

const FooterLink = (props: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      className={clsx(
        'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
      )}
      {...props}
    />
  )
}

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="relative mx-auto flex w-full flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
      <div className="absolute h-px w-full bg-slate-100 dark:bg-slate-800" />
      <div className="my-4 flex max-w-[100rem] flex-wrap gap-6 p-6">
        <FooterLink href="https://www.speedetail.com">
          &copy; {year} Speedetail
        </FooterLink>
        <FooterLink
          href="https://www.youtube.com/watch?v=dnnLZyxuuBg&list=PLw8oFCVbjkPnjySbVFhNVdk7v22gg9mon"
          className="flex items-center"
        >
          <SvgIcon name="youtube" className="flex h-5 items-center" />
        </FooterLink>
        <FooterLink
          href="https://blog.naver.com/speedetail"
          className="flex items-center"
        >
          <SvgIcon name="blog" className="flex h-5 items-center" />
        </FooterLink>
        <FooterLink href="/terms">Terms of Service</FooterLink>
        <FooterLink href="/privacy">Privacy Policy</FooterLink>
        <FooterLink href="/faq">FAQ</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </div>
    </div>
  )
}
