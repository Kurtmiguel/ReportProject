import { NextApiRequest, NextApiResponse } from 'next';

interface Report {
  id: string;
  title: string;
  date: string;
  status: string;
  remarks: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const submittedReports: Report[] = [
      { id: '1', title: 'Submitted Report 1', date: '2024-01-01', status: 'Submitted', remarks: 'No remarks' },
    ];
    const approvedReports: Report[] = [
      { id: '1', title: 'Approved Report 1', date: '2024-01-02', status: 'Approved', remarks: 'Approved by admin' },
    ];

    res.status(200).json({ submitted: submittedReports, approved: approvedReports });
  } else {
    res.status(405).end();
  }
};

export default handler;
