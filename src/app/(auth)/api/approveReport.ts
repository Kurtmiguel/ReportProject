import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { reportId, remarks }: { reportId: string; remarks: string } = req.body;
    
    // Here, you can handle the approval logic for the report with reportId and remarks
    
    res.status(200).json({ message: 'Report approved successfully' });
  } else {
    res.status(405).end();
  }
};

export default handler;
