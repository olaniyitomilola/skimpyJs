'use-strict';
const {AddProduct,createUser, getAllProducts,getAllUsers, getNumberOfClients, getNumberOfProducts, getNumberOfOrders} = require('./persistence/queries');

let users =[
	{
		"fName": "Kirby",
		"email": "maecenas.libero.est@aol.org",
		"user_id": "8A71F22C-2101-7598-5E07-A588F8A74CCC",
		"lName": "Perry",
		"phone": "0800 585 8021",
		"password": "79DECDD7-D809-3F9F-774B-AD2BA6045E67"
	},
	{
		"fName": "Plato",
		"email": "justo.praesent.luctus@aol.couk",
		"user_id": "A140447C-5979-C272-416A-7A1236686E36",
		"lName": "Rhiannon",
		"phone": "(01724) 54844",
		"password": "1AAEB348-2FC5-C57A-86AC-F478B87E960C"
	},
	{
		"fName": "Laura",
		"email": "tellus.sem@yahoo.org",
		"user_id": "65BC99FB-1488-2784-7A82-114977402997",
		"lName": "Ursa",
		"phone": "(016977) 7604",
		"password": "BAA6F1BC-9AE4-03BB-3D46-0EF640A4DF43"
	},
	{
		"fName": "Nita",
		"email": "senectus.et@yahoo.couk",
		"user_id": "65D38974-A32F-52C7-850B-2581F79CA417",
		"lName": "Donovan",
		"phone": "0896 635 3193",
		"password": "29578C32-139F-A17D-4B8A-217C2E21B1A7"
	},
	{
		"fName": "Hillary",
		"email": "cum.sociis.natoque@protonmail.ca",
		"user_id": "CC676214-46E1-B316-4B70-EA8E4B5ECC4A",
		"lName": "Hanna",
		"phone": "(0116) 813 1172",
		"password": "A363D3B2-14B6-A4D3-893C-28975B88AEA6"
	},
	{
		"fName": "Clinton",
		"email": "eu.ligula.aenean@yahoo.edu",
		"user_id": "EAB505D6-83A1-4647-974A-3B8D6C8A7A24",
		"lName": "Cade",
		"phone": "0845 745 7817",
		"password": "B2828113-6138-E99C-CD5C-A63F52D24FAB"
	},
	{
		"fName": "Talon",
		"email": "vivamus.molestie@hotmail.com",
		"user_id": "787A931A-A2AD-4A17-27C8-775BD1DC7D91",
		"lName": "Connor",
		"phone": "076 5166 5494",
		"password": "418ED02C-D410-3C4B-4A53-49DC3271438E"
	},
	{
		"fName": "Kim",
		"email": "nisi@yahoo.org",
		"user_id": "9C146224-EDE5-CD4E-DE4D-91AF3757707C",
		"lName": "Veda",
		"phone": "(014226) 04220",
		"password": "78363145-D15F-C247-CA7D-85DA7AE17107"
	},
	{
		"fName": "Yoshi",
		"email": "libero.est@protonmail.com",
		"user_id": "5B2D3179-7447-096C-076E-1162A26A84B2",
		"lName": "Deacon",
		"phone": "(01053) 14763",
		"password": "72F99166-6DE4-9B5D-E1EF-2B41CA43E4CD"
	},
	{
		"fName": "Justin",
		"email": "pharetra.nam.ac@icloud.net",
		"user_id": "D56E4E16-4A27-7065-4CB3-ED61D521249B",
		"lName": "Hayfa",
		"phone": "070 8137 6287",
		"password": "77E8CB1D-E954-E8BB-BBB7-3D8869B41F72"
	},
	{
		"fName": "Fritz",
		"email": "tincidunt.adipiscing@aol.org",
		"user_id": "5E538A50-6585-9C84-0763-2937C4211DAB",
		"lName": "Gregory",
		"phone": "(0111) 446 8568",
		"password": "DC0C7903-7C71-2C2D-A47B-6BB7145598BC"
	},
	{
		"fName": "Asher",
		"email": "tempus.mauris@protonmail.org",
		"user_id": "715955BE-E3D1-37F7-697D-CFDC721E42FE",
		"lName": "Calista",
		"phone": "(0112) 847 3369",
		"password": "F17AE3B9-B30A-2E97-2F08-9B9183B928BB"
	},
	{
		"fName": "Josiah",
		"email": "consectetuer.adipiscing@outlook.org",
		"user_id": "1FBE9423-147B-3D66-3594-B7788E4A7388",
		"lName": "Louis",
		"phone": "07624 862642",
		"password": "48344313-76CA-0919-EF75-A72728D2E2C9"
	},
	{
		"fName": "Brady",
		"email": "adipiscing.elit.curabitur@outlook.com",
		"user_id": "31E55CF4-4F96-4DBB-9C23-B0224884EECC",
		"lName": "Martha",
		"phone": "(016977) 2469",
		"password": "FADD9A58-45CF-AB72-1667-64AEC5535BA2"
	},
	{
		"fName": "Alexis",
		"email": "posuere.vulputate@yahoo.edu",
		"user_id": "984CD040-78D8-8B71-72E5-BA3B49F4CEA3",
		"lName": "Bevis",
		"phone": "0500 734078",
		"password": "8132DEAF-9691-C9DC-7A00-84A3D8C531C1"
	},
	{
		"fName": "Bert",
		"email": "vitae@protonmail.com",
		"user_id": "DCA37CC2-0988-8EBF-A9A6-91355951FD42",
		"lName": "Garrett",
		"phone": "(016977) 4607",
		"password": "87C50C74-65ED-5AA3-9CDE-0DF6BDADCBB6"
	},
	{
		"fName": "Ralph",
		"email": "ac.fermentum@hotmail.edu",
		"user_id": "11D986B1-C2CD-BC5C-ED41-D0249D74FD64",
		"lName": "Trevor",
		"phone": "0800 543 7708",
		"password": "8423D10C-898B-062A-7AB3-4CA74890571F"
	},
	{
		"fName": "Reece",
		"email": "aliquam.iaculis@aol.com",
		"user_id": "776E58A7-6E42-499E-F770-90269422420D",
		"lName": "Wynter",
		"phone": "(0119) 925 1134",
		"password": "8DEE5273-2D48-29FA-893E-033D27C267A6"
	},
	{
		"fName": "Otto",
		"email": "non@outlook.ca",
		"user_id": "1B7CCBD5-2AB6-87A4-E79B-AEDAA4CE72AD",
		"lName": "Ralph",
		"phone": "(021) 9716 3563",
		"password": "5DBC6472-A49A-9484-DDDB-CBA955B33845"
	},
	{
		"fName": "Yoshi",
		"email": "ullamcorper.duis@yahoo.couk",
		"user_id": "65F87B13-B917-964B-D94D-FD1DD182297C",
		"lName": "Brennan",
		"phone": "0800 921 8716",
		"password": "341DD19A-AA28-F655-5F41-EC545482B6D1"
	}
]

const start = require('./dbchecks');

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const cors = require('cors')

const router = require('./API/ItemController');
const { dBInsertError } = require('./custom_errors/customErrors');
require('dotenv').config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

//check that all db is set before starting server

async function startApp(){
    let allset = await start();

    if(allset){
        app.listen(port,()=>{
            console.log(`App is listening on port ${port}`)
        })

      
       
       
    }else{
        console.error('Something wrong with db')
    }
}

startApp()
 