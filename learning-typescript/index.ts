const express = require('express')
const app = express()

app.get('/', (_req: any, res: any) => {
  res.send('Go to the <a href="/hello">hello</a> endpoint')
})
app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
