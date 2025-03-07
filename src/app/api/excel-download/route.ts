import { NextResponse } from 'next/server'
import { DownloadUtil } from '@/utils/download.util'

export async function GET(request: Request) {
  try {
    // URL 객체를 사용하여 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url)
    let type = searchParams.get('type')
    type = type ? type.replace('_excel', '') : 'wide'

    // type 파라미터 유효성 검사
    if (type && !['wide', 'narrow'].includes(type)) {
      return NextResponse.json(
        { error: 'type은 wide 또는 narrow만 가능합니다.' },
        { status: 400 },
      )
    }

    const excelType = (type as 'wide' | 'narrow') || 'wide'

    const { data, downloadFileName } =
      await DownloadUtil.downloadExcelFileBuffer(excelType)

    if (!data) {
      throw new Error('엑셀 파일 생성 실패')
    }

    const uint8Array = new Uint8Array(data)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(downloadFileName)}`,
        'Content-Length': uint8Array.length.toString(),
      },
    })
  } catch (error) {
    console.error('Excel 다운로드 에러:', error)
    return NextResponse.json(
      { error: '파일 다운로드에 실패했습니다' },
      { status: 500 },
    )
  }
}
