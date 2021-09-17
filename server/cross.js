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
    }
   return [planetObjectsHTML]
}