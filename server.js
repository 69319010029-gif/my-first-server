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

            @keyframes float{
                0%,100%{transform:translateY(0px);}
                50%{transform:translateY(-15px);}
            }

            @keyframes glowPulse{
                0%,100%{box-shadow:0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.3);}
                50%{box-shadow:0 0 35px #00d4ff, 0 0 70px rgba(0,212,255,0.5);}
            }

            @keyframes bgPan{
                0%{background-position:0% 50%;}
                50%{background-position:100% 50%;}
                100%{background-position:0% 50%;}
            }

            @keyframes fadeInUp{
                from{opacity:0; transform:translateY(20px);}
                to{opacity:1; transform:translateY(0);}
            }

            body{
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:
                    linear-gradient(120deg, rgba(0,10,25,0.85), rgba(0,0,0,0.75)),
                    url('https://images.alphacoders.com/119/1199369.jpg');
                background-size:cover;
                background-position:center;
                color:white;
                overflow:hidden;
            }

            .card{
                position:relative;
                text-align:center;
                background:rgba(255,255,255,0.06);
                backdrop-filter:blur(18px);
                -webkit-backdrop-filter:blur(18px);
                padding:50px 40px;
                border-radius:28px;
                border:1px solid rgba(0,212,255,0.25);
                box-shadow:0 8px 40px rgba(0,0,0,0.6);
                width:440px;
                animation:fadeInUp 0.9s ease-out;
                overflow:hidden;
            }

            .card::before{
                content:'';
                position:absolute;
                top:-50%;
                left:-50%;
                width:200%;
                height:200%;
                background:conic-gradient(from 0deg, transparent, rgba(0,212,255,0.15), transparent 30%);
                animation:spin 6s linear infinite;
                z-index:0;
            }

            @keyframes spin{
                to{transform:rotate(360deg);}
            }

            .card > *{
                position:relative;
                z-index:1;
            }

            .profile{
                width:150px;
                height:150px;
                border-radius:50%;
                border:4px solid #00d4ff;
                object-fit:cover;
                margin-bottom:22px;
                animation:float 4s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
            }

            h1{
                background:linear-gradient(90deg, #00d4ff, #00ff88, #00d4ff);
                background-size:200% auto;
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
                background-clip:text;
                animation:bgPan 4s linear infinite;
                margin-bottom:14px;
                font-size:26px;
                font-weight:800;
                letter-spacing:1px;
            }

            .name{
                font-size:20px;
                font-weight:600;
                letter-spacing:0.5px;
                margin:6px 0;
            }

            .id{
                font-size:15px;
                color:#b0e8ff;
                margin-bottom:10px;
                letter-spacing:1px;
            }

            .divider{
                width:60px;
                height:3px;
                background:linear-gradient(90deg,#00d4ff,#00ff88);
                margin:16px auto;
                border-radius:10px;
            }

            .status{
                display:inline-flex;
                align-items:center;
                gap:8px;
                color:#00ff88;
                font-weight:700;
                background:rgba(0,255,136,0.08);
                border:1px solid rgba(0,255,136,0.35);
                padding:8px 18px;
                border-radius:50px;
                margin-top:10px;
                font-size:14px;
            }

            .dot{
                width:8px;
                height:8px;
                border-radius:50%;
                background:#00ff88;
                box-shadow:0 0 10px #00ff88;
                animation:blink 1.4s ease-in-out infinite;
            }

            @keyframes blink{
                0%,100%{opacity:1;}
                50%{opacity:0.3;}
            }

            .footer{
                margin-top:18px;
                font-size:13px;
                color:rgba(255,255,255,0.5);
                letter-spacing:0.5px;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <img src="https://i.pinimg.com/736x/66/6a/5c/666a5c45bab6eacf60cbf741fd285199.jpg" alt="Profile" class="profile">
            <h1>🚀 RAILWAY SERVER</h1>
            <p class="name">นายศุภวิชญ์ รุ่งกิจพัฒน์</p>
            <p class="id">รหัสนักศึกษา 69319010029</p>
            <div class="divider"></div>
            <div class="status"><span class="dot"></span> เครื่องแม่ข่ายทำงานปกติแล้ว</div>
            <p class="footer">Node.js HTTP Server · Powered by Railway</p>
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
