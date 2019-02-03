function getCname() {
    var el = document.getElementsByClassName('company')[0]
    var cname = el.getElementsByClassName('cn')[0]
    return cname.innerText
}

function getlawcount() {
    company = getCname()
    company = company.replace(/\//g,"")
    reqStr = `http://localhost:8080/law/${company}`
    return new Promise((resolve,reject)=> {
        lowcount = $.getJSON(reqStr)
        resolve(lowcount)
    })
}

function getWelfare() {
    content = document.getElementsByClassName('content')[2].innerText
    c = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    reqStr = `http://localhost:8080/welfare/${c}`
    return new Promise((resolve, reject)=> {
        data = $.getJSON(reqStr)
        resolve(data)
    })
}

function getSalary() {
    s = document.getElementsByClassName('salary')[0].innerText
    rangeMonth = /\d+\,\d+\~\d+\,\d+/
    rangeHour = /\d+\~\d+/
    staticMonth = /\d+\,\d+/
    staticHourOrUp4 = /\d+/
    
    rm = s.match(rangeMonth)
    rh = s.match(rangeHour)
    sm = s.match(staticMonth)
    sh4 = s.match(staticHourOrUp4)
    
    if (rm != null){
        salary =rm[0]
    }
    if (rm == null && rh != null){
        salary =rh[0]
    }
    if (sm != null && rm ==null){
        salary =sm[0]
    }
    if (sm ==null && rm ==null && rh==null && sh4 != null){
        salary =sh4[0]
    }
    
    salary = salary.replace(/\,/g,"")
    reqStr = `http://localhost:8080/welfare/`

    return salary
}

function getJobcategory() {

}

function caculate(text) {

}

company = getCname()
salary = getSalary()

Promise.all([getlawcount(), getWelfare()]).then(
    function(para){
        records = para[0].records.length
        welfare = para[1].message
        card = new helperCard(company, records , welfare, salary, "8")
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
