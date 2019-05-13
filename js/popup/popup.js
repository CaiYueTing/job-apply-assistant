var ctx = document.getElementById('storagechart').getContext('2d');
var data = {
    datasets: [{
        data: [5242880, 0],
        backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(90, 100, 255, 0.6)'
        ]
    }],
    labels: [
        'Total memory',
        'Used memory'
    ]
};
var memorychart = initialMemoryChart(ctx, data)

function recordcache() {
    chrome.storage.local.get(["jobCounter"], function (el) {
        var cachecount = document.getElementById("cachecount")
        var c = 0
        if (el.jobCounter) {
            c = el.jobCounter
        }
        cachecount.innerText = c
    })
    chrome.storage.local.get(["chromememory"], function (el) {
        var cachebyte = document.getElementById("cachebyte")
        var c = 0
        if (el.chromememory) {
            c = el.chromememory
        }

        var memory = new Number(c / 1048576)

        cachebyte.innerText = memory.toFixed(4)
        n = c / 5242880
        var num = new Number(n)
        var percentage = document.getElementById("percentage")
        percentage.innerText = num.toFixed(3)
        memorychart = updateChart(memorychart, c)
    })
}

function clearAlldata() {
    chrome.storage.local.clear()
}

function initialMemoryChart(ctx, data) {
    return new Chart(ctx, {
        type: 'doughnut',
        data: data
    })
}

function updateChart(Chart, usedmemory) {
    Chart.data.datasets[0].data[1] = usedmemory
    Chart.update()
    return Chart
}

recordcache()

function numani(start, end, el) {
    let innerstart = start * 1000
    let innerend = end * 1000


    if (innerstart >= innerend) {
        let speed = 10
        let cost = 1
        console.log(innerstart)
        if (innerstart < 100) { cost = 1 }
        if (innerstart < 1000) { cost = 10 }
        if (innerstart < 10000) { cost = 100 }
        if (innerstart <= 100000) { cost = 1000 }
        var interval = setInterval(() => {
            if (innerstart == innerend) {
                clearInterval(interval)
            }

            el.innerText = innerstart / 1000
            innerstart = innerstart - cost
        }, speed)
    }
    if (innerstart <= innerend) {
    }
}

$("#clearcache").click(() => {
    clearAlldata()
    var cachecount = document.getElementById("cachecount")
    var cachebyte = document.getElementById("cachebyte")
    cachecount.innerText = 0
    cachebyte.innerText = 0

    var percentage = document.getElementById("percentage")
    var num = new Number(percentage.innerText)
    var snum = String(num.toFixed(3))
    percentage.innerText = 0.000
    memorychart = updateChart(memorychart, 0)
    // numani(Number(snum), 0, percentage)
})