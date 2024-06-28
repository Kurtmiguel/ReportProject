import type { NextApiRequest, NextApiResponse } from "next";
import { query } from '@/lib/db';

type ReportData = {
  title: string;
  coordinatorName: string;
  data: string;
  status: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const report: ReportData = req.body;

      await query(
        'INSERT INTO reports (title, coordinatorName, date, status) VALUES (?, ?, ?, ?)',
        [report.title, report.coordinatorName, report.coordinatorName, report.status]
      );
      res.status(200).json({message: 'Report submitted successfully'});
    } else if (req.method === 'GET') {
      const results = await query ('SELECT * FROM reports');

      res.status(200).json(results);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end('Method ${req.method} Not Allowed');
    }
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
}