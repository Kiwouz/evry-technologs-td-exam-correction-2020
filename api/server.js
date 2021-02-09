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

// Connection base de donnée
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let database = mongoose.connect(
    "mongodb://localhost/demo",
    {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// Charger le model
const SaladModel = require('./Salad');
const Salad = mongoose.model('Salad');

// ------------------------
// LIST ROUTE ou EndPoint
// ------------------------
// -- Listes des salades
app.get('/salads', function (req, res) {
    Salad.find({}).then((salads)=>{
        res.status(200).json(salads)
    },(err)=>{
        res.status(400).send(err)
    })
});

// -- Consulter une salade
app.get('/salads/:idSalad', function (req, res) {
    Salad.findOne({id : req.params.idSalad}).then((salad)=>{
        if(salad){
            res.status(200).json(salad)
        }else{
            res.status(404).json({message : "Salad not found - "+req.params.idSalad})
        }
    },(err)=>{
        res.status(400).send(err)
    })
});
// -- Upload Salade
app.post('/salads', function (req, res) {
    // ---
    console.info("Upload a file");

    // -- Create Classique
    let mySalad = new Salad(req.body);
    mySalad.id = mySalad._id;

    mySalad.save().then((salad)=>{
        res.status(200).json(salad)
    },(err)=>{
        res.status(400).send(err)
    })

    // --- Catch dans busboy le stream de mes images
    // req.pipe(req.busboy);
    //
    // try{
    //     req.busboy.on('file', function (fieldname, file, filename) {
    //
    //         console.info("Uploading: " + filename);
    //
    //         // --- Create a path to the image
    //         let fstream = fs.createWriteStream(path.join(__dirname, filename.replace(' ', '-')));
    //
    //         file.pipe(fstream);
    //
    //         fstream.on('close', function (error) {
    //             if(error){
    //                 res.status(400).json(error);
    //             }else{
    //                 // --- Update the object to get the link
    //                 res.status(204).json({});
    //             }
    //         });
    //     });
    // }catch(error){
    //     res.status(400).json(error);
    // }
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
