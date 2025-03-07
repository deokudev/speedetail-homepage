import {
  addMonths,
  getDay,
  lastDayOfMonth,
  endOfWeek,
  format,
  startOfWeek,
  addDays,
  getDate,
  getMonth,
} from 'date-fns'

import {
  Cell,
  ConditionalFormattingRule,
  Row,
  Workbook,
  Worksheet,
} from '@nbelyh/exceljs'

import { saveAs } from 'file-saver'

export namespace DownloadUtil {
  const getCurrentWeekRange = () => {
    const currentDate = new Date() // Get the current date

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Get the Monday of the current week
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 }) // Get the Sunday of the current week

    const formattedStartDate = format(startDate, 'yyyy-MM-dd') // Format the start date as 'YYYY-MM-DD'
    const formattedEndDate = format(endDate, 'yyyy-MM-dd') // Format the end date as 'YYYY-MM-DD'

    return `${formattedStartDate} ~ ${formattedEndDate}` // Return the date range as a string
  }

  const getCurrentMonday = () => {
    const currentDate = new Date() // Get the current date
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Get the Monday of the current week
    const formattedStartDate = format(startDate, 'yyMMdd') // Format the start date as 'YYYY-MM-DD'

    return `${formattedStartDate}` // Return the date range as a string
  }

  export const downloadExcelFileBuffer = async (
    excelType: 'wide' | 'narrow' = 'wide',
  ) => {
    const fileName =
      excelType === 'wide'
        ? 'speedetail_wide_template.xlsx'
        : 'speedetail_narrow_template.xlsx'
    const filePath = `/files/${fileName}`

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const fileUrl = `${baseUrl}${filePath}`

      const response = await fetch(fileUrl)
      if (!response.ok) {
        throw new Error('템플릿 파일을 찾을 수 없습니다')
      }
      const fileData = await response.arrayBuffer()

      const workbook = new Workbook()
      await workbook.xlsx.load(fileData)

      const yearlySheet = workbook.getWorksheet('speedetail_yearly')
      modifyYearlySheet(yearlySheet)

      const monthlySheet = workbook.getWorksheet('speedetail_monthly')
      modifyMonthlySheet(monthlySheet)

      const weeklySheet = workbook.getWorksheet('speedetail_weekly')
      modifyWeeklySheet(weeklySheet, excelType)

      const downloadFileName =
        excelType === 'wide'
          ? `speedetail_${getCurrentMonday()}_이번주의핵심과업을적으세요_wide.xlsx`
          : `speedetail_${getCurrentMonday()}_이번주의핵심과업을적으세요_narrow.xlsx`

      // 파일 저장
      const data = await workbook.xlsx.writeBuffer()
      return { data, downloadFileName }
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error)
      throw error
    }
  }

  export const downloadExcelFile = async (
    excelType: 'wide' | 'narrow' = 'wide',
  ) => {
    const { data, downloadFileName } = await downloadExcelFileBuffer(excelType)
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(blob, downloadFileName)
  }

  const modifyWeeklySheet = (sheet: Worksheet, excelType: string) => {
    const currentYear = new Date().getFullYear()
    sheet.getCell('C2').value = getCurrentWeekRange()
    for (let day = 0; day < 7; day++) {
      const date = getDate(
        addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), day),
      )
      const column = String.fromCharCode(65 + 3 + day)
      sheet.getCell(`${column}2`).value = date
    }
    sheet.getCell(excelType === 'wide' ? 'L60' : 'L82').value =
      `${currentYear}년 균형성장 목표`

    // bugfix : 조건부서식 관련 오류 수정(재정의 필요)
    const rules: ConditionalFormattingRule[] = [
      {
        priority: 1,
        type: 'containsText',
        operator: 'containsText',
        text: '1',
        style: { numFmt: '○', font: { color: { argb: '00B050' } } },
      },
      {
        priority: 2,
        type: 'containsText',
        operator: 'containsText',
        text: '2',
        style: { numFmt: '○', font: { color: { argb: 'FF0000' } } },
      },
      {
        priority: 3,
        type: 'containsText',
        operator: 'containsText',
        text: '3',
        style: { numFmt: '○', font: { color: { argb: '00B0F0' } } },
      },
    ]

    sheet.removeConditionalFormatting({})
    sheet.addConditionalFormatting({
      ref: excelType === 'wide' ? 'D4:K10' : 'D4:K11',
      rules: rules,
    })
    sheet.addConditionalFormatting({
      ref: excelType === 'wide' ? 'D12:K64' : 'D13:K88',
      rules: rules,
    })
  }

  const modifyMonthlySheet = (sheet: Worksheet) => {
    const currentMonth = new Date()
    const nextMonth = addMonths(currentMonth, 1)

    const months = [currentMonth, nextMonth].map((month) => ({
      year: format(month, 'yyyy'),
      month: format(month, 'M'),
      lastDay: lastDayOfMonth(month).getDate(),
    }))

    let row = 1
    months.forEach((month, index) => {
      sheet.getCell(`L${row}`).value = month.month
      sheet.getCell(`J${row}`).value = month.year

      row += 5

      const firstRow = row
      const firstDay = getDay(
        new Date(Number(month.year), Number(month.month) - 1, 1),
      )
      for (let day = 1; day <= month.lastDay; day++) {
        const dayIndex = (firstDay + day - 1) % 7
        const rowIndex = Math.floor((firstDay + day - 1) / 7)
        const column = String.fromCharCode(65 + dayIndex * 2)
        if (rowIndex > 4) {
          if (index !== 1) {
            sheet.getCell(`${column}${row + 3 + 5}`).value = day
          }
        } else {
          row = firstRow + 2 * rowIndex
          sheet.getCell(`${column}${row}`).value = day
        }
      }
      row += 3
    })
  }

  const clearRow = (sheet: Worksheet, startRow: number, length: number) => {
    for (let row = startRow; row <= startRow + length; row++) {
      sheet.getRow(row)?.eachCell((cell: Cell) => {
        cell.value = ''
      })
    }
  }

  const modifyYearlySheet = (sheet: Worksheet) => {
    const currentYear = new Date().getFullYear()
    const months = Array.from({ length: 12 }, (_, index) => {
      const month = new Date(currentYear, index)
      return {
        year: format(month, 'yyyy'),
        month: format(month, 'M'),
        lastDay: lastDayOfMonth(month).getDate(),
      }
    })

    let row = 1
    months.forEach((month, index) => {
      sheet.getCell(`L${row}`).value = month.month
      sheet.getCell(`J${row}`).value = month.year

      row += 5
      clearRow(sheet, row, 10)

      const firstRow = row
      const firstDay = getDay(new Date(Number(month.year), index, 1))

      for (let day = 1; day <= month.lastDay; day++) {
        const dayIndex = (firstDay + day - 1) % 7
        const rowIndex = Math.floor((firstDay + day - 1) / 7)
        const column = String.fromCharCode(65 + dayIndex * 2)
        if (rowIndex > 4) {
          if (month.month !== '12') {
            sheet.getCell(`${column}${row + 3 + 5}`).value = day
          }
        } else {
          row = firstRow + 2 * rowIndex
          sheet.getCell(`${column}${row}`).value = day
        }
      }

      row += 3
    })

    // 현재 달까지는 내년도 달까지 보여지도록 추가
    const nextYear = currentYear + 1
    const currentMonth = getMonth(addMonths(new Date(), 1)) + 1
    const nextYearMonths = Array.from({ length: currentMonth }, (_, index) => {
      const month = new Date(nextYear, index)
      return {
        year: format(month, 'yyyy'),
        month: format(month, 'M'),
        lastDay: lastDayOfMonth(month).getDate(),
      }
    })

    row = 1
    nextYearMonths.forEach((month, index) => {
      sheet.getCell(`L${row}`).value = month.month
      sheet.getCell(`J${row}`).value = month.year

      row += 5
      clearRow(sheet, row, 10)

      const firstRow = row
      const firstDay = getDay(new Date(Number(month.year), index, 1))
      for (let day = 1; day <= month.lastDay; day++) {
        const dayIndex = (firstDay + day - 1) % 7
        const rowIndex = Math.floor((firstDay + day - 1) / 7)
        const column = String.fromCharCode(65 + dayIndex * 2)
        if (rowIndex > 4) {
          if (month.month !== '12') {
            sheet.getCell(`${column}${row + 3 + 5}`).value = day
          }
        } else {
          row = firstRow + 2 * rowIndex
          sheet.getCell(`${column}${row}`).value = day
        }
      }

      row += 3
    })
  }
}
