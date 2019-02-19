function getCname() {
    var el = document.getElementsByClassName('company')[0]
    var cname = el.getElementsByClassName('cn')[0]
    return cname.innerText
}

function getlawcount() {
    company = getCname()
    company = company.replace(/\//g,"")
    reqStr = `http://localhost:8080/card/law/${company}`
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
    reqStr = `http://localhost:8080/card/salary/${salary}`

    return new Promise((resolve, reject)=> {
        data = $.getJSON(reqStr)
        resolve(data)
    })
}

function postWelfare() {
    content = document.getElementsByClassName('content')[2].innerText
    url = `http://localhost:8080/card/welfare`
    return new Promise((resolve,reject)=>{
        data = $.post(url, { wdata : content })
        resolve(data)
    })
}

function getJobcategory() {
    dlc = document.getElementsByClassName("cate")[0].innerText
    
    url = `http://localhost:8080/card/category`
    return new Promise((resolve, reject)=> {
        data = $.post(url, { cdata : dlc })
        resolve(data)
    })

}

function caculate(text) {

}

function checkdivid(arr, welfare) {
    result = 0
    for (let i=0;i<arr.length;i++){
        if(arr[i]<=welfare){
            result = i+1
        }
    }
    return result
}

company = getCname()


Promise.all([getlawcount(), postWelfare(), getSalary(), getJobcategory()]).then(
    function(para){
        records = para[0].records
        welfare = para[1].message
        salary = para[2].salary
        dd = para[1].dd
        result = checkdivid(dd,welfare)
        category = para[3].message
        card = new helperCard(company, records , welfare, salary, result, category)
        card.init()
        card.listener() 
        // card.showLawList()
        // card.closeLawList()
        lawlist = new lawlist(records)
        lawlist.init()
        
        $(card.getLaw()).click(()=>{
            $(lawlist.getEl()).slideDown(500)  
        })
        $(lawlist.getCloseEl()).click(()=>{
            $(lawlist.getEl()).slideUp(500)
        })


        console.log("ok")
    }
).catch(
    function(){  
        card = new helperCard()
        card.failCard()
        card.listener() 
        console.log("fail")
    }
)
