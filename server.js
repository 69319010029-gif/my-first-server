const http = require('http');
const { Pool } = require('pg');

// ตั้งค่าการเชื่อมต่อ PostgreSQL จาก Environment Variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const port = process.env.PORT || 3000;

// ฟังก์ชันสำหรับเทสการเชื่อมต่อ Database
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ เชื่อมต่อ PostgreSQL สำเร็จ');
        client.release();
        return true;
    } catch (err) {
        console.error('❌ ล้มเหลวในการเชื่อมต่อ PostgreSQL:', err.message);
        return false;
    }
}

// ฟังก์ชันดึงข้อมูลนักศึกษา
async function getStudents() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM students ORDER BY student_id');
        client.release();
        return result.rows;
    } catch (err) {
        console.error('❌ ข้อผิดพลาดในการดึงข้อมูล:', err.message);
        throw err;
    }
}

// ฟังก์ชันสร้างหน้า HTML
function generateHTML(students) {
    return `
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Railway Server - ฐานข้อมูลนักศึกษา</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', 'Sarabun', sans-serif;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
            }

            @keyframes glowPulse {
                0%, 100% { box-shadow: 0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.3); }
                50% { box-shadow: 0 0 35px #00d4ff, 0 0 70px rgba(0,212,255,0.5); }
            }

            @keyframes bgPan {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }

            body {
                background: linear-gradient(120deg, rgba(0,10,25,0.85), rgba(0,0,0,0.75)),
                            url('https://images.alphacoders.com/119/1199369.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                color: white;
                min-height: 100vh;
                padding: 20px;
            }

            .container {
                max-width: 900px;
                margin: 0 auto;
            }

            .header-card {
                position: relative;
                text-align: center;
                background: rgba(255,255,255,0.06);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                padding: 50px 40px;
                border-radius: 28px;
                border: 1px solid rgba(0,212,255,0.25);
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                margin-bottom: 30px;
                animation: fadeInUp 0.9s ease-out;
                overflow: hidden;
            }

            .header-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(from 0deg, transparent, rgba(0,212,255,0.15), transparent 30%);
                animation: spin 6s linear infinite;
                z-index: 0;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .header-card > * {
                position: relative;
                z-index: 1;
            }

            .profile {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 4px solid #00d4ff;
                object-fit: cover;
                margin-bottom: 22px;
                animation: float 4s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
            }

            h1 {
                background: linear-gradient(90deg, #00d4ff, #00ff88, #00d4ff);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: bgPan 4s linear infinite;
                margin-bottom: 14px;
                font-size: 26px;
                font-weight: 800;
                letter-spacing: 1px;
            }

            .name {
                font-size: 20px;
                font-weight: 600;
                letter-spacing: 0.5px;
                margin: 6px 0;
            }

            .id {
                font-size: 15px;
                color: #b0e8ff;
                margin-bottom: 10px;
                letter-spacing: 1px;
            }

            .divider {
                width: 60px;
                height: 3px;
                background: linear-gradient(90deg, #00d4ff, #00ff88);
                margin: 16px auto;
                border-radius: 10px;
            }

            .status {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: #00ff88;
                font-weight: 700;
                background: rgba(0,255,136,0.08);
                border: 1px solid rgba(0,255,136,0.35);
                padding: 8px 18px;
                border-radius: 50px;
                margin-top: 10px;
                font-size: 14px;
            }

            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #00ff88;
                box-shadow: 0 0 10px #00ff88;
                animation: blink 1.4s ease-in-out infinite;
            }

            .footer {
                margin-top: 18px;
                font-size: 13px;
                color: rgba(255,255,255,0.5);
                letter-spacing: 0.5px;
            }

            .data-card {
                background: rgba(255,255,255,0.06);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                padding: 30px;
                border-radius: 20px;
                border: 1px solid rgba(0,212,255,0.25);
                box-shadow: 0 8px 40px rgba(0,0,0,0.6);
                animation: fadeInUp 1s ease-out 0.2s both;
            }

            .data-card h2 {
                color: #00d4ff;
                margin-bottom: 20px;
                font-size: 22px;
                border-bottom: 2px solid rgba(0,212,255,0.5);
                padding-bottom: 10px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }

            table thead {
                background: rgba(0,212,255,0.15);
                border-bottom: 2px solid rgba(0,212,255,0.5);
            }

            table th {
                padding: 12px;
                text-align: left;
                color: #00d4ff;
                font-weight: 700;
                letter-spacing: 0.5px;
            }

            table td {
                padding: 12px;
                border-bottom: 1px solid rgba(0,212,255,0.2);
                color: rgba(255,255,255,0.9);
            }

            table tbody tr:hover {
                background: rgba(0,212,255,0.1);
                transition: background 0.3s ease;
            }

            .error-message {
                background: rgba(255,76,76,0.15);
                border: 1px solid rgba(255,76,76,0.5);
                color: #ff6b6b;
                padding: 15px;
                border-radius: 10px;
                margin-top: 15px;
            }

            .success-message {
                color: #00ff88;
                font-weight: 600;
                margin: 10px 0;
            }

            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }

            .stat-box {
                background: rgba(0,212,255,0.1);
                border: 1px solid rgba(0,212,255,0.3);
                padding: 15px;
                border-radius: 10px;
                text-align: center;
            }

            .stat-number {
                font-size: 28px;
                font-weight: 800;
                color: #00ff88;
            }

            .stat-label {
                font-size: 12px;
                color: rgba(255,255,255,0.6);
                margin-top: 5px;
            }

            .empty-message {
                text-align: center;
                color: rgba(255,255,255,0.6);
                padding: 30px;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header Card -->
            <div class="header-card">
                <img src="https://i.pinimg.com/736x/66/6a/5c/666a5c45bab6eacf60cbf741fd285199.jpg" alt="Profile" class="profile">
                <h1>🚀 RAILWAY SERVER</h1>
                <p class="name">นายศุภวิชญ์ รุ่งกิจพัฒน์</p>
                <p class="id">รหัสนักศึกษา 69319010029</p>
                <div class="divider"></div>
                <div class="status"><span class="dot"></span> เครื่องแม่ข่ายทำงานปกติแล้ว</div>
                <p class="footer">Node.js HTTP Server · PostgreSQL Database · Powered by Railway</p>
            </div>

            <!-- Data Card -->
            <div class="data-card">
                <h2>📊 ฐานข้อมูลนักศึกษา</h2>
                
                ${students.length > 0 ? `
                    <div class="stats">
                        <div class="stat-box">
                            <div class="stat-number">${students.length}</div>
                            <div class="stat-label">จำนวนนักศึกษา</div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>รหัสนักศึกษา</th>
                                <th>ชื่อ-นามสกุล</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${students.map((row, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${row.student_id || '-'}</td>
                                    <td>${row.student_name || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p class="success-message">✅ เชื่อมต่อฐานข้อมูลสำเร็จ</p>
                ` : `
                    <div class="empty-message">
                        <p>📭 ไม่พบข้อมูลนักศึกษา</p>
                        <p style="font-size: 14px; margin-top: 10px;">กรุณาเพิ่มข้อมูลในตาราง students</p>
                    </div>
                `}
            </div>
        </div>
    </body>
    </html>
    `;
}

// สร้าง HTTP Server
const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {
        // ดึงข้อมูลนักศึกษาจากฐานข้อมูล
        const students = await getStudents();
        const html = generateHTML(students);
        res.statusCode = 200;
        res.end(html);
    } catch (err) {
        // จัดการข้อผิดพลาด
        console.error('❌ ข้อผิดพลาด:', err.message);
        res.statusCode = 500;
        res.end(`
            <!DOCTYPE html>
            <html lang="th">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ข้อผิดพลาด</title>
                <style>
                    body {
                        background: linear-gradient(120deg, rgba(0,10,25,0.85), rgba(0,0,0,0.75));
                        color: white;
                        font-family: 'Segoe UI', 'Sarabun', sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        padding: 20px;
                    }
                    .error-container {
                        background: rgba(255,76,76,0.15);
                        border: 2px solid rgba(255,76,76,0.5);
                        padding: 40px;
                        border-radius: 20px;
                        max-width: 500px;
                        text-align: center;
                    }
                    h1 {
                        color: #ff6b6b;
                        margin-bottom: 20px;
                        font-size: 28px;
                    }
                    p {
                        color: rgba(255,255,255,0.8);
                        line-height: 1.6;
                        margin: 10px 0;
                    }
                    .error-message {
                        background: rgba(0,0,0,0.3);
                        padding: 15px;
                        border-radius: 10px;
                        margin-top: 20px;
                        font-family: 'Courier New', monospace;
                        color: #ffb3b3;
                        font-size: 14px;
                        text-align: left;
                        word-break: break-all;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>⚠️ เกิดข้อผิดพลาด</h1>
                    <p>ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้</p>
                    <p style="font-size: 14px; color: rgba(255,255,255,0.6);">กรุณาตรวจสอบ:</p>
                    <ul style="text-align: left; display: inline-block; color: rgba(255,255,255,0.7);">
                        <li>การเชื่อมต่อ DATABASE_URL</li>
                        <li>ตารางชื่อ "students" มีอยู่</li>
                        <li>สิทธิ์การเข้าถึงฐานข้อมูล</li>
                    </ul>
                    <div class="error-message">
                        <strong>ข้อความข้อผิดพลาด:</strong><br>
                        ${err.message}
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

// เริ่มต้น Server
server.listen(port, async () => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🚀 Railway Server ทำงานแล้ว!');
    console.log(`📍 ที่อยู่: http://localhost:${port}`);
    console.log('═══════════════════════════════════════════════════════');
    
    // เทสการเชื่อมต่อฐานข้อมูล
    const isConnected = await testConnection();
    
    if (isConnected) {
        console.log('✅ ฐานข้อมูลพร้อมใช้งาน');
    } else {
        console.log('⚠️  ฐานข้อมูลยังไม่เชื่อมต่อ - ตรวจสอบ DATABASE_URL');
    }
    console.log('═══════════════════════════════════════════════════════');
});

// จัดการการปิดเซิร์ฟเวอร์
process.on('SIGTERM', () => {
    console.log('🛑 กำลังปิดเซิร์ฟเวอร์...');
    pool.end();
    server.close();
});
