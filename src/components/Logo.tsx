import Image from 'next/image'
import logoImage from '@/app/logo-circle.png' // app 폴더에서 이미지 import

export function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props}>
      <Image
        src={logoImage}
        alt="로고"
        width={40}
        height={40}
        className={props.className}
      />
    </div>
  )
}
