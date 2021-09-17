//Создание Кода для планеты
class HeavenlyObject {
    constructor(code='', size='', color='', water='', whatObject='',quality='', relief=''){
        this.code = code
        this.size = size
        this.color = color
        this.water = water
        this.relief = relief
        this.whatObject = whatObject
        this.quality = quality
    }
}


exports.Create_object_code = function(object_code, parent_max=99){
    var new_object_code = object_code
    for (i=1; i<=4; i++) {
        var object_code_int = Math.floor(Math.random()*parent_max)+1
        if (object_code_int <10){
            object_code_int = "0"+String(object_code_int)
        }
        new_object_code += object_code_int

    }
    return new_object_code
}


/*Парсер кода планеты 
Размер: 1-5 - маленькая, 6-8 - средняя, 9-10 - большая;
Цвет суши: 1-6 - Серый(каменистый), 7-9 - Красный, 10 - Зеленый;
Вода: 1-4 - Отсутствует, 5 - 6 - Синяя, 7-8 - Зеленая, 9-10 - Фиолетовая
Качество : 1-5 - обычная, 6-8 - редкая, 9-10 - легендарная;
*/
exports.Parse_object_code = function(object_code){
    var size = Math.round((parseInt(object_code[2]+object_code[3]))/10)
    var color = Math.round((parseInt(object_code[4]+object_code[5]))/10)
    var quality = exports.find_max_quality(object_code)
    var relief = Math.round((parseInt(object_code[8]+object_code[9]))/10)
    var new_object = new HeavenlyObject()
    new_object.code = object_code
    

    //Размер
    if (size>8){
        new_object.size = "Giant"
    }
    else if (size>5){
        new_object.size = "Medium"
    }
    else {
        new_object.size = "Small"
    }

    //Рельеф

    // если первая цифра == 0, то это планета, если 1, то звезда
    if (object_code[0] === "0"){
        new_object.whatObject = "Planet"
        var water = Math.round((parseInt(object_code[6]+object_code[7]))/10)
        if (relief>8){
            new_object.relief = "3"
        }
        else if (color>5){
            new_object.relief = "2"
        }
        else{
            new_object.relief = "1"
        }
        //Цвет
        if (color>9){
            new_object.color = "red"
        }
        else if (color>5){
            new_object.color = "orange"
        }

        //Вода
        if(water>4){
            if (water>8){
                new_object.water = "purple"
            }
            else if (water>6){
                new_object.water = "green"
            }
            else {
                new_object.water = "blue"
            }

            if (color<=5){
                new_object.color = "green"
            }
        }
        else{
            new_object.water = "none"

            if (color<=5){
                new_object.color = "blue"
            }
        }
    }
    else if (object_code[0] === "1"){
        new_object.whatObject = "Star"
        //Тип звезды
        if (relief>8){
            new_object.relief = "4"
            new_object.color = "none"
        }
        else if (relief>6){
            new_object.relief = "3"
        }
        else if (color>4){
            new_object.relief = "2"
        }
        else{
            new_object.relief = "1"
        }

        //Цвет звезды
        if (new_object.relief !== "4"){
            if(color>5){
                new_object.color = "blue"
            }
            else{
                new_object.color = "orange"
            }
        }
     
    }

    //Качество
    if (quality > 85){
        new_object.quality = "Legendary"
    }
    else if (quality > 49){
        new_object.quality = "Rare"
    }
    else{
        new_object.quality = "Common"
    }
    return new_object
}

exports.Open_Star_box = function(parent_star_codeMax){
    console.log("Макс код планет ="+parent_star_codeMax)

    var planet1 = Parse_object_code(Create_object_code("01", parent_star_codeMax))
    var planet2 = Parse_object_code(Create_object_code("01", parent_star_codeMax))
    var planet3 = Parse_object_code(Create_object_code("01", parent_star_codeMax))

    display_object_onScreen(planet1)
    display_object_onScreen(planet2)
    display_object_onScreen(planet3)

    //if (Math.floor(Math.random()*99)+1 >= 80){
        // var star = Parse_object_code(Create_object_code("10", parent_star_codeMax))
        // display_object_onScreen(star)

        // console.log("Planet1 max quality = " + find_max_quality(planet1.code))
        // console.log("Planet2 max quality = "+find_max_quality(planet2.code))
        // console.log("Planet3 max quality = "+find_max_quality(planet3.code))
        // console.log("Star max quality = "+find_max_quality(star.code))
    //}
    //document.getElementsByClassName("Open_Star")[0].remove()
}

exports.display_object_onScreen = function(object, planetName, crossTime, DNA){
    var planetObjectsHTML = ''
    var starObjectsHTML = ''
    for(i = 0; i < object.length; i++) {
        var object_width = ''
        var object_height = ''

        if (object[i].size === "Giant"){
            object_width = 160
            object_height = 160
        }
        else if (object[i].size === "Medium"){
            object_width = 120
            object_height = 120
        }
        else {
            object_width = 80
            object_height = 80
        }
        //Выводим на экран планету
        if (object[i].code[0] === "0"){
            if (object[i].water === "none"){
                var color = "/public/image/Graphics/withoutWater/planet_color_"+object[i].color+".png"
                var water_relief = "/public/image/Graphics/withoutWater/planet_relief_"+object[i].relief+".png"
            }
            else{
                var color = "/public/image/Graphics/withWater/planet_color/"+object[i].color+".png"
                var water_relief = "/public/image/Graphics/withWater/planet_relief_"+object[i].relief+"/"+object[i].water+".png"
            }
        

            planetObjectsHTML = planetObjectsHTML + `
            <div class="card_planet" draggable="true" id="${i}" ondragstart='onDragStart(event);' data-cross="${crossTime[i]}" data-dna="${DNA[i]}">
            <div class="card-part">
                <img class="planet_color" src="${color}" width="${object_width}" height="${object_height}" draggable="false">
                <img class="planet_water" src="${water_relief}" width="${object_width}" height="${object_height}" draggable="false">
            </div>
            <div class="data-part">
                <div class="field-name">
                    <p class="name-plan">${planetName[i]}</p>
                </div>
                <div class="round"></div>
                <div class="round"></div>
                <div class="round"></div>
                <div class="round"></div>
                <div class="round"></div>
                <div class="field-type">
                    <p class="type-plan">${object[i].quality}</p>
                </div>
            </div>
            </div>`
        }
        else if (object[i].code[0] === "1") {
                var star_img = "/public/image/Graphics/stars/star_relief_"+object[i].relief+"_"+object[i].color+".png"
                starObjectsHTML = starObjectsHTML + `
                <div class="card_planet" draggable="true" id="${i}" ondragstart='onDragStart(event);' data-dna="${DNA[i]}">
                <div class="card-part">
                    <img class="star_img" src="${star_img}" width="${object_width}" height="${object_height}" draggable="false">
                </div>
                <div class="data-part">
                    <div class="field-name">
                        <p class="name-plan">${planetName[i]}</p>
                    </div>
                    <div class="round"></div>
                    <div class="round"></div>
                    <div class="round"></div>
                    <div class="round"></div>
                    <div class="round"></div>
                    <div class="field-type">
                        <p class="type-plan">${object[i].quality}</p>
                    </div>
                </div>
                </div>`
        }
    }
   return [planetObjectsHTML, starObjectsHTML]
}

exports.create_name = function(){
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var objectName = ""
    for (let i = 1; i<6; i++){
        if (i<3){
            objectName += letters[Math.floor(Math.random()*25)]
        }
        else {
            objectName += letters[Math.floor(Math.random()*10)+26]
        }

        if (i === 2){
            objectName+= "-"
        }
    }
    objectName += "-"
    objectName += letters[Math.floor(Math.random()*letters.length)]
    return objectName
}

exports.find_max_quality = function(code_object){
    var max_quality = 0
    for(let i = 0; i+1<=7;i+=2 ){
        if (code_object[i] === "0"){
            new_code_object = parseInt(code_object[i])
        }
        else{
            new_code_object = parseInt(code_object[i]+code_object[i+1])
        }

        if (new_code_object>max_quality){
            max_quality = new_code_object
        }
    }
    return max_quality

}