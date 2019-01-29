function getCname() {
    var el = document.getElementsByClassName('company')[0]
    var cname = el.getElementsByClassName('cn')[0]
    return cname.innerText
}

function getlawcount() {
    company = getCname()
    reqStr = `http://localhost:8080/law/${company}`
    return new Promise((resolve,reject)=> {
        lowcount = $.getJSON(reqStr)
        resolve(lowcount)
    })
}

function getWelfare() {
    content = document.getElementsByClassName('content')[2].innerText
    var reg = new RegExp("/", "g")
    c = content.replace(reg, "")
    console.log(c)
    reqStr = `http://localhost:8080/welfare/${c}`
    return new Promise((resolve, reject)=> {
        data = $.getJSON(reqStr)
        resolve(data)
    })
}

function getSalary() {

}

function getJobcategory() {

}

function caculate(text) {

}

company = getCname()

Promise.all([getlawcount(), getWelfare()]).then(
    function(para){
        records = para[0].records.length
        welfare = para[1].message
        card = new helperCard(company, records , welfare, "9", "8")
        card.init()
        card.listener() 
        console.log("ok")
    }
).catch(
    function(para){  
        card = new helperCard(company, "?", "?", "9", "8")
        card.init()
        card.listener() 
        console.log("fail")
    }
)
