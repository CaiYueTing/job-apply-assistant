const requrl = root.ec2

function GA() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
}
GA()
//DOM operation 
function getCname() {
    var el = document.getElementsByClassName("company")[0]
    var cname = el.getElementsByClassName("cn")[0]
    return cname.innerText
}

function getCategoryName() {
    dlc = document.getElementsByClassName("cate")[0].innerText
    dlc = dlc.split("、")
    return dlc
}

company = getCname()
categoryName = getCategoryName()


// Call API
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

// Card element
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

// Chart.js Operation
function chartUpdata(chart, dataset, i) {
    chart.data.labels = dataset[i].labels
    chart.data.datasets[0].data = dataset[i].right
    chart.data.datasets[1].data = dataset[i].left
    chart.data.datasets[2].data = dataset[i].middle
    chart.data.datasets[3].data = dataset[i].average
    chart.update()
    return chart
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
                        donutObj.time.length,
                        donutObj.infra.length,
                        donutObj.entertain.length
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

//  Card Operation
function checkdivid(arr, welfare) {
    result = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= welfare) {
            result = i + 1
        }
    }
    return result
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

class st {
    constructor(records, qollie, welfare, salary, dd, donutObj) {
        this.records = records;
        this.qollie = qollie;
        this.welfare = welfare;
        this.salary = salary;
        this.dd = dd;
        this.donutObj = donutObj;
    }
}
class ClassCategoryData {
    constructor(name, data) {
        this.category = name
        this.target = data
    }
}

// Generate Card with memory operation
function ExecuteCardRequest() {
    Promise.all([getlawcount(), postWelfare(), getSalary(), getJobcategory(), getQollie()]).then(
        function (para) {
            var records = para[0].records
            var qollie = para[4].qollie
            var welfare = para[1].message
            var salary = para[2].salary
            var dd = para[1].dd
            var donutObj = para[1].r
            var category = para[3].message
            var storeData = new st(records, qollie, welfare, salary, dd, donutObj)
            saveCompanyData(company, storeData)
            for (let i = 0; i < category.length; i++) {
                saveCategory(category[i].category, category[i].target)
            }
            saveCompanyCounter(company)
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

function getCategoryContent(arrCategory) {
    let result = 0
    const length = arrCategory.length
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(arrCategory, function (item) {
            for (let i = 0; i < length; i++) {
                if (item[arrCategory[i]]) {
                    result++
                }
            }
            if (result === length) {
                resolve(item)
            } else {
                resolve(-1)
            }
        })
    })
}

function getCompanyData(name, categoryName) {
    chrome.storage.local.get([name], function (el) {
        if (el[name]) {
            var records = el[name].records
            var qollie = el[name].qollie
            var welfare = el[name].welfare
            var salary = el[name].salary
            var dd = el[name].dd
            var donutObj = el[name].donutObj

            Promise.all([getCategoryContent(categoryName)]).then(
                function (para) {
                    arr = para[0]
                    // console.log(arr)
                    if (arr == -1) {
                        Promise.all([getJobcategory()]).then(
                            function (el) {
                                var newCate = el[0].message
                                for (let i = 0; i < newCate.length; i++) {
                                    saveCategory(newCate[i].category, newCate[i].target)
                                }
                                ExecuteCard(records, qollie, welfare, salary, dd, donutObj, newCate)
                            }
                        )
                    } else {
                        chrome.storage.local.get(categoryName, function (item) {
                            var categories = []
                            var length = categoryName.length
                            for (let i = 0; i < length; i++) {
                                var c = new ClassCategoryData(categoryName[i], item[categoryName[i]])
                                categories.push(c)
                            }
                            ExecuteCard(records, qollie, welfare, salary, dd, donutObj, categories)
                        })
                    }
                }
            )

        } else {
            console.log("no data")
            ExecuteCardRequest()
        }
    })
}

//Memory opeartion
function saveCompanyData(name, data) {
    chrome.storage.local.set({ [name]: data }, function () {
    })
}

function saveCategory(category, data) {
    chrome.storage.local.set({ [category]: data })
}

function saveCompanyCounter() {
    chrome.storage.local.get(["jobCounter"], function (el) {
        var c = 1
        if (el.jobCounter) {
            c = el.jobCounter + 1
        }
        chrome.storage.local.set({ "jobCounter": c })
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

function getItemsMemory(arr) {
    return new Promise(function (resolve, reject) {
        let r = []
        for (let i = 0; i < arr.length; i++) {
            getItemMemory(arr[i]).then(function (value) {
                r.push(value)
            })
        }
        resolve(r)
    })
}

function getItemMemory(item) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.getBytesInUse(item, function (value) {
            resolve(value)
        })
    })
}

var error = chrome.runtime.lastError
if (error) {
    clearAlldata()
}

getCompanyData(company, categoryName)

let busyflag = 0
let queue = []
chrome.storage.onChanged.addListener(function (changes, namespace) {
    busyflag = 1
    for (var key in changes) {
        // var storageChange = changes[key];
        // console.log('Storage key "%s" in namespace "%s" changed. ' +
        //     'Old value was "%s", new value is "%s".',
        //     key,
        //     namespace,
        //     storageChange.oldValue,
        //     storageChange.newValue);
        if (key != "chromememory") {
            chrome.storage.local.getBytesInUse(key, function (value) {
                queue.push(value)
            })
        }
    }
})

function saveChromeMemory(value) {
    chrome.storage.local.get(["chromememory"], function (totalmemory) {
        let t = value
        // console.log(totalmemory)
        if (totalmemory.chromememory) {
            t = totalmemory.chromememory + value
        }
        // console.log(t)
        chrome.storage.local.set({ "chromememory": t }, function () {
            chrome.storage.local.get(["chromememory"], function(check){
                if (check.chromememory == t) {
                    queue = []
                }
            })
        })
    })
}

var busy = setInterval(function () {
    const reducer = (a, b) => a + b
    if (queue.length != 0) {
        // console.log(queue)
        let value = queue.reduce(reducer)
        saveChromeMemory(value)
        // queue = []
    }
}, 2000)

if (busyflag == 1) {
    clearInterval(busy)
}
