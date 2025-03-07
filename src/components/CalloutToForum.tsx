'use client'
import { Callout } from './Callout'

type Props = {}

export function CalloutToForum(_props: Props) {
  return (
    <Callout title="문의하기">
      <div className="mb-4">
        궁금하신 점이 있나요? <a href="mailto:speedetail2@gmail.com">이메일</a>
        로 편하게 문의해 주세요.
      </div>
    </Callout>
  )
}
