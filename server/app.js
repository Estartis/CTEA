const express = require('express')
const app = express()
const path = require('path')
const Web3 = require('web3')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const planetCode = require('./planetCode')
const cross = require ('./cross')
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/8da0044cc2304474b465e117df2febbf");
const web3 = new Web3(provider);
web3.eth.net.isListening()
    .then(() => console.log('web3 is connected'))
    .catch(e => console.log('Wow. Something went wrong'))
const Tx = require('ethereumjs-tx').Transaction
var Contract = require("web3-eth-contract")
class HeavenlyObject {
    constructor(code = '', size = '', color = '', water = '', whatObject = '', quality = '', relief = '') {
        this.code = code
        this.size = size
        this.color = color
        this.water = water
        this.relief = relief
        this.whatObject = whatObject
        this.quality = quality
    }
}


Contract.setProvider('https://ropsten.infura.io/v3/8da0044cc2304474b465e117df2febbf')
const jsonInterface = [{
        "inputs": [{
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            }
        ],
        "name": "add_lot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "string[]",
            "name": "_objects",
            "type": "string[]"
        }],
        "name": "add_obj_to_conf",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "add_objects",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "buy_lot",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "confirm_obj",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
        }],
        "name": "delObject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMoneyInfo",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_lots",
        "outputs": [{
            "components": [{
                    "internalType": "string",
                    "name": "_dna",
                    "type": "string"
                },
                {
                    "internalType": "address payable",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "internalType": "struct CryptoGalaxyMain.Object[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_unconf_obj",
        "outputs": [{
            "components": [{
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "string[]",
                    "name": "_objects",
                    "type": "string[]"
                }
            ],
            "internalType": "struct CryptoGalaxyMain.ObjToConf[]",
            "name": "",
            "type": "tuple[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_u_address",
            "type": "address"
        }],
        "name": "get_user_objects",
        "outputs": [{
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address payable",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_money",
            "type": "uint256"
        }],
        "name": "sendMoneyAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address payable",
            "name": "newOwner",
            "type": "address"
        }],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
var contractAddress = "0x0fFd04A7D08C872253Be19c88a4d314F201d2D63"
var contract = new Contract(jsonInterface, contractAddress)
const account1 = '0x917EA77C7d6791A122cCade9839B70dCAcCF0F6c'
web3.eth.defaultAccount = account1

function addObjects(id, pkey, ids) {
    const privateKey1 = Buffer.from('13a05a79c509e37ba72006f5691d82e41fcc56a65c8b12b075257b11a58af28d', 'hex');
    const myData = contract.methods.add_objects(id).encodeABI()
    web3.eth.getTransactionCount(account1, (err, txCount) => {
        // Build the transaction
        const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: contractAddress,
                value: web3.utils.toHex(web3.utils.toWei('0', 'wei')),
                gasLimit: web3.utils.toHex(2100000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
                data: myData
            }
            // Sign the transaction
        const tx = new Tx(txObject, { 'chain': 'ropsten' });
        tx.sign(privateKey1);
        const serializedTx = tx.serialize();
        // Broadcast the transaction
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log)
            .then((results) => {
                if (err) {
                    console.log(err)
                } else {
                    var connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        database: "planets",
                        password: "cteaproject"
                    });
                    connection.connect((err) => {})
                    sql = `DELETE FROM unconf_tx WHERE publickey='${pkey}' AND id=${ids}`
                    connection.query(sql, function(err, results) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(results)
                    })
                    connection.end((err) => {})
                    console.log(id)
                }
            })
    });
}

function deleteObjects(id) {
    const privateKey1 = Buffer.from('13a05a79c509e37ba72006f5691d82e41fcc56a65c8b12b075257b11a58af28d', 'hex');
    const myData = contract.methods.confirm_obj(id).encodeABI()
    web3.eth.getTransactionCount(account1, (err, txCount) => {
        // Build the transaction
        const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: contractAddress,
                value: web3.utils.toHex(web3.utils.toWei('0', 'wei')),
                gasLimit: web3.utils.toHex(2100000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
                data: myData
            }
            // Sign the transaction
        const tx = new Tx(txObject, { 'chain': 'ropsten' });
        tx.sign(privateKey1);
        const serializedTx = tx.serialize();
        // Broadcast the transaction
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', console.log);
    });
}

function searchUnc() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "planets",
        password: "cteaproject"
    });
    connection.connect((err) => {})
    sql = "SELECT * FROM unconf_tx"
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            contract.methods.get_unconf_obj().call().then((obj_to_conf) => {
                var count = 0
                for (i = 0; i < obj_to_conf.length; i++) {
                    for (j = 0; j < results.length; j++) {
                        if (parseInt(obj_to_conf[i]._owner, '16') !== 0) {
                            if (String(obj_to_conf[i]._owner) === results[j].publickey) {
                                addObjects(i, results[j].publickey, results[j].id)
                                console.log("add")
                                count++
                            }
                        }
                    }
                    if (count === 0 && parseInt(obj_to_conf[i]._owner, '16') !== 0) {
                        deleteObjects(i)
                        console.log("delete")
                        count = 0
                    }
                }
            })
        }
    })
    connection.end((err) => {})
}
async function searchForUnc() {
    setInterval(searchUnc, 24000)
}
searchForUnc()


async function renderObjects(publicKey) {
    let objects = await contract.methods.get_user_objects(publicKey).call()
    return objects
}

app.set("view engine", "hbs");
app.set("views", "public/templates")
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var nickname
var publicKey
var sql
app.use('/public', express.static(__dirname + '/public'));

app.get('/',urlencodedParser, (req, res) => {
    res.status(200)
    res.render("index")
})
app.post('/',urlencodedParser , (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (req.body.nickname !== '') {
        nickname = req.body.nickname
        publicKey = req.body.publkey
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "planets",
            password: "cteaproject"
        });
        connection.connect((err) => {
            if (err) {
                console.log("Some errors")
            } else {
                console.log("MySQL connected")
            }
        })
        sql = `INSERT IGNORE INTO users(public_key, nickname) VALUES('${publicKey}', '${nickname}')`;
        connection.query(sql, function(err, results) {
            if (err) {
                console.log(err)
            }
            console.log(results)
        })
        connection.end((err) => {
            if (err) {
                console.log("Some errors")
            } else {
                console.log("MySQL disconnected")
            }
        })
        res.redirect("game")
    }
})
app.get('/game', (req, res) => {
    res.status(200)
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "planets",
        password: "cteaproject"
    });
    connection.connect((err) => {
        if (err) {
            console.log("Some errors")
        } else {
            console.log("MySQL connected")
        }
    })
    renderObjects(publicKey).then((objects) => {
        console.log(objects.length)
        console.log(objects)
        var objectsObj = []
        var planetName = []
        var crossTime = []
        var DNA = []
        var rating = 0
        sql = `create table if not exists planets_${publicKey}(
			id int primary key not null,
			DNA varchar(255) not null,
			position int not null,
			name varchar(255),
            date_cross varchar(255) 
		)`
        connection.query(sql, function(err, results) {
            if (err) {
                console.log(err)
            }
        })
        for (i = 0; i < objects.length; i++) {
            for (j = 2; j < 10; j = j + 2) {
                rating = rating + parseInt(objects[i][j] + objects[i][j + 1])
            }
            objectsObj[i] = new HeavenlyObject()
            objectsObj[i] = planetCode.Parse_object_code(objects[i])
            if (objects[i] == 0) {
                sql = `INSERT IGNORE INTO planets_${publicKey} (id, DNA, position) VALUES(${i},'${objects[i]}', 0)`;
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                sql = `UPDATE planets_${publicKey} SET DNA=0 WHERE id=${i}`
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                sql = `INSERT IGNORE INTO planets_${publicKey} (id, DNA, position) VALUES(${i},'${objects[i]}', 0)`;
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
        sql = `SELECT * FROM planets_${publicKey}`
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var userObjects = results
                for (i = 0; i < userObjects.length; i++) {
                    DNA[i] = userObjects[i].DNA
                    if (userObjects[i].name === null) {
                        planetName[i] = planetCode.create_name()
                        sql = `UPDATE planets_${publicKey} SET name='${planetName[i]}' WHERE id=${i}`
                        connection.query(sql, (err, results) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(results)
                            }
                        })
                    } else {
                        planetName[i] = userObjects[i].name
                    }
                    if (userObjects[i].date_cross === null) {
                        crossTime[i] = '0'
                    }
                    else {
                        crossTime[i] = userObjects[i].date_cross
                    }
                }
                var planetCard = planetCode.display_object_onScreen(objectsObj, planetName, crossTime, DNA)
                connection.end((err) => {
                    if (err) {
                        console.log("Some errors")
                    } else {
                        console.log("MySQL disconnected")
                    }
                })
                res.render("game", {
                    cardPlanet: planetCard[0],
                    cardStar: planetCard[1],
                    nickname: nickname,
                    rating: rating
                })
            }
        })
    })
})
app.get('/market', urlencodedParser, (req, res) => {
    res.status(200)
    res.render("market")
})
app.post('/market', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    var publicKey = req.body.address
    var valueCheck = req.body.value
    console.log(valueCheck)
    console.log(publicKey)
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "planets",
        password: "cteaproject"
    });
    connection.connect((err) => {})
    sql = `INSERT INTO unconf_tx(publickey,value) VALUES('${publicKey}','${valueCheck}')`
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })
    connection.end((err) => {
        if (err) {
            console.log("Some errors")
        } else {
            console.log("MySQL disconnected")
        }
    })
    res.redirect("game")
})

app.get('/cross', urlencodedParser, (req, res) => {
    res.status(200)
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "planets",
        password: "cteaproject"
    });
    connection.connect((err) => {})
    renderObjects(publicKey).then((objects) => {
        console.log(objects.length)
        console.log(objects)
        var objectsObj = []
        var planetName = []
        var crossTime = []
        var DNA = []
        var rating = 0
        sql = `create table if not exists planets_${publicKey}(
			id int primary key not null,
			DNA varchar(255) not null,
			position int not null,
			name varchar(255),
            date_cross varchar(255) 
		)`
        connection.query(sql, function(err, results) {
            if (err) {
                console.log(err)
            }
        })
        for (i = 0; i < objects.length; i++) {
            for (j = 2; j < 10; j = j + 2) {
                rating = rating + parseInt(objects[i][j] + objects[i][j + 1])
            }
            objectsObj[i] = new HeavenlyObject()
            objectsObj[i] = planetCode.Parse_object_code(objects[i])
            if (objects[i] == 0) {
                sql = `INSERT IGNORE INTO planets_${publicKey} (id, DNA, position) VALUES(${i},'${objects[i]}', 0)`;
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
                sql = `UPDATE planets_${publicKey} SET DNA=0 WHERE id=${i}`
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
            } else {
                sql = `INSERT IGNORE INTO planets_${publicKey} (id, DNA, position) VALUES(${i},'${objects[i]}', 0)`;
                connection.query(sql, function(err, results) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        }
        sql = `SELECT * FROM planets_${publicKey}`
        connection.query(sql, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                var userObjects = results
                for (i = 0; i < userObjects.length; i++) {
                    DNA[i] = userObjects[i].DNA
                    if (userObjects[i].name === null) {
                        planetName[i] = planetCode.create_name()
                        sql = `UPDATE planets_${publicKey} SET name='${planetName[i]}' WHERE id=${i}`
                        connection.query(sql, (err, results) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(results)
                            }
                        })
                    } else {
                        planetName[i] = userObjects[i].name
                    }
                    if (userObjects[i].date_cross === null) {
                        crossTime[i] = '0'
                    }
                    else {
                        crossTime[i] = userObjects[i].date_cross
                    }
                }
                var planetCard = cross.display_object_onScreen(objectsObj, planetName, crossTime, DNA)
                connection.end((err) => {
                    if (err) {
                        console.log("Some errors")
                    } else {
                        console.log("MySQL disconnected")
                    }
                })
                res.render("cross", {
                    Cards: planetCard
                })
            }
        })
    })
    
})
app.get('/rating', (req, res) => {
    res.status(200)
    res.render("rating")
})
app.get('/pole_game', (req, res) => {
    res.status(200)
    res.render("pole_game")
})
  

app.post('/cross',urlencodedParser, function(req, res) {
    var publicKey1 = req.body.address
    publicKey1 = publicKey1.toLowerCase()
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "planets",
        password: "cteaproject"
    });
    connection.connect((err) => {})
    valueCheck = 0;
    sql = `INSERT INTO unconf_tx(publickey,value) VALUES('${publicKey1}','${valueCheck}')`
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("---------------all ok")
            console.log(results)
        }
    })
    sql = `UPDATE planets_${publicKey1} SET date_cross='${req.body.cross_time}' WHERE id=${req.body.parent_id1}`
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("---------------all ok")
            console.log(results)
        }
    })
    sql = `UPDATE planets_${publicKey1} SET date_cross='${req.body.cross_time}' WHERE id=${req.body.parent_id2}`
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("---------------all ok")
            console.log(results)
        }
    })
    connection.end((err) => {
        if (err) {
            console.log("Some errors")
        } else {
            console.log("MySQL disconnected")
        }
    })
})
module.exports = app