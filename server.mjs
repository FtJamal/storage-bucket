import express from "express"
import cors from "cors"
import mongoose from 'mongoose';
import { stringToHash, varifyHash } from "bcrypt-inzi";
// import { 
//     stringToHash,
//     varifyHash, 
//     validateHash 
// } from "bcrypt-inzi";

// mongoose.connect('mongodb+srv://abc:abc@cluster0.uhv9f8j.mongodb.net/?retryWrites=true&w=majority');
import fs from 'fs';
import admin from "firebase-admin";
// import multer from 'multer';


// https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
    "type": "service_account",
    "project_id": "signup-4439c",
    "private_key_id": "9f6208b8a76cba77868aa724cf1e652ea5028eca",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxdiPue1wB8bMA\n9MKtOFPq2JYJgR1yvCN6Gb4+ME/SeZ3p2+2jmxq/4Y34bEopZI5BoR1AkTvYUTrC\nWBqQNmhqu/iKXpimg7O/JCFFDVf75cyUEqrSq/vzk4+uTzGN3Iyr84Vdb87UFR1N\nLpOHgDEOdTgIGyxEFeQZV7eriz01gmbTu4E6ZoGgU1idP7EVZF/wk+ek1LVPiX4P\nyv8bt58kQZ49dkolnQGQFk6YgR//EN1oSpb+FbgG+F+A8zFBe9iU6Fhpf2/v7mdF\nL5E1qryFnwCNI2FPffq7rNNoME4IW+c1k2hEKu+ecOBRCwzPymS9bbKzJ3cZoE3q\nyRKemGFRAgMBAAECggEAA39wYF46l0g4DsQERU1HrCiWNnw+xBjsuxagTxH9NMkU\nYXxl//RJ7+/GcFfUE2JJwoXmMXRbYV1igtuhNGf6IWZwlOud5yRP6evQow+LBSpH\noMCIcOwWZHvrWFRzxdfLxwTfA1M1mK0M3Y1WN5TBgscxMkm00ue6jfxSYLV3IKOX\nsP1kjNXABWlpQ1FB+oeof9ifl2ohJhWHcwPrx840PO77o+Rj9uNjfPlytqJlx4Tf\nLNeg+xDKT6OV4gzdvP8P1i/jSmKT6yhGHMQf44kk/har5+9jK6oesy2lyDRr/rxj\niY1C0EeKT4c890pibEUOwM9q3sHNHQ9JfdXMJIK/hQKBgQDgPhcARILwkabJHbjg\nRBICnWBwjCvdlDYSda44jO9ESWgtPJtTTK9aGrmZGz+ntCYJSyt4Ym8aqMyE7XYl\n5TNfcVHjs6RsElt11pVI7aJqrn4H7qZlI1elXW4q5tBgi1D+UsmKzO58xyb6007v\nC+S8bqfg+QvkXnlc2Erwtkdf7QKBgQDKmAEL1w/WyO2Hed/W2s6q6XJ/wluKJrRf\npx5zeaFBT9TRsNVxkKvIlO9gAepvo4YQkOXhYZRoEj0wtVP2ujX59OvTomkM72vy\ndu3I6yDwI/2MJL9BbSUfJ/k0Jyl8ypqWDt/KbrGa6NFnV+l1FTRhVexHtYP9k/tI\nP1936ApydQKBgHWDFDqnrJa1PVoXoVKlWWrVXjycuEAd81gpI2uvL5PxhA5wvFUi\n0qG9b5W0md8goO4t3lHwA5lM7CCc8FVbj1hs4iUZdwjLdfKCySi2n26YkqNFhR1r\nL/sQwzLoUjrFx2P/rm52hmQNWXgIVE0hRnUY6BEVcg3zFFZ7YopSe4ThAoGBAMmH\nxdqqWAY4IBkZQnKvfNCFozG1/GuELv/L9b23K5MVv8XMG7d5y3iftzORFE1zpIRM\nL3ExKXkRU69lYZ3ZBKKeYg1HzSph7MboSYgJZd2cX7cOQvbphPjmQb8AigOqY3aM\nW1A7Jw/LM6uSxxiCPHXrDD0VMrSIhXoMGILl36aVAoGAIfcA3tpTUVH7s2Tu9pzQ\nU5wKXjT+3piLw+uqwoPshkw+9ZTk4kkx7tweFWD59CmowtrwdgW9X9wMTzph8PpQ\nAFRY4jVsIOB0rsaWbhvgcQvPpRL6YzARMxkcLkw/1RDfVseUcem/d/oQCHjraj8x\nd85dFtjytkiBLI8ui9sz9/g=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-wl4q0@signup-4439c.iam.gserviceaccount.com",
    "client_id": "100961213555645253124",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wl4q0%40signup-4439c.iam.gserviceaccount.com"
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://signup-4439c.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://signup-4439c.appspot.com");



//==============================================
import multer from 'multer';
const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })

//==============================================

const app = express();
app.use(express.json());  // parsing body
app.use(cors());


const port = process.env.PORT || 5001;

const userSchema = new mongoose.Schema({
    // firstName: { type: String },
    // lastName: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },
    // age: { type: Number, min: 17, max: 65, default: 18 },
    // isMarried: { type: Boolean, default: false },

    createdOn: { type: Date, default: Date.now },
});

const userModel = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    code: { type: String, required: true },

    createdOn: { type: Date, default: Date.now }
});

const productModel = mongoose.model('product', productSchema);


app.post("/signup", upload.any(), (req, res) => {

    let body = req.body;

    // console.log("body: ", body);
    // console.log("body: ", body.name);
    // console.log("body: ", body.email);
    // console.log("body: ", body.password);

    console.log("file: ", req.files[0]);

    if (!body.name
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "name": "John",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }


    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        {
            destination: `profilePhotos/${req.files[0].filename}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

                        // delete file from folder before sending response back to client (optional but recommended)
                        // optional because it is gonna delete automatically sooner or later
                        // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }


                        // check if user already exist // query email user
                        userModel.findOne({ email: body.email }, (err, user) => {
                            if (!err) {
                                console.log("user: ", user);

                                if (user) { // user already exist
                                    console.log("user already exist: ", user);
                                    res.status(400).send({ message: "user already exist,, please try a different email" });
                                    return;

                                } else { // user not already exist

                                    stringToHash(body.password).then(hashString => {

                                        userModel.create({
                                            name: body.name,
                                            email: body.email.toLowerCase(),
                                            password: hashString,
                                            profilePicture: urlData[0]
                                        },
                                            (err, result) => {
                                                if (!err) {
                                                    console.log("data saved: ", result);
                                                    res.status(201).send({
                                                        message: "user is created",
                                                        data: {
                                                            name: body.name,
                                                            email: body.email.toLowerCase(),
                                                            profilePicture: urlData[0]
                                                        }
                                                    });
                                                } else {
                                                    console.log("db error: ", err);
                                                    res.status(500).send({ message: "internal server error" });
                                                }
                                            });
                                    })

                                }
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "db error in query" });
                                return;
                            }
                        })


                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });

});


app.get("/users", async (req, res) => {
    try {
        let users = await userModel.find({}).exec();
        console.log("all user : ", users);

        res.send({
            message: "all users",
            data: users
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });
    }
})



// app.post("/signup", (req, res) => {

//     let body = req.body;

//     if (!body.firstName
//         || !body.lastName
//         || !body.email
//         || !body.password
//     ) {
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "firstName": "John",
//                     "lastName": "Doe",
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }

//     // check if user already exist // query email user
//     userModel.findOne({ email: body.email }, (err, data) => {
//         if (!err) {
//             console.log("data:", data);

//             if (data) {  // user already exist
//                 console.log("user already exist: ", data);
//                 res.status(400).send({ message: "user already exist,please try a different email" });
//                 return;

//             } else {   // user not already exist

//                 stringToHash(body.password).then(hashString => {
//                     // userModel.create({
//                     let newUser = new userModel({
//                         firstName: body.firstName,
//                         lastName: body.lastName,
//                         email: body.email.toLowerCase(),
//                         password: hashString
//                         // password: body.password
//                     });
//                     newUser.save((err, result) => {
//                         if (!err) {
//                             console.log("data saved:", result);
//                             res.status(201).send({ message: "user is created" });
//                         } else {
//                             console.log("db error:", err);
//                             res.status(500).send({ message: "internal server error" });
//                         }
//                     });
//                 })
//             }
//         } else {
//             console.log("db error: ", err);
//             res.status(500).send({ message: "db error in query" });
//         }
//     })
// });


// app.post("/login", (req, res) => {

//     let body = req.body;

//     if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
//         res.status(400).send(
//             `required fields missing, request example: 
//                 {
//                     "email": "abc@abc.com",
//                     "password": "12345"
//                 }`
//         );
//         return;
//     }

//     // check if user already exist // query email user
//     userModel.findOne({ email: body.email },
//         //projection !! mongodb feature//
//         // { email:1, firstName:1, lastName:1, age:1, password:0 },
//         "email firstName lastName age password",
//         (err, data) => {
//             if (!err) {
//                 console.log("data: ", data);

//                 if (data) { // user found
//                     varifyHash(body.password, data.password).then(isMatched => {

//                         console.log("isMatched: ", isMatched);

//                         if (isMatched) {
//                             // TODO:  add JWT token
//                             res.send({
//                                 message: "login successful",
//                                 profile: {
//                                     email: data.email,
//                                     firstName: data.firstName,
//                                     lastName: data.lastName,

//                                 }
//                             });
//                             return;
//                         } else {
//                             console.log("user not found");
//                             res.status(401).send({ message: "Incorrect email or password" });
//                             return;
//                         }
//                     })

//                 } else { // user not already exist
//                     console.log("user not found");
//                     res.status(401).send({ message: "Incorrect email or password" });
//                     return;
//                 }
//             } else {
//                 console.log("db error: ", err);
//                 res.status(500).send({ message: "login failed, please try later" });
//                 return;
//             }
//         })



// })




// 

app.post("/product", async (req, res) => {

    console.log("product received: ", req.body);

    let newProduct = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        code: req.body.code,
    })
    try {
        let response = await newProduct.save()
        console.log("product added: ", response);

        res.send({
            message: "product added",
            data: response
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to add product"
        });
    }
})

app.get("/products", async (req, res) => {

    try {
        let products = await productModel.find({}).exec();
        console.log("all products: ", products)

        res.status(200).send({
            message: "all products",
            data: products
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });
    }
})

app.get("/product/:id", async (req, res) => {
    try {
        let product = await productModel
            .findOne({ _id: req.params.id })
            .exec();
        console.log("product :", product);

        res.send({
            message: "product",
            data: product
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to get product"
        });

    }
})

app.delete("/product/:id", async (req, res) => {

    console.log("product received: ", req.body);

    try {
        let deleted = await productModel.deleteOne({ _id: req.params.id })
        console.log("product deleted: ", deleted);

        res.send({
            message: "product deleted",
            data: deleted
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to delete product"
        });
    }
})

app.put("/product/:id", async (req, res) => {
    let body = req.body;

    console.log("data to be edited :", body);

    let update = {}
    if (body.name) update.name = body.name
    if (body.description) update.description = body.description
    if (body.price) update.price = body.price
    if (body.code) update.code = body.code

    try {
        let updated = await productModel
            .findOneAndUpdate({ _id: req.params.id }, update, { new: true })
            .exec();

        console.log("product updated: ", updated);

        res.send({
            message: "product updated successfully",
            data: updated
        });
    } catch (error) {
        res.status(500).send({
            message: "failed to update product"
        });
    }

});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://abc:abc@cluster0.uhv9f8j.mongodb.net/socialMediaDB?retryWrites=true&w=majority';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////