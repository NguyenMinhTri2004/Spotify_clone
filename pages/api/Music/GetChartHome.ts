import type { NextApiRequest, NextApiResponse } from 'next'
const { ZingMp3  } = require("zingmp3-api-full")


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    ZingMp3.getChartHome().then((Data : any) => {
        return res.status(200).json(Data)
    })
}