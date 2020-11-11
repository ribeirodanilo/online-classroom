import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: boolean;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
  // POST Method
  if (req.method === 'POST') {
    // parse request
    const { name, email, cellphone, teacher } = req.body;

    // validate request
    if (!name || !email || !cellphone) {
      res.status(400).json({ error: 'Missing body parameter' });
      return;
    }

    // insert value on db
    const { db } = await connect();
    const response = await db.collection('users').insertOne({
      name,
      email,
      cellphone,
      teacher,
    });
    res.status(200).json(response.ops[0]);
  } else {
    res
      .status(400)
      .json({ message: 'Method not implemented! [' + req.method + ']' });
  }
};
