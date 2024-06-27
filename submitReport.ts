import type { NextApiRequest, NextApiResponse } from "next";

type ReportData = {
    title: string;
    coordinatorName: string;
    date: string;
    status: string;
}

let submittedReports: ReportData[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const report: ReportData = req.body
    submittedReports.push(report)
    res.status(200).json({ message: 'Report submitted successfully' })
  } else if (req.method === 'GET') {
    res.status(200).json(submittedReports)
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}