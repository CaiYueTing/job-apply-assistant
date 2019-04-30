export const query = `
    fragment commonFields on Company {
        _id
        authentication
        name
        category
        website
        introduction
        sourcesLinks
        createdAt
        comments
        enableNotify
        authApplication {
            _id
            updatedAt
        }
        jobs {
            _id
            jobTitle
        }
        announcement 
        tags 
        logo 
        businessAddress {
            kind 
            county 
            district 
            detail
        } 
        address 
        website 
        facebook 
        instagram 
        linkedin 
        email 
        taxId 
    } 
    query search ($kind: String $keyword: String $page: Int $limit: Int) {
        searchCompanies(query:{ kind: $kind keyword: $keyword limit: $limit page: $page }) {
            ...commonFields
        }
    }
`