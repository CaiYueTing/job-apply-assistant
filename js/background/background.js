const local = chrome.storage.local

function clearAlldata() {
    local.clear()
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


let date = new Date()
let month = date.getMonth()
let day = date.getDate()

async function setLocalDate() {
    await local.set({ 'localmonth': month })
    await local.set({ 'localday': day })
}



async function getLocalMonth() {
    await local.get('localday', function (el) {
        return el.localday
    })
}

async function getLocalDay() {
    await local.get('localmonth', function (el) {
        return el.localmonth
    })
}

local.get('localday', function (el) {
    let localday = el.localday
    local.get('localmonth', function (el) {
        let localmonth = el.localmonth
        let clearFlag = (localmonth - month) < 0 ||
            (localmonth == 11 && month != localmonth) ||
            (localday == undefined || localmonth == undefined)
        console.log(localday, localmonth, clearFlag)
        if (clearFlag) {
            clearAlldata()
            setLocalDate()
        }
    })
})