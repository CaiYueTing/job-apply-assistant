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

function checkdivid(arr, welfare) {
    result = 0
    for (let i=0;i<arr.length;i++){
        if(arr[i]<=welfare){
            result = i+1
        }
    }
    return result
}

function card(company, records, welfare, salary, result, category) {
    card = new helperCard(company, records , welfare, salary, result, category)
    card.init()
    card.listener()
    return card
}

function list(records) {
    list = new lawlist(records)
    list.init()
    return list
}

function chart(category) {
    var chart = new Salarychart(category)
    chart.init()
    return chart
}

function chartUpdata(chart, dataset, i) {
    chart.data.labels = dataset[i].labels
    chart.data.datasets[0].data = dataset[i].right
    chart.data.datasets[1].data = dataset[i].left
    chart.data.datasets[2].data = dataset[i].middle
    chart.data.datasets[3].data = dataset[i].average
    chart.update()
    return chart
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

        card = card(company, records, welfare, salary, result, category)
        list = list(records)
        chart = chart(category)
        el = chart.getElName()
        
        const backgroundColor = chart.getBackgroundColor()
        const borderColor = chart.getBorderColor()
        const option = chart.getOptionSetting()
        var IndDataset = []
        var ExpDataset = []
        var DistrictDataset = []
        var cateId = []
        var open = [false, false, false]
        var chooseCate = 0
        for (let i=0; i<category.length; i++) {
            let ind = chart.getIndustryDataset(i)
            let exp = chart.getExpDataset(i)
            let dis = chart.getDistrictDataset(i)
            let id = "catagory_id_"+i
            IndDataset.push(ind)
            ExpDataset.push(exp)
            DistrictDataset.push(dis)
            cateId.push(id)
        }
        
        var ctx = document.querySelector(`#${el}myChart`).getContext('2d')
        var mychart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: [0,1,2,3],
                datasets: [
                    {
                        label: "最高薪資",
                        data: 0,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor
                    },{
                        label: "最低薪資",
                        data: 0,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor
                    },{
                        label: "中位數薪資",
                        data: 0,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor
                    },{
                        label:"平均薪資",
                        data: 0,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor
                    },
                ]},
            options: option
        });
        
        $("#category_id_0").click(()=>{
            chooseCate = 0
            open = [true, false, false]
            mychart = chartUpdata(mychart, IndDataset, chooseCate)
            $(chart.getEl()).slideDown(500)
            $(list.getEl()).slideUp(500)
        })
        $("#category_id_1").click(()=>{
            chooseCate = 1
            open = [false, true, false]
            mychart = chartUpdata(mychart, IndDataset, chooseCate)
            $(chart.getEl()).slideDown(500)
            $(list.getEl()).slideUp(500)
        })
        $("#category_id_2").click(()=>{
            chooseCate = 2
            open = [false, false, true]
            mychart = chartUpdata(mychart, IndDataset, chooseCate)
            $(chart.getEl()).slideDown(500)
            $(list.getEl()).slideUp(500)
            open[2] = true
        })

        $("#salarychart_industry").click(()=> {
            mychart = chartUpdata(mychart, IndDataset, chooseCate)
        })

        $("#salarychart_exp").click(()=> {
            mychart = chartUpdata(mychart, ExpDataset, chooseCate)
        })

        $("#salarychart_district").click(()=> {
            mychart = chartUpdata(mychart, DistrictDataset, chooseCate)
        })

        $(card.getLaw()).click(()=>{
            let flag = open.includes(true)
            if (flag){
                open = [false, false, false]
                $(chart.getEl()).slideUp(500)
            }
            $(list.getEl()).slideDown(500)
        })
        $(list.getCloseEl()).click(()=>{
            $(list.getEl()).slideUp(500)
        })

        $(chart.getClose()).click(()=>{
            open = [false, false, false]
            $(chart.getEl()).slideUp(500)
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