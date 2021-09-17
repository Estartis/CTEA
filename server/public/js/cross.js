
const comebackButton = document.getElementById('comeback-btn')
const crossGo = document.querySelector('.cross-go')
comebackButton.addEventListener('click', () => {
    location.href = "/game"
})


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
const signer = provider.getSigner()
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


find_max_quality = function(code_object1='', code_object2=''){
  var max_quality1 = 0
  var max_quality2 = 0
  //Если введен только 1 код, то просто находим макс параметр
  if(code_object2 === ''){
      for(let i = 0; i+1<=9;i+=2 ){
          if (code_object1[i] === "0"){
              new_code_object = parseInt(code_object1[i+1])
          }
          else{
              new_code_object = parseInt(code_object1[i]+code_object1[i+1])
          }
  
          if (new_code_object>max_quality1){
              max_quality1 = new_code_object
          }
      }
      return max_quality1
  }
  //Если ввено 2 кода, то находим у каждого макс параметр 
  // и из этих параметров выбирем максимальный
  else{
      max_quality1 = find_max_quality(code_object1)
      max_quality2 = find_max_quality(code_object2)
      if (max_quality1>max_quality2){
          return max_quality1
      }
      else{
          return max_quality2
      }
  }
}
random_integer = function(max=99, min=1){
  // случайное число от min до max включительно
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
Create_object_code = function(object_code, parent_max=99, const_quality=''){
  var new_object_code = object_code
  for (i=1; i<=4; i++) {
      //Если обязательно требуется Legendary или Rare параметр у обьекта, 
      // то задаем последний параметр как Legendary или Rare соответсвенно
      if (i === 4 && const_quality !== ''){
          //Если Legendary или Rare параметр уже есть, то последний параметр создаем рандомно
          if (const_quality === "Legendary" && find_max_quality(new_object_code+"00")>=85   
          || const_quality === "Rare" && find_max_quality(new_object_code+"00")>=50  ){

              var object_code_int = random_integer(parent_max)
              if (object_code_int <10){
                  object_code_int = "0"+String(object_code_int)
              }

          }
          //Если нужен легендарный, а него нет, то задаем последний параметр как случайный легендарый 
          else if (const_quality === "Legendary"){
              var object_code_int = random_integer(parent_max, 85)
          }
          //Если нужен редкий, а него нет, то задаем последний параметр как случайный редкий
          else if (const_quality === "Rare"){
              var object_code_int = random_integer(parent_max, 50)
          }

      }
      else{
          var object_code_int = random_integer(parent_max)
          if (object_code_int <10){
              object_code_int = "0"+String(object_code_int)
          }
      }

      new_object_code += object_code_int

  }
  return new_object_code
}

crossGo.addEventListener('click', () => {
  const firstWin = document.querySelector('.first')
  const secondWin = document.querySelector('.second')
  const finWin = document.querySelector('.fin')
  const firstCard = firstWin.querySelector('.card_planet')
  const secondCard = secondWin.querySelector('.card_planet')
  var data1 = parseInt(firstCard.getAttribute('data-cross'), 10)
  var data2 = parseInt(secondCard.getAttribute('data-cross'), 10)
  var dna1 = (firstCard.getAttribute('data-dna'))
  var dna2 = (secondCard.getAttribute('data-dna'))
  var quality = '';


  var timeCross = 0;
  if (find_max_quality(dna1, dna2) >= 85) {
    timeCross = 1800;
    quality = 'Legendary';
  } else if (find_max_quality(dna1, dna2) >= 50) {
    timeCross = 900;
    quality = 'Rare';
  } else {
    timeCross = 450;
    quality = 'Common';
  }


  if ((data2 + timeCross <= time()) && (data1 + timeCross <= time())) {
    if (random_integer() > (find_max_quality(dna1, dna2))) {
      var childDNA = Create_object_code('01', find_max_quality(dna1, dna2), quality);
      signer.getAddress().then((address) => {
        $.ajax({ 
          type: 'POST', 
          url: '/cross', 
          data: { 
                  address: address,
                  parent_id1: (firstCard.getAttribute('id')),
                  parent_id2: (secondCard.getAttribute('id')),
                  cross_time: time()
                }, 
          dataType: 'json',
          success: function (data) {
          }
        });
      })
      var objToSend = [childDNA]
      addObjTo(objToSend)
      window.location.reload();
      }
    else {
      alert('Скрещивание не удалось')
      signer.getAddress().then((address) => {
        $.ajax({ 
          type: 'POST', 
          url: '/cross', 
          data: { 
                  address: address,
                  parent_id1: (firstCard.getAttribute('id')),
                  parent_id2: (secondCard.getAttribute('id')),
                  cross_time: time()
                }, 
          dataType: 'json',
          success: function (data) {
          }
        });
      })
      window.location.reload();
    }
  }
  else {
    alert("Время от прошлого скрещивания еще не прошло")
  }
})


function onDrop(event) {
    if(!(event.target.classList.contains('card_planet'))&& !(event.target.classList.contains('empty'))&& event.target.classList.contains('cross-Card')) {
        const id = event
      .dataTransfer
      .getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    
    dropzone.appendChild(draggableElement);
    dropzone.classList.add('empty')
   
    event
      .dataTransfer
      .clearData();
    }
}
function onDragOver(event) {
    event.preventDefault();
}
function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
}
function time(){
  return parseInt(new Date().getTime()/1000)
}
