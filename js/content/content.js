class helperCard {
    constructor(cname, lawcount, welfare, salary, ddp, workhour){
        this.data = {
            domId: "applicant-helper",
            cname: cname,
            lawcount: lawcount,
            welfare: welfare,
            salary: salary,
            ddp: ddp,
            workhour: workhour
        }
    }

    init() {
        this.createCard()
    }

    createCard() {
        const template = this.getTemplate()
        const el = $(template)
        $("body").prepend(el)
        this.getLawItem()
    }

    failCard() {
        const ftemp = this.getFailTemp()
        const el = $(ftemp)
        $("body").prepend(el)
    }

    getEl() {
        return $(`#${this.data.domId}`)
    }
    
    listener() {
        
        const el = this.getEl()
        
        let start = false
        let elStartPoint = {
            x: 0,
            y: 0
        }
        let pStartPoint = {
            x: 0,
            y: 0
        }
        
        el.mousedown(function(e) {
            elStartPoint.x = el.offset().left
            elStartPoint.y = el.offset().top
            pStartPoint.x = e.pageX
            pStartPoint.y = e.pageY
            start = true
        })

        $(window).mouseup(function() {
            start = false
        }).mousemove(function(e) {
            if (!start) {
                return
            }

            let offsetX = e.pageX - pStartPoint.x 
            let offsetY = e.pageY - pStartPoint.y - $(window).scrollTop()
            el.css({
                transform: 'none',
                transition: 'unset',
                right: 'unset',
                left: elStartPoint.x + offsetX,
                top: elStartPoint.y + offsetY
            })
        })

        el.find(".helper-cantentiner").mousemove(function(e) {
            e.stopPropagation()
        })

        if (this.data.lawcount.length > 0){
            $(".helper-law").css({
                color: '#B20000'
            })
        }

    }
    
    showLaw() {
        
    }

    getLawItem() {
        var tr_html = `
            <tr id ="{{id}}">
                <th class="lawtable_location">{{location}}</th>
                <th class="lawtable_publicdate">{{publicdate}}</th>
                <th class="lawtable_dealdate">{{dealdate}}</th>
                <th class="lawtable_govnumber">{{govnumber}}</th>
                <th class="lawtable_law">{{law}}</th>
                <th class="lawtable_description">{{description}}</th>
                <th class="lawtable_ps">{{ps}}</th>
            </tr>
        `

        for (let i=0;i<this.data.lawcount.length;i++){
            var id = "law_list_"+i
            var location = this.data.lawcount[i].location
            var publicdate = this.data.lawcount[i].publicdate
            var dealdate = this.data.lawcount[i].dealdate
            var govnumber = this.data.lawcount[i].govnumber
            var law = this.data.lawcount[i].law
            var description = this.data.lawcount[i].description
            var ps = this.data.lawcount[i].ps

            var current_html = 
                tr_html.replace("{{id}}", id)
                       .replace("{{location}}", location)
                       .replace("{{publicdate}}", publicdate)
                       .replace("{{dealdate}}", dealdate)
                       .replace("{{govnumber}}", govnumber)
                       .replace("{{law}}", law)
                       .replace("{{description}}", description)
                       .replace("{{ps}}", ps)
            $(".law_item").append(current_html)
        }        
    }

    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <div class="helper-container">
                    <div class="helper-title">職位資訊</div>
                    <hr>
                        <div class="helper-cantentiner">
                            <div class="helper-company">${this.data.cname}</div>
                            <div class="helper-law">曾經違反 ${this.data.lawcount.length} 筆勞基法</div>
                            <div class="helper-welfare">本系統福利推薦分數：${this.data.welfare}</div>
                            <div class="helper-welfaredd">佔整體第${this.data.ddp}分位</div>
                            <div class="helper-salary">薪水為：${this.data.salary}</div>
                            <div class="helper-hour">本職位業界平均工時為：${this.data.workhour}小時</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="lawlist">
                <div class="lawlist_header">
                    <div class="lawlist_close">X</div>
                    <div class="lawtable_text">違法法律資訊</div>
                </div>
                <hr>
                <table div class="law_item">
                    <tr>
                        <th class="lawtable_location">主管機關</th>
                        <th class="lawtable_publicdate">公告日期</th>
                        <th class="lawtable_dealdate">處分日期</th>
                        <th class="lawtable_govnumber">處份字號</th>
                        <th class="lawtable_law">違反法規法條</th>
                        <th class="lawtable_description">違反法規內容</th>
                        <th class="lawtable_ps">備註</th>
                    </tr>
                </table>
            </div>
        `
    }

    getFailTemp() {
        return `<div id="${this.data.domId}">
        <div class="helper-container">
            <div class="helper-title">職位資訊</div>
            <hr>
                <div class="helper-cantentiner">
                    抱歉，伺服器沒有反應!
                </div>
            </div>
        </div>
    </div>`
    }
}
