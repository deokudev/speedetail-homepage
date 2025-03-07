import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'Speedetail RSS Feed',
    site_url: 'http://www.speedetail.com',
    feed_url: 'http://www.speedetail.com/feed.xml',
    description:
      'A4에 뽑아쓰는 SPEEDETAIL 자기주도 스케줄러 & All-in-One 인생 관리 앱 [Self-Directed Scheduler for A4 Printing & All-in-One Life Management App]',
    language: 'en',
    pubDate: new Date().toUTCString(),
    generator: 'Speedetail',
    ttl: 100,
    managingEditor: 'frameworkers',
  })

  // 최근 2일 동안의 날짜 계산
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  feed.item({
    title: 'Speedetail App Download',
    url: 'http://www.speedetail.com/download',
    description: 'Speedetail Android App',
    date: yesterday.toUTCString(),
  })

  feed.item({
    title: 'Speedetail A4 Template Download',
    url: 'http://www.speedetail.com/download',
    description: 'Speedetail A4 Template',
    date: today.toUTCString(),
  })

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
