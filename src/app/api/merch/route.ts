import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source, tag } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('Merch waitlist submission:', { email, source, tag, timestamp: new Date().toISOString() })

    const GOOGLE_SHEETS_MERCH_URL = process.env.GOOGLE_SHEETS_MERCH_WEBHOOK_URL

    if (GOOGLE_SHEETS_MERCH_URL) {
      try {
        const response = await fetch(GOOGLE_SHEETS_MERCH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            timestamp: new Date().toISOString(),
            source: source || 'merch-section',
            tag: tag || 'merch_waitlist',
          }),
        })

        const respText = await response.text()
        let respJson = null
        try {
          respJson = JSON.parse(respText)
        } catch (e) {
          // ignore json parse error
        }

        if (!response.ok) {
          console.error('Google Sheets merch webhook failed:', response.status, response.statusText, respText)
        } else {
          console.log('Google Sheets merch webhook response:', respJson ?? respText)
          console.log('Successfully added merch entry to Google Sheets')
        }
      } catch (sheetError) {
        console.error('Google Sheets merch integration error:', sheetError)
        // don't fail the request if Google Sheets errors
      }
    } else {
      console.log('GOOGLE_SHEETS_MERCH_WEBHOOK_URL not configured')
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed to merch waitlist' })
  } catch (error) {
    console.error('Merch subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe to merch waitlist' },
      { status: 500 }
    )
  }
}
