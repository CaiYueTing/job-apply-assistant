class lawlist {
    constructor(law) {
        this.data = {
            domId: "lawlist",
            law: law
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

    getEl() {
        return $(`#${this.data.domId}`)
    }
    getCloseEl() {
        return $(`#${this.data.domId}_close`)
    }

    getLawItem() {
        var tr_html = `
            <tr id ="{{id}}">
                <th class="lawlist_location">{{location}}</th>
                <th class="lawlist_publicdate">{{publicdate}}</th>
                <th class="lawlist_dealdate">{{dealdate}}</th>
                <th class="lawlist_govnumber">{{govnumber}}</th>
                <th class="lawlist_law">{{law}}</th>
                <th class="lawlist_description">{{description}}</th>
                <th class="lawlist_ps">{{ps}}</th>
            </tr>
        `

        for (let i=0;i<this.data.law.length;i++){
            var id = "law_list_"+i
            var location = this.data.law[i].Location
            var publicdate = this.data.law[i].Publicdate
            var dealdate = this.data.law[i].Dealdate
            var govnumber = this.data.law[i].Govnumber
            var law = this.data.law[i].Law
            var description = this.data.law[i].Description
            var ps = this.data.law[i].Ps
            law = law.replace(/\;/g, "<br>")
            description = description.replace(/\;/g, "<br>")
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
            <div class="lawlist_header">
                <div id ="lawlist_close" class="lawlist_close">X</div>
                <div class="lawlist_text">違法法律資訊</div>
            </div>
            <hr class="style_hr">
            <table class="law_item">
                <tr>
                    <th class="lawlist_location">主管機關</th>
                    <th class="lawlist_publicdate">公告日期</th>
                    <th class="lawlist_dealdate">處分日期</th>
                    <th class="lawlist_govnumber">處份字號</th>
                    <th class="lawlist_law">違反法規法條</th>
                    <th class="lawlist_description">違反法規內容</th>
                    <th class="lawlist_ps">備註</th>
                </tr>
            </table>
        </div>`
    }
}