const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    res.end(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Railway Server</title>

        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            body{
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:url('https://images.alphacoders.com/122/1226390.jpg')
                no-repeat center center/cover;
            }

            .overlay{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.55);
            }

            .card{
                position:relative;
                z-index:1;
                background:rgba(255,255,255,0.12);
                backdrop-filter:blur(12px);
                padding:40px;
                border-radius:25px;
                text-align:center;
                color:white;
                width:420px;
                box-shadow:0 8px 30px rgba(0,0,0,0.4);
            }

            .profile{
                width:150px;
                height:150px;
                border-radius:50%;
                object-fit:cover;
                border:4px solid #fff;
                margin-bottom:20px;
                box-shadow:0 0 20px rgba(255,255,255,0.5);
            }

            h1{
                margin-bottom:10px;
                font-size:28px;
            }

            p{
                font-size:18px;
                margin:10px 0;
            }

            .status{
                color:#00ff88;
                font-weight:bold;
            }
        </style>
    </head>

    <body>

        <div class="overlay"></div>

        <div class="card">

            <img
                class="profile"
                src="https://pbs.twimg.com/media/FV9uZg3XEAALc6A.jpg"
                alt="Profile"
            >

            <h1>นายศุภวิชญ์ รุ่งกิจพัฒน์</h1>

            <p>รหัสนักศึกษา : 69319010029</p>

            <p class="status">
                🚀 Railway Web Server Online
            </p>

            <p>
                เครื่องแม่ข่ายทำงานปกติแล้วครับ
            </p>

            <p>
                Node.js + Railway + HTML + CSS
            </p>

        </div>

    </body>
    </html>
    `);
});

server.listen(port, () => {
    console.log(
        \`🚀 Server is running! เครื่องแม่ข่ายทำงานแล้วที่ช่องทาง: \${port}\`
    );
});
