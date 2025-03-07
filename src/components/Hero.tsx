import Image from 'next/image'
import { SvgIcon } from '@/components/SvgIcon'
import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import heroImage from '@/images/hero.png'

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <Image
              className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              unoptimized
              priority
            />
            <div className="relative">
              <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display font-proxyma text-3xl tracking-tight text-transparent">
                Live your life to the full.
              </p>
              <p className="text-1xl mt-3 font-proxyma tracking-tight text-slate-400">
                Speedetail 만의 특별한 시간관리 원칙으로
                <br />
                당신의 일상을 더 풍성하게 만듭니다.
              </p>
              <div className="lg: mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:justify-center lg:grid-cols-3 lg:justify-start">
                <Button
                  variant="secondary"
                  className="inline-flex items-center justify-center gap-2"
                  onClick={() => {
                    window.open(
                      'https://docs.google.com/forms/d/e/1FAIpQLSdg7ezwFzc9g4KrI0tu59ypNkS9zXbAtaosefhxghWRcgrvFQ/viewform',
                      '_blank',
                    )
                  }}
                >
                  <SvgIcon name="excel" />
                  Excel
                </Button>
                <Button
                  href="https://play.google.com/store/apps/details?id=com.speedetail.speedetailapp&pcampaignid=web_share"
                  target="_blank"
                  variant="secondary"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <SvgIcon name="android" />
                  Android
                </Button>
                <Button
                  href="https://apps.apple.com/kr/app/speedetail/id6502599511"
                  target="_blank"
                  variant="secondary"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <SvgIcon name="ios" />
                  iOS
                </Button>
                <Button
                  href=""
                  target="_blank"
                  variant="secondary"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <SvgIcon name="windows" />
                  Windows
                </Button>
                <Button
                  href=""
                  target="_blank"
                  variant="secondary"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <SvgIcon name="mac" />
                  Mac
                </Button>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-64 -top-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-44"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <Image
                src={heroImage}
                alt="A dog hacking Speedetail"
                priority
                className="scale-150"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
