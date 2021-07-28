const encodeObj2Uri = obj => {
    var str = ''
    Object.keys(obj).map(key => {
        if (str != '') {
            str += '&'
        }
        str += key + '=' + encodeURIComponent(obj[key])
    })
    return str
}

const getCookieValue = key => {
    if (key && key.length > 1) {
        let a_t = ''
        const s_ = document.cookie
            .split('; ')
            .filter(row => row.startsWith(key + '='))
        if (s_ && s_.length > 0) {
            //console.log('found cookie token')
            a_t = s_[0].split('=')[1]
        }
        return a_t
    } else {
        getToken().then(tk => {
            //console.log('getting token: ')
            //console.log(tk)
            document.cookie = 'access_token=' + tk
        })
    }
}

const getToken = async () => {
    //console.log('getToken() running...')
    if (getCookieValue('access_token').length > 10) {
        //console.log('cookie found')
        return getCookieValue('access_token')
    }
    const bod = {
        client_id: process.env.REACT_APP_ICD11_CLIENT_ID,
        client_secret: process.env.REACT_APP_ICD11_CLIENT_SECRET,
        scope: 'icdapi_access',
        grant_type: 'client_credentials',
    }
    const form = new FormData()
    Object.keys(bod).map(bd => {
        form.append(bd, bod[bd])
    })

    // return fetch('https://icd-proxy.vercel.app/new_token', {
    return fetch(
        `https://icd-proxy.vercel.app/new_token/${process.env.REACT_APP_ICD11_CLIENT_ID}/${process.env.REACT_APP_ICD11_CLIENT_SECRET}`,
        {
            method: 'GET', //'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
            },
            // body: new URLSearchParams(form),
        }
    )
        .then(j => j.json())
        .then(response => {
            //// console.log(response);
            if (response && response.access_token) {
                //console.log('token fetch successful')
                document.cookie = 'access_token=' + response.access_token
                document.cookie = 'token_expiry=' + response.expires_in
                return response.access_token
            } else {
                throw response
            }
        })
        .catch(err => {
            //console.log(err)
            //console.log('Error fetching token: ', err)
            throw err
        })
}

const searchIcd = async term => {
    let token = ''
    if (getCookieValue('access_token').length > 30) {
        //console.log('token found in local')
        token = getCookieValue('access_token')
    } else {
        checkToken()
    }
    const searchObj = {
        q: term,
        chapterFilter:
            '10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;01;02;03;04;05;06;07;08;09;',
        subtreesFilter: '',
        includePostcoordination: true,
        useBroaderSynonyms: false,
        useFlexiSearch: false,
    }
    return fetch('https://id.who.int/icd/release/11/2020-09/mms/search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'Accept-Language': 'en',
            'Api-Version': 'v2',
            Authorization: 'Bearer ' + token,
        },
        body: encodeObj2Uri(searchObj),
    })
        .then(r => r.json())
        .then(response => {
            if (response && response.error == false) {
                return response
            } else {
                return { error: true }
            }
        })
        .catch(err => {
            //console.error(err)
        })
}

const checkToken = () => {
    //console.log('checking token...')
    if (
        !getCookieValue('access_token') ||
        getCookieValue('access_token') == ''
        // || ( getCookieValue('access_token') && getCookieValue('access_token').length < 30)
    ) {
        //console.log('Token not found in cookies. Fetching it...')
        getToken().then(t => {
            //console.log('initial token fetch: ' + t)
            if (t && t != undefined && !t.includes('Error')) {
                //// console.log('token ====== ' + getCookieValue('access_token'))
            }
        })
    } else {
        //console.log('token found. Checking expiry...')
        searchIcd('malaria').then(rs => {
            if (!rs || (rs && rs.error != false)) {
                //// console.log('token ====== ' + getCookieValue('access_token'))
            } else {
                getToken().then(c => {
                    //console.log('Token expired. Refreshing...')
                })
            }
        })
    }
}

checkToken()

export { searchIcd, getToken }
