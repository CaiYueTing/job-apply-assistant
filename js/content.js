class helperCard {
    constructor(cname, lawcount, welfare, salary, workhour){
        this.data = {
            domId: "applicant-helper",
            cname: cname,
            lawcount: lawcount,
            welfare: welfare,
            salary: salary,
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
    }
    

    getTemplate() {
        return `
            <div id="${this.data.domId}">
                <div class="helper-container">
                    <div class="helper-title">職位資訊</div>
                    <div class="helper-content">
                        <div class="helper-cantentiner">
                            <div class="helper-law">${this.data.cname}違反${this.data.lawcount}筆勞基法</div>
                            <div class="helper-welfare">${this.data.welfare}</div>
                            <div class="helper-law">${this.data.salary}</div>
                            <div class="helper-law">${this.data.workhour}</div>
                        </div>
                    </div>
                </div>
            </div>`
    }
}

var card = new helperCard("apple", "999", "87", "9", "8")
card.init()