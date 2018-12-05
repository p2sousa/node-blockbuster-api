import express from 'express'

const app = express()

app.set('port', 9000);

app.route('/movies')
  .get((req, res) => {
    res.json([
      {
        id: 1,
        name: 'Default Movie'
      }
    ])
  })

export default app