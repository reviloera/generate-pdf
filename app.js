const express = require('express')
const app = express()
const port = 3000;

const cors = require('cors');
const bodyParser = require('body-parser');
const PdfPrinter = require('pdfmake/src/printer');
const fs = require('fs');

//Middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});


app.use(cors());
app.use(
    bodyParser.json({
        limit: '16mb'
    })
);
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


app.use('/pdf', express.static(__dirname + '/pdf/'));

app.get('/', (req, res) => {

    let pdfCreation = false;
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            'Sally Bot',
            'Here we go revilo ... !'
        ]
    };

    const fontDescriptors = {
        Roboto: {
            normal: './Roboto/Roboto-Regular.ttf',
            bold: './Roboto/Roboto-Bold.ttf',
            italics: './Roboto/Roboto-Italic.ttf',
            bolditalics: './Roboto/Roboto-BoldItalic.ttf',
        }
    };

    const printer = new PdfPrinter(fontDescriptors);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    let file_name = 'pdf/facture.pdf';

    pdfDoc.pipe(fs.createWriteStream(file_name))
    .on('finish', function () {
        
        
        res.send('Hello World!')
        
        // return client.messages
        //             .create({
        //                 from: 'whatsapp:+14155238886',
        //                 to: `${data.From}`,
        //                 //body: '',
        //                 body: 'Wow! looks like its your first time on Stanbic LytInvoice! send *start* to get started',
        //                 mediaUrl: url
        //             })
        //             .then(message => {
        //                 console.log(message.sid, data.From);
        //             })
        //             .catch(err2 => {
        //                 console.error(err2);
        //             });
    })
    .on('error', function (err3) {
        console.log('Error during the wirtestream operation in the new file');

    });

pdfDoc.end();

    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))