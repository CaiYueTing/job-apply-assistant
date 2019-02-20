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
            'rgba(255, 159, 64, 0.6)'
        ]
        this.borderColor= [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
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
    
    getBackgroundColor() {
        return this.backgroundColor
    }

    getBorderColor() {
        return this.borderColor
    }
    
    getIndustryDataset(index) {
        const  industry  =  this.getAtTarget(index).target.industry
        const labels = this.initiallabel(industry)
        const right = this.initialright(industry)
        const left = this.initialleft(industry)
        const middle = this.initialmiddle(industry)
        const average = this.initialaverage(industry)

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
        const labels = this.initiallabel(exp)
        const right = this.initialright(exp)
        const left = this.initialleft(exp)
        const middle = this.initialmiddle(exp)
        const average = this.initialaverage(exp)

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
        const labels = this.initiallabel(district)
        const right = this.initialright(district)
        const left = this.initialleft(district)
        const middle = this.initialmiddle(district)
        const average = this.initialaverage(district)

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
                <canvas id="${this.data.domId}myChart">
            </div>
        `
    }

}