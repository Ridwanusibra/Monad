import axios from 'axios'

const BEARER = process.env.TWITTER_BEARER_TOKEN || ''

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { handle } = req.body || {}
  if (!handle) return res.status(400).json({ error: 'Missing handle' })

  if (!BEARER) {
    return res.status(200).json({
      count: Math.floor(Math.random() * 50),
      sample: ['Mock Gmonad tweet 1', 'Mock Gmonad tweet 2']
    })
  }

  try {
    const query = `from:${handle} Gmonad -is:retweet`
    const url = 'https://api.twitter.com/2/tweets/search/recent'
    const headers = { Authorization: `Bearer ${BEARER}` }
    const response = await axios.get(url, { headers, params: { query, max_results: 100 } })
    const count = response.data.meta.result_count || 0
    res.status(200).json({ count })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}