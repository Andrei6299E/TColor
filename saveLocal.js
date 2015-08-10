function saveLocal (action, nameSity, arrClr) {
    console.log('function saveLocal(' + action + ')')
    var arrNames = localStorage.getItem('names').split(','); // arr [name1, name2,...]
    var objNames = {};                                       // obj names = [color1, color2,...]
    for (var i = 0; i < arrNames.length; i++) {
        objNames[arrNames[i]] = localStorage.getItem(arrNames[i]).split(',');
    }
    if (action === 'get' && nameSity in arrNames) {          // set
        return objNames[nameSity];                           // Gracia!!! Return array the city color in array Local
    } else if (action === 'set') {                           // get
        if (arrNames.length >= 20) {                         // full memory? >20
            localStorage.removeItem(arrNames[0]);
            arrNames = arrNames.shift();
        }
        arrNames.push(nameSity);
        localStorage.setItem('names') = arrNames;
        localStorage.setItem(nameSity) = arrClr;
        return true
    }
}