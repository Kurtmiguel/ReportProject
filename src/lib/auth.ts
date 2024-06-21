import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

export const authenticate = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authentication?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication token required' });
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET!);
            req.user = decoded;
            return handler (req, res);
        }   catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token'});
        }
    };
};
