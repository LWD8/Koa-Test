const Koa = require('koa');
const Router = require('koa-router');
const Busboy = require('busboy');
const app = new Koa();

let home = new Router();
home.get('/', (ctx) => {
  let html = `
  <form class="form form-signin" action="/videoUpload" method="post" enctype="multipart/form-data">  
         
    <div class="video">  
        <span>添加视频</span>  
        <input type="file" name="videoUpload"  id="cVideo"  accept="video/*" />  
        <p class="vBackg"></p>  
    </div>  

    <input type="submit" value="上传课程视频" class="btn btn-primary btn-block submit" />  
  </form>
  `
  ctx.body = html
})

let router = new Router();

router.post('/videoUpload', function(req, res) {  
  // req.pipe(req.busboy);  
   var fileNum = 3,  
       fileCount = 0,  
       filePath = path.join(path.normalize(__dirname + './'), 'public', 'upload');  
   var busboy = new Busboy({ headers: req.headers });  
   busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {  
       console.log('File [' + fieldname + ']: filename: ' + filename);  
       file.on('data', function(data) {  
           console.log('File [' + fieldname + '] got ' + data.length + ' bytes');  
       });  
       file.on('end', function() {  
           var fstream;  
           if(filename !== ""){  
               fstream = fs.createWriteStream(filePath+'/'+filename.trim());  
               file.pipe(fstream);  
           }  
           console.log('File [' + fieldname + '] Finished');  
       });  
       });  
   busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {  
       console.log('Field [' + fieldname + ']: value: ' + inspect(val));  
   });  
   busboy.on('finish', function() {  
       console.log('Done parsing form!');  
       res.writeHead(303, { Connection: 'close', Location: '/' });  
       res.end();  
   });  
   req.pipe(busboy);  
});
router.use('/', home.routes(), home.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)