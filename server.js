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
        <title>My Railway Server</title>
        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:'Segoe UI',sans-serif;
            }

            body{
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:
                    linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
                    url('background.jpg');
                background-size:cover;
                background-position:center;
                color:white;
            }

            .card{
                text-align:center;
                background:rgba(255,255,255,0.1);
                backdrop-filter:blur(10px);
                padding:40px;
                border-radius:25px;
                box-shadow:0 0 30px rgba(0,0,0,0.5);
                width:420px;
            }

            .profile{
                width:150px;
                height:150px;
                border-radius:50%;
                border:4px solid #00d4ff;
                object-fit:cover;
                margin-bottom:20px;
                box-shadow:0 0 20px #00d4ff;
            }

            h1{
                color:#00d4ff;
                margin-bottom:10px;
            }

            p{
                margin:8px 0;
                font-size:18px;
            }

            .status{
                color:#00ff88;
                font-weight:bold;
                margin-top:15px;
            }
        </style>
    </head>
    <body>

        <div class="card">
            <img src="profile.jpg" alt="Profile" class="profile">

            <h1>🚀 Railway Web Server</h1>

            <p><strong>นายศุภวิชญ์ รุ่งกิจพัฒน์</strong></p>
            <p>รหัสนักศึกษา 69319010029</p>

            <p class="status">
                ✅ เครื่องแม่ข่ายทำงานปกติบน Railway แล้ว!
            </p>

            <p>Node.js HTTP Server</p>
        </div>

    </body>
    </html>
    `);
});

server.listen(port, () => {
    console.log(
        `🚀 Server is running! เครื่องแม่ข่ายเปิดทำงานแล้วที่ Port: ${port}`
    );
});
