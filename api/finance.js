import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://api.hgbrasil.com/finance')

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (err) {
    console.error('Proxy error:', err.message)
    res.status(500).json({ error: 'Proxy error', details: err.message })
  }
}
