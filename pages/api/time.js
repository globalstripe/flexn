

export default function handler(req, res) {
  const now = new Date()  
  const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)  
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000)  
    res.status(200).json({ seconds:  utcSecondsSinceEpoch, milliseconds: utcMilllisecondsSinceEpoch})
  }