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
    reqStr = `http://localhost:8080/welfare/${content}`
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

Promise.all([getCname(), getlawcount(), getWelfare()]).then(
    function(para){
        card = new helperCard(para[0], para[1].message, para[2].message, "9", "8")
        card.init()
        card.listener() 
    }
).catch(
    function(para){  
        card = new helperCard(para[0], "?", "?", "9", "8")
        card.init()
        card.listener() 
    }
)
