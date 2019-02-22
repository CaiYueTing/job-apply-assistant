class Salarychart {
    constructor(category){
        this.data = {
            domId: "salarychart",
            category: category,
            len: category.length
        }
        this.backgroundColor = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(90, 100, 255, 0.6)'
        ]
        this.borderColor= [
            'rgba(255, 99, 132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(90, 100, 255, 1)'
        ]
        this.OptionSetting= {
            layout: {
                padding: {
                    top:40
                }
            },
            scales: {
                xAxes : [{   
                    ticks: {
                    suggestedMax: 80000,
                    suggestedMin: 20000,
                    stepSize: 5000
                    
                    }
                }]
            },
            legend: {
                position:"right"
            }
        }
    }

    init() {
        this.createList()
    }

    createList() {
        const template = this.getTemplate()
        const el = $(template)
        $("body").prepend(el)
        
        // this.getChart(0)
    }

    getEl() {
        return $(`#${this.data.domId}`)
    }

    getElName() {
        return this.data.domId
    }

    getClose() {
        return  $(`#${this.data.domId}_close`)
    }
    
    getBackgroundColor() {
        return this.backgroundColor
    }

    getBorderColor() {
        return this.borderColor
    }

    getOptionSetting() {
        return this.OptionSetting
    }
    
    getIndustryDataset(index) {
        const  industry  =  this.getAtTarget(index).target.industry
        let labels = ["資料不足"]
        let right = [0] 
        let left = [0]
        let middle = [0]
        let average = [0]

        if (industry != null) {
            labels = this.initiallabel(industry)
            right = this.initialright(industry)
            left = this.initialleft(industry)
            middle = this.initialmiddle(industry)
            average = this.initialaverage(industry)
        }

        return {
            labels,
            right,
            left,
            middle,
            average
        }
    }
    
    getExpDataset(index) {
        const  exp  =  this.getAtTarget(index).target.exp
        let labels = ["資料不足"]
        let right = [0] 
        let left = [0]
        let middle = [0]
        let average = [0]

        if (exp != null) {
            labels = this.initiallabel(exp)
            right = this.initialright(exp)
            left = this.initialleft(exp)
            middle = this.initialmiddle(exp)
            average = this.initialaverage(exp)
        }

        return {
            labels,
            right,
            left,
            middle,
            average
        }
    }

    getDistrictDataset(index) {
        const  district  =  this.getAtTarget(index).target.district
        let labels = ["資料不足"]
        let right = [0] 
        let left = [0]
        let middle = [0]
        let average = [0]

        if (district != null) {
            labels = this.initiallabel(district)
            right = this.initialright(district)
            left = this.initialleft(district)
            middle = this.initialmiddle(district)
            average = this.initialaverage(district)
        }
        return {
            labels,
            right,
            left,
            middle,
            average
        }
    }

    getAtTarget(index) {
        if (index > this.len){
            return 
        }
        return this.data.category[index]
    }

    initiallabel(tjson) {
        let result = []
        for (let i=0;i<tjson.length;i++) {
            result.push(tjson[i].description)
        }
        return result
    }
    
    initialright(tjson) {
        let result = []
        for (let i=0;i<tjson.length;i++) {
            result.push(tjson[i].right)
        }
        return result
    }
    initialleft(tjson) {
        let result = []
        for (let i=0;i<tjson.length;i++) {
            result.push(tjson[i].left)
        }
        return result
    }
    initialmiddle(tjson) {
        let result = []
        for (let i=0;i<tjson.length;i++) {
            result.push(tjson[i].middle)
        }
        return result
    }
    initialaverage(tjson) {
        let result = []
        for (let i=0;i<tjson.length;i++) {
            result.push(tjson[i].average)
        }
        return result
    }

    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <span id="${this.data.domId}_close">X</span>
                <span id="${this.data.domId}_industry">職位-產業比較</span>
                <span id="${this.data.domId}_exp">職位-經驗比較</span>
                <span id="${this.data.domId}_district">職位-地區比較</span>
                <canvas id="${this.data.domId}myChart" class="salary_chart">
            </div>
        `
    }

}