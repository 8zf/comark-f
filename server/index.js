const serve = require('koa-static');
const koa = require('koa');
const cors = require('koa-cors');

const app = new koa();
// const upload = multer({ dest: 'uploads/' });
app.use(cors());
// app.use(function *(next){
//   try {
//     yield next;
//   } catch (err) {
//     if (401 == err.status) {
//       this.status = 401;
//       this.set('WWW-Authenticate', 'Basic');
//       this.body = 'cant haz that';
//     } else {
//       throw err;
//     }
//   }
// });
// app.use(auth({ name: 'zhang', pass: 'zhzhang' }));

app.use(serve('./'));

app.listen(8080);

console.log('服务器监听端口：8080');