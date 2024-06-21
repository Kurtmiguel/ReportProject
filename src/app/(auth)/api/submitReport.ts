// pages/api/submitReport.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { DashboardForm } from '@/lib/zod-schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const submitReport = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const reportData: DashboardForm = req.body;

      // Here you can handle the data, such as saving it to a database
      // For example, using a database client
      // await databaseClient.save(reportData);

      return res.status(200).json({ message: 'Report submitted successfully' });
    } catch (error) {
      console.error('Error submitting report:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default submitReport;
