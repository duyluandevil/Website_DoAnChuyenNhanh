const express = require('express')
const path = require('path')

const app=express() 
const http = require('http')
const server = http.createServer(app)
const{Server} = require('socket.io')

app.use(express.static(path.join(__dirname, 'public')))

const io = new Server(server)

//Kết nối mysql

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'unitygamechien'
})

//Kết nối mysql
connection.connect(function(err){
    if(err) throw err;

    console.log("Đã kết nối với DTB");
})

let accountLoginSuccess
//User kết nối với Socket
// io.on('connection', function(socket){
//     console.log("Có người dùng vừa kết nối");

//     //Nhận dữ liệu chat từ User
//     socket.on('sendMessage', function(msg){
//         // console.log(msg)
//         //Gửi lại các user có trong Socket
//         socket.broadcast.emit('user-chat', msg)
//     })

//     //Nhận dữ liệu đăng ký
//     socket.on('sendDataRegister', function(Data){
//         console.log("User gửi thông tin từ trang ĐĂNG KÝ ")
//         console.log(Data);

//         var sqlSelect = "SELECT * FROM `player` WHERE tai_khoan = '" + Data.tenDangNhap  + "' OR email = '"+ Data.email +"'"

//         let rsRegiter= {
//             success: 1,
//             fail: 2
//         }

//         connection.query(sqlSelect, function(err, result){
//             if(result.length == 0){
//                 var sqlInsert = "INSERT INTO `player`(`tai_khoan`, `mat_khau`, `email`, `level`, `tien`, `so_tran_thang`, `so_tran_thua`, `so_nguoi_giet`) VALUES ('"+ Data.tenDangNhap + "', '"+ Data.matKhau + "','"+ Data.email +"',1,0,0,0,0)"

//                 connection.query(sqlInsert, function (err){
//                     if(err) throw err
//                     console.log("Đã đăng ký thành công")

//                     //gửi thông tin đăng ký thành công về user
//                     // io.emit('send-register-success', {rs: true})
//                     io.emit('send-register-success', rsRegiter.success)
//                     //gửi thông tin về
//                     console.log("đã gửi thông tin đăng ký thành công")
//                 })
//             }else{
//                 console.log("Đã có tài khoản này")
//                 io.emit('send-register-success', rsRegiter.fail)
//                     //gửi thông tin về
//                     console.log("đã gửi thông tin đăng ký lỗi")
//             }
//         })

//         //Ghi dữ liệu vào mysql
        
//     })


    
//     //Nhận dữ liệu đăng nhập
//     socket.on('sendDataLogin', function(Data){
//         console.log("User gửi thông tin từ trang ĐĂNG NHẬP ")
//         console.log(Data);

//         var sqlSelect = "SELECT * FROM `player` WHERE email = '" + Data.tenDangNhap  + "' AND mat_khau = '"+ Data.matKhau +"'"

//         let rsRegiter= {
//             success: 1,
//             fail: 2
//         }

//         connection.query(sqlSelect, function(err, result){
//             if(err) throw err
//             if(result.length == 1){
//                     console.log("Đã đăng nhập thành công")
//                     //gửi thông tin đăng nhập thành công về user
//                     // io.emit('send-register-success', {rs: true})
//                     io.emit('send-login-success', rsRegiter.success)
//                     //gửi thông tin về
//                     console.log("đã gửi thông tin đăng nhập thành công")
//                     accountLoginSuccess = Data.tenDangNhap
//             }else{
//                 console.log("Không có tài khoản, ĐĂNG NHẬP thất bại")
//                 io.emit('send-login-success', rsRegiter.fail)
//                     //gửi thông tin về
//                     console.log("đã gửi thông tin đăng nhập lỗi")
//             }
//         })
//     })

//     //Gửi dữ liệu đăng nhập sang trang cá nhân sau khi thành công
//     socket.on('receiveDataAccount', function(data){
//         console.log(data)
//         if(data){
//             console.log(accountLoginSuccess)

//             //Truy xuất dữ liệu từ database
//             var sqlSelect = "SELECT * FROM `player` WHERE email = '"+accountLoginSuccess+"'"

//             connection.query(sqlSelect, function(err, result){
//                 if(err) throw err;

//                 //Thông tin của account vừa đăng nhập thành công
                
//                 // result=JSON.parse(JSON.stringify(result))
//                 console.log(result)

//                 // let infoAccount = {
//                 //     tendangnhap = result.Tai_Khoan
//                 // }

//                 socket.emit('sendDataAcountLoginSuccess', result[0])
//             })
//         }
//     })

//     //Gửi thông tin tài khoản sang trang chat sau khi đăng nhập
//     socket.on('receiveDataAccountChat', function(data){
//         console.log(data)
//         if(data){
//             console.log(accountLoginSuccess)

//             //Truy xuất dữ liệu từ database
//             var sqlSelect = "SELECT * FROM `player` WHERE email = '"+accountLoginSuccess+"'"

//             connection.query(sqlSelect, function(err, result){
//                 if(err) throw err;

//                 //Thông tin của account vừa đăng nhập thành công
                
//                 // result=JSON.parse(JSON.stringify(result))
//                 console.log(result)

//                 // let infoAccount = {
//                 //     tendangnhap = result.Tai_Khoan
//                 // }

//                 socket.emit('sendDataAcountLoginChatSuccess', result[0])
//             })
//         }
//     })
        
// })

//Mở port 5000
const PORT = process.env.PORT || 5000

//Chạy server trên port
server.listen(PORT, function() {
    console.log("server đang chạy trên post 5000...")
})

