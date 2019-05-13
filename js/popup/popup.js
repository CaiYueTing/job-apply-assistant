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
        cachebyte.innerText = c
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
    console.log("update function")
    return Chart
}

recordcache()

$("#clearcache").click(() => {
    clearAlldata()
    var cachecount = document.getElementById("cachecount")
    var cachebyte = document.getElementById("cachebyte")
    cachecount.innerText = 0
    cachebyte.innerText = 0
    memorychart = updateChart(memorychart, 0)
})