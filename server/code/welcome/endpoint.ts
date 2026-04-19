import { Express, Request, Response } from 'express'

export function addWelcomeEndpoint (app: Express) {
  app.get('/', (_: Request, res: Response) => {
    res.send(`
      <html>
        <head>
          <title>Smallgame Tutorial Server</title>
          <style>
          html, body {
            padding: 0;
            margin: 0;
            background-color: #282828;
            color: #aaa;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
          }
          h2 {
            font-size: 72px;
            font-weight: 600;
          }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🚀 Server is running</h2>
          </div>
        </body>
      </html>
    `)
  })
}