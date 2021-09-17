const genesisButton = document.getElementById('buy-genesis')
const commonButton = document.getElementById('buy-common')
const comebackButton = document.getElementById('comeback-btn')
const checkButton = document.getElementById('check-onload')
let abi = [{
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
let contractAddress = "0x0fFd04A7D08C872253Be19c88a4d314F201d2D63"
let provider = new ethers.providers.Web3Provider(window.ethereum)
const objectsToSend = []
const signer = provider.getSigner()

function Create_object_code(object_code, parent_max = 99) {
    var new_object_code = object_code
    for (i = 1; i <= 4; i++) {
        var object_code_int = Math.floor(Math.random() * parent_max) + 1
        if (object_code_int < 10) {
            object_code_int = "0" + String(object_code_int)
        }
        new_object_code += object_code_int

    }
    return new_object_code
}
const contract = new ethers.Contract(contractAddress, abi, provider);
const contractSigner = contract.connect(signer)

function addObjTo(objects) {
    let overrides = {
        gasLimit: 3000000,
        gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),
        value: 85000,
    }
    var tx = contractSigner.add_obj_to_conf(objects, overrides).then(() => {
        var objectsOut = contract.get_unconf_obj()
        objectsOut = objectsOut.toString()
        console.log(objectsOut)
    })
}
async function getObjects(publicKey) {
    let objects = await contract.get_user_objects(publicKey)
    return objects
}
function checkOnload(num) {
    signer.getAddress().then((address) => {
        document.getElementById("address").value = address
        document.getElementById("value").value = "85000 wei"
    
    $(document).ready(function($) {    
        $('.market-popup-close').click(function() {
            $(this).parents('.market-popup-fade').fadeOut();
            return false;
        });
    
        $('.market').click(function() {
            $(this).parents('.market-popup-fade').fadeOut();
            return false;
        });
    
        $(document).keydown(function(e) {
            if (e.keyCode === 27) {
                e.stopPropagation();
                $('.market-popup-fade').fadeOut();
            }
        });
    
        $('.market-popup-fade').click(function(e) {
            if ($(e.target).closest('.market-popup').length == 0) {
                $(this).fadeOut();
            }
        });
    });
    checkButton.addEventListener ('click', () => {
        if (num === 1) { 
            //getObjects(address).then((objects) => {
              //  if (objects.length === 0) {
                    for (var i = 0; i < 3; i++) {
                        objectsToSend[i] = Create_object_code('01', 75)
                    }
                    objectsToSend[3] = Create_object_code('10', 75)
                    addObjTo(objectsToSend)
                //} else {
                  //  alert("You have planets")
                //}
                
           // })
        }
        if (num === 2) {
            for (var i = 0; i < 3; i++) {
                if (Math.floor(Math.random() * 99) + 1 >= 90) {
                    objectsToSend[i] = Create_object_code("10", 30)
                } else {
                    objectsToSend[i] = Create_object_code("01", 30)
                }
            }
            addObjTo(objectsToSend)
        }
    })
})
}

genesisButton.addEventListener('click', () => {
    //signer.getAddress().then((address) => {
      //  getObjects(address).then((objects) => {
        //    if (objects.length === 0) {
                $('.market-popup-fade').fadeIn();
                checkOnload(1)
          //  }
            //else {
              //  alert("You have planets")
            //}
        //})
    //})
    
})
commonButton.addEventListener('click', () => {
    $('.market-popup-fade').fadeIn();
    checkOnload(2)
})
comebackButton.addEventListener('click', () => {
    location.href = "/game"
})
