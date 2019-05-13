const requrl = root.localhost

function getCname() {
    var el = document.getElementsByClassName("company")[0]
    var cname = el.getElementsByClassName("cn")[0]
    return cname.innerText
}

company = getCname()

function saveCompanyData(name, data) {
    chrome.storage.local.set({ [name]: data }, function () {
        console.log("save:", data)
    })
}

function saveCounter(name) {
    chrome.storage.local.get(["jobCounter"], function (el) {
        var c = 1 
        if (el.jobCounter){
            c = el.jobCounter + 1
        }
        console.log("jobcounter:", c)
        chrome.storage.local.set({ "jobCounter": c })
        chrome.storage.local.getBytesInUse([name], function (memory) {
            chrome.storage.local.get(["chromememory"], function (totalmemory) {
                console.log("origin memory :", memory)
                var t = memory
                if (totalmemory.chromememory){
                    t = totalmemory.chromememory + memory
                }
                console.log("total memory :", t)
                chrome.storage.local.set({ "chromememory": t })
            })
        })
    })
}

function getlawcount() {
    company = getCname()
    company = company.replace(/\//g, "")
    reqStr = requrl + `/card/law/${company}`
    return new Promise((resolve, reject) => {
        lowcount = $.getJSON(reqStr)
        resolve(lowcount)
    })
}

function getQollie() {
    company = getCname()
    company = company.replace(/\//g, "")
    reqStr = requrl + `/card/qol/${company}`
    return new Promise((resolve, reject) => {
        qol = $.getJSON(reqStr)
        resolve(qol)
    })
}

function getWelfare() {
    content = document.getElementsByClassName("content")[2].innerText
    c = content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    reqStr = requrl + `/welfare/${c}`
    return new Promise((resolve, reject) => {
        data = $.getJSON(reqStr)
        resolve(data)
    })
}

function getSalary() {
    s = document.getElementsByClassName("salary")[0].innerText
    rangeMonth = /\d+\,\d+\~\d+\,\d+/
    rangeHour = /\d+\~\d+/
    staticMonth = /\d+\,\d+/
    staticHourOrUp4 = /\d+/

    rm = s.match(rangeMonth)
    rh = s.match(rangeHour)
    sm = s.match(staticMonth)
    sh4 = s.match(staticHourOrUp4)

    if (rm != null) {
        salary = rm[0]
    }
    if (rm == null && rh != null) {
        salary = rh[0]
    }
    if (sm != null && rm == null) {
        salary = sm[0]
    }
    if (sm == null && rm == null && rh == null && sh4 != null) {
        salary = sh4[0]
    }

    salary = salary.replace(/\,/g, "")
    reqStr = requrl + `/card/salary/${salary}`

    return new Promise((resolve, reject) => {
        data = $.getJSON(reqStr)
        resolve(data)
    })
}

function postWelfare() {
    content = document.getElementsByClassName("content")[2].innerText
    url = requrl + `/card/welfare`
    return new Promise((resolve, reject) => {
        data = $.post(url, { wdata: content })
        resolve(data)
    })
}

function getJobcategory() {
    dlc = document.getElementsByClassName("cate")[0].innerText

    url = requrl + `/card/category`
    return new Promise((resolve, reject) => {
        data = $.post(url, { cdata: dlc })
        resolve(data)
    })

}

function checkdivid(arr, welfare) {
    result = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= welfare) {
            result = i + 1
        }
    }
    return result
}

function card(company, records, welfare, salary, result, category, qollie) {
    card = new helperCard(company, records, welfare, salary, result, category, qollie)
    card.init()
    card.listener()
    return card
}

function makelist(records) {
    list = new lawlist(records)
    list.init()
    return list
}

function makechart(category) {
    var chart = new Salarychart(category)
    chart.init()
    return chart
}

function makedonut(obj) {
    var d = new Donut(obj)
    d.init()
    return d
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

function getWelfareSetting() {
    const memory = ["money", "time", "infra", "entertain", "grow"]
    let result = []
    for (let i = 0; i < memory.length; i++) {
        chrome.storage.sync.get(memory[i], function (el) {
            result.push(el)
        })
    }
    return result
}

function testchart(ctx, backgroundColor, borderColor, option) {
    return new Chart(ctx, {
        type: "horizontalBar",
        data: {
            labels: ["最高薪資", "最低薪資", "中位數薪資", "平均薪資"],
            datasets: [

            ]
        },
        options: option
    })
}

function initialSalaryChart(ctx, backgroundColor, borderColor, option) {
    return new Chart(ctx, {
        type: "horizontalBar",
        data: {
            labels: [0, 1, 2, 3],
            datasets: [
                {
                    label: "最高薪資",
                    data: 0,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor
                }, {
                    label: "最低薪資",
                    data: 0,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor
                }, {
                    label: "中位數薪資",
                    data: 0,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor
                }, {
                    label: "平均薪資",
                    data: 0,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor
                },
            ]
        },
        options: option
    })
}

function initialDonutChart(ctx, backgroundColor, donutObj) {
    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["經濟類", "休假類", "設施類", "娛樂類"],
            datasets: [
                {
                    data: [
                        donutObj.economic.length,
                        donutObj.entertain.length,
                        donutObj.infra.length,
                        donutObj.time.length,

                    ],
                    backgroundColor: backgroundColor
                }
            ]
        },
        options: {
            layout: {
                padding: {
                    bottom: 0
                }
            },
            legend: { position: "top" }
        }
    })
}

class st {
    constructor(records, qollie, welfare, salary, dd, donutObj, category) {
        this.records = records;
        this.qollie = qollie;
        this.welfare = welfare;
        this.salary = salary;
        this.dd = dd;
        this.donutObj = donutObj;
        this.category = category;
    }
}


function ExecuteCard(records, qollie, welfare, salary, dd, donutObj, category) {
    result = checkdivid(dd, welfare)
    if (donutObj.economic == null) {
        donutObj.economic = []
    }
    if (donutObj.time == null) {
        donutObj.time = []
    }
    if (donutObj.entertain == null) {
        donutObj.entertain = []
    }
    if (donutObj.infra == null) {
        donutObj.infra = []
    }
    // if (donutObj.person == null) {
    //     donutObj.person = []
    // }
    card = card(company, records, welfare, salary, result, category, qollie)
    list = makelist(records)
    chart = makechart(category)
    donut = makedonut(donutObj)
    donutel = donut.getElName()
    el = chart.getElName()

    const backgroundColor = chart.getBackgroundColor()
    const borderColor = chart.getBorderColor()
    const option = chart.getOptionSetting()
    var IndDataset = []
    var ExpDataset = []
    var DistrictDataset = []
    var cateId = []
    var chooseCate = 0
    for (let i = 0; i < category.length; i++) {
        let ind = chart.getIndustryDataset(i)
        let exp = chart.getExpDataset(i)
        let dis = chart.getDistrictDataset(i)
        let id = "catagory_id_" + i
        IndDataset.push(ind)
        ExpDataset.push(exp)
        DistrictDataset.push(dis)
        cateId.push(id)
    }


    var dtx = document.querySelector(`#${donutel}myChart`).getContext("2d")
    var donutchart = initialDonutChart(dtx, backgroundColor, donutObj)

    var ctx = document.querySelector(`#${el}myChart`).getContext("2d")
    var mychart = initialSalaryChart(ctx, backgroundColor, borderColor, option)


    //operation logic
    $("#category_id_0").click(() => {
        chooseCate = 0
        mychart = chartUpdata(mychart, IndDataset, chooseCate)
        $(chart.getEl()).slideDown(500)
        $(list.getEl()).slideUp(500)
        $(donut.getEl()).slideUp(500)
    })
    $("#category_id_1").click(() => {
        chooseCate = 1
        mychart = chartUpdata(mychart, IndDataset, chooseCate)
        $(chart.getEl()).slideDown(500)
        $(list.getEl()).slideUp(500)
        $(donut.getEl()).slideUp(500)
    })
    $("#category_id_2").click(() => {
        chooseCate = 2
        mychart = chartUpdata(mychart, IndDataset, chooseCate)
        $(chart.getEl()).slideDown(500)
        $(list.getEl()).slideUp(500)
        $(donut.getEl()).slideUp(500)
    })

    $("#salarychart_industry").click(() => {
        mychart = chartUpdata(mychart, IndDataset, chooseCate)
    })

    $("#salarychart_exp").click(() => {
        mychart = chartUpdata(mychart, ExpDataset, chooseCate)
    })

    $("#salarychart_district").click(() => {
        mychart = chartUpdata(mychart, DistrictDataset, chooseCate)
    })

    $(card.getWelfare()).click(() => {
        $(chart.getEl()).slideUp(500)
        $(list.getEl()).slideUp(500)
        $(donut.getEl()).slideDown(500)
    })

    $(card.getLaw()).click(() => {
        $(chart.getEl()).slideUp(500)
        $(donut.getEl()).slideUp(500)
        $(list.getEl()).slideDown(500)
    })
    $(list.getCloseEl()).click(() => {
        $(list.getEl()).slideUp(500)
    })

    $(chart.getClose()).click(() => {
        $(chart.getEl()).slideUp(500)
    })

    $(donut.getClose()).click(() => {
        $(donut.getEl()).slideUp(500)
    })

    console.log("ok")
}

// welfaresetting = getWelfareSetting()
function ExecuteCardRequest() {
    Promise.all([getlawcount(), postWelfare(), getSalary(), getJobcategory(), getQollie()]).then(
        function (para) {
            records = para[0].records
            qollie = para[4].qollie
            welfare = para[1].message
            salary = para[2].salary
            dd = para[1].dd
            donutObj = para[1].r
            result = checkdivid(dd, welfare)
            category = para[3].message

            storeData = new st(records, qollie, welfare, salary, dd, donutObj, category)
            // console.log(storeData)
            saveCompanyData(company, storeData)
            saveCounter(company)
            ExecuteCard(records, qollie, welfare, salary, dd, donutObj, category)
        }
    ).catch(
        function () {
            card = new helperCard()
            card.failCard()
            card.listener()
            console.log("fail")
        }
    )
}

function getCompanyData(name) {
    chrome.storage.local.get([name], function (el) {
        if (el[name]) {
            console.log(el[name])
            records = el[name].records
            qollie = el[name].qollie
            welfare = el[name].welfare
            salary = el[name].salary
            dd = el[name].dd
            donutObj = el[name].donutObj
            category = el[name].category
            // console.log(records, qollie, welfare, salary, dd, donutObj, category)
            ExecuteCard(records, qollie, welfare, salary, dd, donutObj, category)
        } else {
            console.log("no data")
            ExecuteCardRequest()
        }
    })
}

function deleteData(name) {
    chrome.storage.local.remove([name], function () {
        console.log("delete data:", name)
    })
}

function clearAlldata() {
    chrome.storage.local.clear()
}


var error = chrome.runtime.lastError
if (error) {
    clearAlldata()
}
// deleteData(company)
getCompanyData(company)
// clearAlldata()
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (var key in changes) {
//         var storageChange = changes[key];
//         console.log('Storage key "%s" in namespace "%s" changed. ' +
//             'Old value was "%s", new value is "%s".',
//             key,
//             namespace,
//             storageChange.oldValue,
//             storageChange.newValue);
//     }
// });