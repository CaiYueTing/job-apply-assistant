function clearAlldata() {
    chrome.storage.local.clear()
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
    await chrome.storage.local.set({ 'localmonth': month })
    await chrome.storage.local.set({ 'localday': day })
}

async function checkLocalDate() {
    localday = await chrome.storage.local.get('localday', function (el) {
        return el.localday
    })

    localmonth = await chrome.storage.local.get('localmonth', function (el) {
        return el.localmonth
    })

    console.log(localday, localmonth)

    let clearFlag = (localmonth - month) < 0 || 
        (localmonth == 11 && month != localmonth) ||
        (localday == undefined || localmonth == undefined)
    if (clearFlag) {
        clearAlldata()
        setLocalDate()
    }
}

checkLocalDate()