// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

let fs      = require('fs'),
    path    = require('path'),
    async   = require('async');

// --- Config Express
// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser'),
    busboy     = require('connect-busboy'),
    helmet = require('helmet');

// -- Recommandation secu d'expressJs
app.use(helmet());
app.disabled('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(busboy());

// ------------------------
// LIST ROUTE ou EndPoint
// ------------------------
// -- Listes des salades
app.get('/salads', function (req, res) {
    res.status(400).json({message : "todo"})
});

// -- Consulter une salade
app.get('/salads/:id', function (req, res) {
    res.status(400).json({message : "todo"})
});
// -- Upload Salade
app.post('/salads', function (req, res) {
    // ---
    console.info("Upload a file");
    res.status(400).json({message : "todo to upload"})

    // --- Catch dans busboy le stream de mes images
    req.pipe(req.busboy);

    try{
        req.busboy.on('file', function (fieldname, file, filename) {

            console.info("Uploading: " + filename);

            // --- Create a path to the image
            let fstream = fs.createWriteStream(path.join(__dirname, filename.replace(' ', '-')));

            file.pipe(fstream);

            fstream.on('close', function (error) {
                if(error){
                    res.status(400).json(error);
                }else{
                    // --- Update the object to get the link
                    res.status(204).json({});
                }
            });
        });
    }catch(error){
        res.status(400).json(error);
    }
});

// ------------------------
// START SERVER
// ------------------------

// -- Gestion 404
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3000,function(){
    console.info('HTTP server started on port 3000');
});
