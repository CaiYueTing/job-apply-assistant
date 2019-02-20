class Salarychart {
    constructor(category){
        this.data = {
            domId: "salarychart",
            category: category,
            len: category.length
        }
        this.backgroundColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
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
        return $(`${this.data.domId}`)
    }

    getElName() {
        return this.data.domId
    }
    
    


    getChart(index) {
        // const cate = this.data.category[index]
        // const industry = cate.target.industry
        // console.log(industry)
        // console.log(indDataset)
        const indDataset = this.getIndustryDataset(index)
        
        console.log(indDataset)
        // var ctx = document.querySelector(`#${this.data.domId}mychart`).getContext('2d')
        console.log(ctx)
        // const salarychart = new Chart(ctx, {
        //     type: 'horizontalBar',
        //     data: {
        //         labels: indDataset.labels,
        //         datasets: [
        //             {
        //                 label: "最高薪資",
        //                 data: indDataset.right,
        //                 // backgroundColor: this.backgroundColor,
        //                 // borderColor: this.borderColor
        //             },{
        //                 label: "最低薪資",
        //                 data: indDataset.left,
        //                 // backgroundColor: this.backgroundColor,
        //                 // borderColor: this.borderColor
        //             },{
        //                 label: "中位數薪資",
        //                 data: indDataset.middle,
        //                 // backgroundColor: this.backgroundColor,
        //                 // borderColor: this.borderColor
        //             },{
        //                 label:"平均薪資",
        //                 data: indDataset.average,
        //                 // backgroundColor: this.backgroundColor,
        //                 // borderColor: this.borderColor
        //             },
        //         ]
        //     }
        // })
    
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
                <button id="industrybtn">Industry</button>
                <button id="expbtn">Exp</button>
                <button id="districtbtn">District</button>
            </div>
        `
    }

}