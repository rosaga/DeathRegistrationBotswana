import React, { useEffect, useState, useRef } from 'react'
import { useDataQuery, DataQuery } from '@dhis2/app-runtime'
import { Card, ScreenCover, CircularLoader } from '@dhis2/ui-core'
import { OrganisationUnitTree as Tree } from '@dhis2/ui'
import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab'
import {Modal} from '@material-ui/core'
import './style.css'
import IcdField from './IcdField'
import { EventList } from './EventList'

import * as ECT from '@whoicd/icd11ect'
import '@whoicd/icd11ect/style.css'
import { TextField } from '@material-ui/core'

import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from 'moment'
import { set } from 'date-fns'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: 'id,displayName',
        },
    },
    ou: {
        resource: 'me',
        params: {
            fields: 'organisationUnits',
        },
    },
    counties: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:2',
            fields: 'id,name',
            paging: false,
        },
    },
    subcounties: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:3',
            fields: 'id,name',
            paging: false,
        },
    },
    wards: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:4',
            fields: 'id,name',
            paging: false,
        },
    },
}

export const Main = () => {
    const [ou, setOu] = useState({})
    const [rightOuProceed, setRightOuProceed] = useState(false)
    const [dss0, setDss0] = useState('')
    const [dss1, setDss1] = useState('')
    const [dss2, setDss2] = useState('')
    const [dss3, setDss3] = useState('')
    const [dss3o, setDss3o] = useState('')
    const [dss3b, setDss3b] = useState('')

    const [dod, setDod] = useState('')
    const [tod, setTod] = useState('')
    const [tdod, setTdod] = useState('')
    const [surgereason, setSgrs] = useState('')

    const { loading, error, data } = useDataQuery(query)
    const [showForWomen, setShowForWomen] = useState(true)
    const [showForSurgery, setShowForSurgery] = useState(false)
    const [showForAutopsy, setShowForAutopsy] = useState(false)
    const [showDateInjury, setShowDateInjury] = useState(false)
    const [showExternal, setShowExternal] = useState(false)
    const [showHideAge, setShowHideAge] = useState(false)
    const [showWeek, setShowWeek] = useState(false)
    const [disableDOB, setdisableDOB] = useState(false)
    const [disableAge, setdisableAge] = useState(false)
    const [showPregnancy, setShowPregnancy] = useState(true)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dateOfDeath, setdateOfDeath] = useState('')
    const currentYear = currentDate.getFullYear()
    const [personAge, setPersonAge] = useState(null)
    const [yearOfBirth, setyearOfBirth] = useState('')

    const [status, setStatus] = useState(null)
    const [importSumm, setImportSumm] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [showLoadingOu, setShowLoadingOu] = useState(false)

    const [disableB, setDisableB] = useState(true) //true)
    const [disableC, setDisableC] = useState(true) //true)
    const [disableD, setDisableD] = useState(true) //true)
    const todayDate = new Date
    const date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();

    const [form_Data, setform_Data] = useState({
        IzGNoQq5dYv: { name: 'IzGNoQq5dYv', value: null },
        eventDate: { name: 'eventDate', value: date},
        orgUnit: { name: 'orgUnit', value: null },
        // wVHimT51y1D: { name: 'wVHimT51y1D', value: null },
        PXIfs3j5kRi: { name: 'PXIfs3j5kRi', value: null },
        oanaPaIsqML: { name: 'oanaPaIsqML', value: null },
        // XeC3j1zWX9w: { name: 'XeC3j1zWX9w', value: null },
        // zg3Ao8B2XYi: { name: 'zg3Ao8B2XYi', value: null },
        // gW5JXt1SZjR: { name: 'gW5JXt1SZjR', value: null },
        ZeH4hAZ0u8F: { name: 'ZeH4hAZ0u8F', value: null },
        iDqcFv6MEwf: { name: 'iDqcFv6MEwf', value: null },
        mNZxig1nBxJ: { name: 'mNZxig1nBxJ', value: null },
        Kh9BH81Pyl8: { name: 'Kh9BH81Pyl8', value: null },
        a3WrRImbTpW: { name: 'a3WrRImbTpW', value: null },
        cDDXMyQbEfp: { name: 'cDDXMyQbEfp', value: null },
        sY19LlMnarh: { name: 'sY19LlMnarh', value: null },
        p1YKYrBQfSI: { name: 'p1YKYrBQfSI', value: null },
        HLz5JzDIYRt: { name: 'HLz5JzDIYRt', value: null },
        BanAJegHc0k: { name: 'BanAJegHc0k', value: null },
        RTEVzs21nqd: { name: 'RTEVzs21nqd', value: null },
        UVqRxqGzrDY: { name: 'UVqRxqGzrDY', value: null },
        k8BKwL217el: { name: 'k8BKwL217el', value: null },
        CYTNDeUsOCN: { name: 'CYTNDeUsOCN', value: null },
        QB8pQSMZ40J: { name: 'QB8pQSMZ40J', value: null },
        PL3SnBKo88Z: { name: 'PL3SnBKo88Z', value: null },
        c3zySf043kd: { name: 'c3zySf043kd', value: null },
        mD29VHHNvWm: { name: 'mD29VHHNvWm', value: null },
        TD583hBavpu: { name: 'TD583hBavpu', value: null },
        P3T91v9vSt6: { name: 'P3T91v9vSt6', value: null },
        hhxWpMm03qv: { name: 'hhxWpMm03qv', value: null },
        Scw5g4dHoHT: { name: 'Scw5g4dHoHT', value: null },
        v7NdoI3fDrY: { name: 'v7NdoI3fDrY', value: null },
        mE44Kk0ejOS: { name: 'mE44Kk0ejOS', value: null },
        DhQsDwtA04Q: { name: 'DhQsDwtA04Q', value: null },
        jLBk4NF0RjX: { name: 'jLBk4NF0RjX', value: null },
        tqPtsB22God: { name: 'tqPtsB22God', value: null },
        OlgJDc9wRMa: { name: 'OlgJDc9wRMa', value: null },
        yVSZuLhN47s: { name: 'yVSZuLhN47s', value: null },
        ZN3TL62Xv3A: { name: 'ZN3TL62Xv3A', value: null },
        vj0QDfT9ESR: { name: 'vj0QDfT9ESR', value: null },
        r071LCYIww8: { name: 'r071LCYIww8', value: null },
        aaIqpHivlNV: { name: 'aaIqpHivlNV', value: null },
        xUy8zB9k4HO: { name: 'xUy8zB9k4HO', value: null },
        RZdHJ7AsigH: { name: 'RZdHJ7AsigH', value: null },
        AN1VGBLg1Od: { name: 'AN1VGBLg1Od', value: null },
        aBydCIl6woS: { name: 'aBydCIl6woS', value: null },
        niaMOT08ewW: { name: 'niaMOT08ewW', value: null },
        Zm2Qm6KpNWx: { name: 'Zm2Qm6KpNWx', value: null },
        BWFJRINjXU8: { name: 'BWFJRINjXU8', value: null },
        dhH5lBbOPyM: { name: 'dhH5lBbOPyM', value: null },
        jUIW1n2DW9V: { name: 'jUIW1n2DW9V', value: null },
        y9rWPTmS8jt: { name: 'y9rWPTmS8jt', value: null },
        goZ721JmBLH: { name: 'goZ721JmBLH', value: null },
        poHSwg2GpT2: { name: 'poHSwg2GpT2', value: null },
        aCtCWmLNCxm: { name: 'aCtCWmLNCxm', value: null },
        bCpFo8joXJP: { name: 'bCpFo8joXJP', value: null },
        GTqUAduIVOR: { name: 'GTqUAduIVOR', value: null },
        kQGwhGDy14j: { name: 'kQGwhGDy14j', value: null },
        pt9YwpkelVi: { name: 'pt9YwpkelVi', value: null },
        YHyhGDb4Tgu: { name: 'YHyhGDb4Tgu', value: null },
        Dg9KxifFWiY: { name: 'Dg9KxifFWiY', value: null },
        Ud7yiLxC9aI: { name: 'Ud7yiLxC9aI', value: null },
        u48lKYaMoY8: { name: 'u48lKYaMoY8', value: null },
        RNCB4DzrqHt: { name: 'RNCB4DzrqHt', value: null },
        X5kw9icuOUW: { name: 'X5kw9icuOUW', value: null },
        dWNwzvMjAjh: { name: 'dWNwzvMjAjh', value: null },
        rTsewlB9gH8: { name: 'rTsewlB9gH8', value: null },
    })

    const abcde = ['a','b','c','d']
    const [editicd1Val, setEditICD1val] = useState(false)
    const [icd1Val, setICD1val] = useState({
        "title": form_Data['p1YKYrBQfSI']?.value,
        "code": form_Data['HLz5JzDIYRt']?.value
    })
    const [editicd2Val, setEditICD2val] = useState(false)
    const [icd2Val, setICD2val] = useState({
        "title": form_Data['k8BKwL217el']?.value,
        "code": form_Data['CYTNDeUsOCN']?.value
    })
    const [editicd3Val, setEditICD3val] = useState(false)
    const [icd3Val, setICD3val] = useState({
        "title": form_Data['mD29VHHNvWm']?.value,
        "code": form_Data['TD583hBavpu']?.value
    })
    const [editicd4Val, setEditICD4val] = useState(false)
    const [icd4Val, setICD4val] = useState({
        "title": form_Data['Scw5g4dHoHT']?.value,
        "code": form_Data['v7NdoI3fDrY']?.value
    })
    const [editicd4bVal, setEditICD4bval] = useState(false)
    const [icd4bVal, setICD4bval] = useState({
        "title": form_Data['aaIqpHivlNV']?.value,
        "code": form_Data['aaIqpHivlNV']?.value
    })
    const [editicd5Val, setEditICD5val] = useState(false)
    const [icd5Val, setICD5val] = useState({
        "title": form_Data['yVSZuLhN47s']?.value,
        "code": form_Data['ZN3TL62Xv3A']?.value
    })


    const formRef = useRef(null)
    const [orc, setOrc] = useState(form_Data['OlgJDc9wRMa']?.value || "")

    const [pastEvent, setPastEvent] = useState('')
    const [editing, setEditing] = useState(false)
    const [greenLightEvent, setGreenLightEvent] = useState(false)
    const [org_unit, setOrgUnit] = useState('')

    const [past_Data, setPast_Data] = useState([])

    let [sub_cts, setSubCts] = useState([])
    let [wds, setWds] = useState([])

    /////
    // const configure_icd = () => {
    // console.log('configuring ICD for ',name);
    try {
        ECT.Handler.configure(
            {
                apiServerUrl: 'https://id.who.int',
                apiSecured: true,
                // icdMinorVersion: "2019-08" ,
                // icdLinearization: "mms",
                language: 'en',
                sourceApp: 'RMS - Medical Certificate of Cause of Death',
                wordsAvailable: false,
                chaptersAvailable: true,
                flexisearchAvailable: true,
                autoBind: false,
                height: '59vh',
            },
            {
                selectedEntityFunction: selectedEntity => {
                    // console.log(selectedEntity)
                    // setResult(selectedEntity)
                    // run_callback()
                    icdListener(selectedEntity)
                },
                getNewTokenFunction: async () => {
                    //console.log('getting new token ...')
                    const url = `${process.env.REACT_APP_TOKEN_URL}/${process.env.REACT_APP_ICD11_CLIENT_ID}/${process.env.REACT_APP_ICD11_CLIENT_SECRET}`
                    try {
                        const response = await fetch(url)
                        const result = await response.json()
                        const token = result.access_token
                        return token
                    } catch (e) {
                        //console.log('Error during the request')
                    }
                },
            }
        )
    } catch (e_rr) {
        //console.log('error configuring ICD: ', e_rr)
    }
    // }
    /////
    let root_url = window.location.href.split('/api/apps/')[0] + '/api/'
    const req_headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
    if (process.env.REACT_APP_ENV == 'dev') {
        root_url = process.env.REACT_APP_DEV_API_URL
        req_headers['Authorization'] =
            'Basic ' +
            Buffer.from(
                process.env.REACT_APP_DHIS_USER +
                    ':' +
                    process.env.REACT_APP_DHIS_PASS
            ).toString('base64')
    }
    const processSubmit = (fData, isDelete) => {
        let u_rl = `${root_url}events`
        if (editing) {
            u_rl += '/' + pastEvent
        }
        if(isDelete === true){
            // setSubmitting(true)
            if( window.confirm('Are you sure you want to delete this event '+(pastEvent || "")+'?') ){
                setGreenLightEvent(false)
                setEditing(false)
                fetch(u_rl, {
                    method: 'DELETE',
                    headers: req_headers
                }).then(r=>r.json).then(r_=>{
                    //console.log(r_)
                    setSubmitting(false)
                    setStatus({status: 'success', message: 'Event deleted sucessfully', description: JSON.stringify(r_) || ""})
                }).catch(e=>{
                    setSubmitting(false)
                    setStatus({status: 'error', message: 'There was a problem deleting this event. Please refresh and try again', description: e?.message || JSON.stringify(e) || ""})
                    console.error(e)
                })
            }
            return true
        }
        setSubmitting(true)
        const payload = {
            dataValues: [],
            storedBy: data.me.id,
            orgUnit: ou.id,
            eventDate: new Date().toISOString(),
            completedDate: new Date().toISOString(),
            status: 'COMPLETED',
            program: 'gV8wHjt5Z9O',
        }
        // delete fData.eventDate
        delete fData.orgUnit
        Object.keys(fData).map(fd => {
            payload['dataValues'].push({
                dataElement: fd,
                value: fData[fd].value,
            })
        })
        //console.log(JSON.stringify(payload))

        fetch(u_rl, {
            method: (editing ? 'PUT' : 'POST'),
            headers: req_headers,
            body: JSON.stringify(payload),
        })
            .then(j => j.json())
            .then(rsp => {
                setSubmitting(false)
                if (rsp.importSummaries && rsp.importSummaries.length > 0) {
                    let str = ''
                    rsp.importSummaries.map(r_ => {
                        str += JSON.stringify(r_.importCount + ', ')
                    })
                    setImportSumm(str)
                }

                if (rsp.status && rsp.status == 'OK' && rsp.message.includes('successful')) {
                    setStatus({
                        status: 'success',
                        message: 'Event saved successfully',
                        description: '',
                    })
                    if(editing){
                        setEditing(false)
                    }
                    setGreenLightEvent(
                        false
                    )
                    setform_Data({})
                    setTimeout(() => {
                        if(window && window.location) window.location.reload()
                    }, 4000);
                    let ims = ''
                    rsp.response.importSummaries.map(ips => {
                        ims +=
                            ips.status +
                            ': ' +
                            JSON.stringify(ips.importCount) +
                            ' \n (' +
                            ips.reference +
                            ') \n'
                    })
                    setImportSumm(ims)
                } else {
                    let conflicts = ''
                    if (rsp.response.importSummaries.length > 0) {
                        rsp.response.importSummaries.map(r_ => {
                            conflicts += r_.description
                            if (rsp.response.importSummaries.conflicts) {
                                rsp.response.importSummaries.conflicts.map(
                                    c_ => {
                                        conflicts +=
                                            '\n ' +
                                            c_.object +
                                            ': (' +
                                            c_.value.split('_').join(' ') +
                                            ')\n'
                                    }
                                )
                            }
                            conflicts += '\n'
                        })
                    }
                    setStatus({
                        status: 'error',
                        message:
                            rsp['httpStatus'] +
                            '(' +
                            rsp['httpStatusCode'] +
                            '): Problem saving this event',
                        description:
                            rsp.message ||
                            '' + '. <br/> ' + rsp.importSummaries.description ||
                            '' + '\n' + conflicts,
                    })
                    setGreenLightEvent(
                        false
                    )
                    let ims
                    rsp.response.importSummaries.map(ips => {
                        ims +=
                            ips.status +
                            ': ' +
                            ips.description +
                            '\n' +
                            JSON.stringify(ips.importCount) +
                            '\n'
                    })
                    console.error(JSON.stringify(rsp, '', 1))
                }
            })
            .catch(err => {
                console.error(err)
                setSubmitting(false)
                setStatus({
                    status: 'error',
                    message: 'Problem saving this event',
                    description:
                        'Please check that you have filled all the fields below. \n ' +
                            err.statusText || '',
                })
                console.error(JSON.stringify(err, '', 1))
            })
    }

    const getOUdescs = (ou_id, levelToGet) => {
        console.log(`getOUdescs(${ou_id}, ${levelToGet})`);
        const ur_l = `${root_url}organisationUnits/${ou_id}.json?includeChildren=true&fields=id,name&paging=false`
        return fetch(ur_l, { headers: req_headers })
            .then(js => js.json())
            .then(rspn => {
                if (rspn) {
                    if(levelToGet=='subcounties'){
                        setSubCts(rspn?.organisationUnits)
                    }else if(levelToGet=='wards'){
                        setWds(rspn?.organisationUnits)
                    }
                } else {
                    throw {
                        error: true,
                        message: 'error fetching ou descendants',
                        err: rspn,
                    }
                }
            })
            .catch(err => {
                //console.log('error fetching ou descendants: ')
                //console.log(err)
            })
    }

    const hideShowForWomenForm = bool => {
        setShowForWomen(bool)
    }
    const hideShowForSurgery = bool => {
        setShowForSurgery(bool)
    }
    const hideShowForAutopsy = bool => {
        setShowForAutopsy(bool)
    }
    const hideShowDateInjury = bool => {
        setShowDateInjury(bool)
    }
    const hideShowExternal = bool => {
        setShowExternal(bool)
    }
    const hideShowWeek = bool => {
        setShowWeek(bool)
    }
    const hideShowAge = bool => {
        setShowHideAge(bool)
    }
    const hideShowPregnancy = bool => {
        setShowPregnancy(bool)
    }
    const disabledob = bool => {
        setdisableDOB(false)
    }
    const handledisableage = bool => {
        setdisableAge(false)
    }
    const hideShowB = bool => {
        setDisableB(bool)
    }
    const hideShowC = bool => {
        setDisableC(bool)
    }
    const hideShowD = bool => {
        setDisableD(bool)
    }
    const updateValue = val => {
        if (val.target.value === 'Male' && val.target.name === 'a3WrRImbTpW') {
            hideShowForWomenForm(false)
        } else if (
            val.target.name === 'a3WrRImbTpW' &&
            val.target.val != 'Male'
        ) {
            hideShowForWomenForm(true)
        }
        if (val.target.name === 'vj0QDfT9ESR' && val.target.value === 'Yes') {
            hideShowForSurgery(true)
        } else if (
            val.target.name === 'vj0QDfT9ESR' &&
            val.target.value != '1'
        ) {
            hideShowForSurgery(false)
        }
        if (val.target.name === 'xUy8zB9k4HO' && val.target.value === '1') {
            hideShowForAutopsy(true)
        } else if (
            val.target.name === 'xUy8zB9k4HO' &&
            val.target.value != '1'
        ) {
            hideShowForAutopsy(false)
        }
        if (
            (val.target.name === 'Zm2Qm6KpNWx' &&
                val.target.value === 'Disease') ||
            val.target.value === 'Legal Intervention'
        ) {
            hideShowDateInjury(false)
        } else if (
            (val.target.name === 'Zm2Qm6KpNWx' &&
                val.target.value === 'Accident') ||
            val.target.value === 'Intentional Self Harm' ||
            val.target.value === 'Assault' ||
            val.target.value === 'Could not be determined' ||
            val.target.value === 'War'
        ) {
            hideShowDateInjury(true)
        }
        if (val.target.name === 'BWFJRINjXU8' && val.target.checked === true) {
            hideShowExternal(true)
        } else if (
            val.target.name === 'BWFJRINjXU8' &&
            val.target.checked === false
        ) {
            hideShowExternal(false)
        }
        if (val.target.name === 'YHyhGDb4Tgu' && val.target.value != '1') {
            // hideShowWeek(true)
            hideShowPregnancy(false)
        } else if (
            val.target.name === 'YHyhGDb4Tgu' &&
            val.target.value === '1'
        ) {
            hideShowPregnancy(true)
        }
        if (val.target.name === 'sY19LlMnarh' && val.target.value != '') {
            const deathDate = val.target.value
            setdateOfDeath(deathDate)
        }

        if (val.target.name === 'mNZxig1nBxJ' && val.target.value != '') {
            const datevalue = val.target.value

            const slicedYear = datevalue.slice(0, 4)
            const age = currentYear - slicedYear
            handledisableage(true)
            setPersonAge(age)
            setyearOfBirth(datevalue)
            if (age < 1) {
                hideShowAge(true)
            } else if (age >= 1) hideShowAge(false)
            const newObj7 = {}
            newObj7['Kh9BH81Pyl8'] = {}
            newObj7['Kh9BH81Pyl8'].name = 'Kh9BH81Pyl8'
            newObj7['Kh9BH81Pyl8'].value = parseInt(age)
            setform_Data({ ...form_Data, ...newObj7 })
        } else if(val.target.name === 'mNZxig1nBxJ' && val.target.value === '') {
            handledisableage(false)
        }
        if (val.target.name === 'Kh9BH81Pyl8' && disableAge === false) {
            const age = parseInt(val.target.value)
            setPersonAge(age)
            if (age < 1) {
                hideShowAge(true)
            } else if (age >= 1) hideShowAge(false)
            const newObj37 = {}
            newObj37['Kh9BH81Pyl8'] = {}
            newObj37['Kh9BH81Pyl8'].name = 'Kh9BH81Pyl8'
            newObj37['Kh9BH81Pyl8'].value = parseInt(age)
            setform_Data({ ...form_Data, ...newObj37 })
            const yearofbirth = (currentYear - age).toString()
            const dateofbirth = yearofbirth + '-06-15'
            setyearOfBirth(dateofbirth)
            const newObj23 = {}
            newObj23['mNZxig1nBxJ'] = {}
            newObj23['mNZxig1nBxJ'].name = 'mNZxig1nBxJ'
            newObj23['mNZxig1nBxJ'].value = dateofbirth
            setform_Data({ ...form_Data, ...newObj23 })
        }
        if (val.target.name === 'Kh9BH81Pyl8') {
            disabledob(true)
        }
        if (val.target.name === 'UVqRxqGzrDY' && val.target.value != '') {
            hideShowB(false)
        }
        if (val.target.name === 'c3zySf043kd' && val.target.value != '') {
            hideShowC(false)
        }
        if (val.target.name === 'hhxWpMm03qv' && val.target.value != '') {
            hideShowD(false)
        }

        if (val.target && val.target != undefined && val.target != null) {
            const newObj12 = {}
            newObj12[val.target.name] = {}
            newObj12[val.target.name].name = val.target.name
            newObj12[val.target.name].value = val.target.value
            setform_Data({ ...form_Data, ...newObj12 })
        } else {
            const newObj59 = {}
            newObj59[val.name] = {}
            newObj59[val.name].name = val.name
            newObj59[val.name].value = val.value
            setform_Data({ ...form_Data, ...newObj59 })
        }
        return true
    }

    const updateICDval = val => {
        //console.log(`updateICDval( ${JSON.stringify(val)} )`);
        if (val.target && val.target != undefined && val.target != null) {
            let newObj = {}
            newObj[val.target.name] = {}
            newObj[val.target.name].name = val.target.name
            newObj[val.target.name].value = val.target.value
            updateValue(val)
            setform_Data({ ...form_Data, ...newObj })
        } else {
            let newObj99 = {}
            newObj99[val.name] = {}
            newObj99[val.name].name = val.name
            newObj99[val.name].value = val.value
            updateValue({target: val})
            setform_Data({ ...form_Data, ...newObj99 })
        }
        return true
    }

    const icdListener = result => {
        // console.log(`icdListener( ${JSON.stringify(result)} )`)
        const fds = [
            { field: 'p1YKYrBQfSI', codeField: 'HLz5JzDIYRt' },
            { field: 'k8BKwL217el', codeField: 'CYTNDeUsOCN' },
            { field: 'mD29VHHNvWm', codeField: 'TD583hBavpu' },
            { field: 'Scw5g4dHoHT', codeField: 'v7NdoI3fDrY' },
            { field: 'aaIqpHivlNV', codeField: 'aaIqpHivlNV' },
            { field: 'yVSZuLhN47s', codeField: 'ZN3TL62Xv3A' },
        ]
        fds.map((f_d, x)=>{
            if(result.iNo==f_d.field){
                let newObj__ = {}
                newObj__[f_d.field] = {}
                newObj__[f_d.field].name = f_d.field
                newObj__[f_d.field].value = result.title

                let newObj_x = {}
                newObj_x[f_d.codeField] = {}
                newObj_x[f_d.codeField].name = f_d.codeField
                newObj_x[f_d.codeField].value = result.code
                // console.log('newObj_x: '+ JSON.stringify(newObj_x) );
                setform_Data({ ...form_Data, ...newObj_x, ...newObj__  })

                ECT.Handler.clear(f_d.field)
            }
            if(x+1==1) setEditICD1val(false)
            if(x+1==2) setEditICD2val(false)
            if(x+1==3) setEditICD3val(false)
            if(x+1==4) setEditICD4val(false)
            if(x+1==5) setEditICD4bval(false)
            if(x+1==6) setEditICD5val(false)
        })
    }

    const checkLvl = () => {
        if (ou && ou.id) {
            // if (process.env.REACT_APP_ENV == 'dev') {
            //     setRightOuProceed(true)
            //     return
            // }
            fetch(
                `${root_url}organisationUnits/${ou.id}.json?fields=id,level`,
                { headers: req_headers }
            )
                .then(js => js.json())
                .then(rspn => {
                    setRightOuProceed(false)
                    if (parseFloat(rspn.level) > 4) {
                        setOrgUnit(rspn.id)
                        setRightOuProceed(true)
                    } else {
                        setRightOuProceed(false)
                    }
                    setShowLoadingOu(false)
                })
                .catch(err => {
                    //console.log('error checking ou level: ')
                    //console.log(err)
                    setOrgUnit('')
                    setRightOuProceed(false)
                })
        } else {
            setRightOuProceed(false)
            setShowLoadingOu(false)
        }
    }

    const editPastEvent = ev_id => {
        setSubmitting(true)

        if (true) {
            //fetch past event
            const url = `${root_url}events/query.json?program=${'gV8wHjt5Z9O'}&orgUnit=${org_unit}&paging=false&programStage=fvF9K36GKeP&totalPages=true&includeAllDataElements=true&order=created:desc&event=${ev_id}`
            fetch(url, { headers: req_headers })
                .then(j => j.json())
                .then(result => {
                    setSubmitting(false)
                    const pd = []

                    result.headers.map((hd, hd_ky) => {
                        if(result && result.rows && result.rows.length>0){
                            Object.keys(form_Data).map(fd=>{
                                if(fd===hd.name){
                                        let newObj_i = {}
                                        newObj_i[hd.name] = {}
                                        newObj_i[hd.name].name = hd.name
                                        newObj_i[hd.name].value = result.rows[0][hd_ky]
                                        setform_Data({ ...form_Data, ...newObj_i })
                                }
                            })
                            pd.push({
                                name: hd.name,
                                value: result.rows[0][hd_ky],
                            })
                        }
                    })
                    setPast_Data(pd)
                }).then(rt=>{
                    //console.log(`ready to run_Hist()`)
                })
                .catch(err => {
                    setSubmitting(false)
                    setGreenLightEvent(false)
                    const st = {
                        status: 'error',
                        message:
                            'There was a problem loading this past event. Refresh & try again. \n' +
                            (err.message ? err.message : ''),
                    }
                    console.error(err)
                    console.error(st)
                    setStatus(st)
                })
            //fetch past event
        }
    }

    const run_Hist = () => {
        setTimeout(() => {
            if(editing && past_Data && past_Data.length>0){
                past_Data.map(pd_=>{
                    Object.keys(form_Data).map(fd_=>{
                        if(fd_==pd_.name){
                            let nu_Obj = {}
                            nu_Obj[fd_] = {}
                            nu_Obj[fd_].name = fd_
                            nu_Obj[fd_].value = past_Data.find(l_=>l_.name==fd_)?.value || null
                            setform_Data({...form_Data, ...nu_Obj})
                        }
                    })
                })
            }
        }, 3000);
    }

    useEffect(() => {
        ///do sth
        return () => {}
    }, [
        icd1Val,
        icd2Val,
        icd3Val,
        icd4Val,
        icd4bVal,
        icd5Val,
        org_unit,
        pastEvent,
    ])

    useEffect(() => {
        let mt=true
        if(mt){
            run_Hist()
        }
        return () => {
            mt=false
        }
    }, [editing, past_Data])
    useEffect(() => {  
        updateValue(
            
            {target: {
                name: "mNZxig1nBxJ",
                value: yearOfBirth
            }}
        )
        }, [yearOfBirth]);
    useEffect(() => {  
        updateValue(
            
            {target: {
                name: "Kh9BH81Pyl8",
                value: personAge
            }}
        )
        }, [personAge]);
    
    if (loading || submitting)
        return (
            <ScreenCover>
                <CircularLoader />
            </ScreenCover>
        )

    if (error) return <Alert severity="error">{error.message}</Alert>
    return (
        <div>
            <main id="main" className="flex">
                <aside className="flex flex-col">
                    <label>Pick an organisation unit</label>
                    <Tree
                        name="Root org unit"
                        roots={data.ou.organisationUnits[0].id}
                        onChange={ev => {
                            setShowLoadingOu(true)
                            setOu(ev)
                            checkLvl()
                        }}
                    />
                    {!rightOuProceed && process.env.REACT_APP_ENV == 'dev' && (
                        <div className="flex flex-col gap-1">
                            <button
                                className="button"
                                onClick={er => {
                                    setShowLoadingOu(true)
                                    setOu({
                                        id: 'agoZZYNNVZG',
                                        name: 'Kapkomoi Dispensary',
                                    })
                                    checkLvl()
                                }}
                            >
                                Kapkomoi Disp
                            </button>
                            <button
                                className="button"
                                onClick={er => {
                                    setShowLoadingOu(true)
                                    setOu({
                                        id: 'mXka8EGlJtk',
                                        name: 'Kaptorokwa Dispensary',
                                    })
                                    checkLvl()
                                }}
                            >
                                Kaptorokwa Disp
                            </button>
                        </div>
                    )}
                </aside>
                <main className="main">
                    {status && (
                        <div className="w-full my-1em">
                            <Alert severity={status.status}>
                                <AlertTitle>{status.message}</AlertTitle>
                                {status.description}
                            </Alert>
                        </div>
                    )}
                    {importSumm && (
                        <Alert severity="info">
                            <AlertTitle>Import summary</AlertTitle>
                            {importSumm}
                        </Alert>
                    )}
                    <Card className="padded-card">
                        <div className="w-full flex flex-row items-center justify-content-center gap-2em">
                            <div className="grow-1 w-full">
                                <h1 className="br-3" style={{ padding: '6px' }}>
                                    {process.env.REACT_APP_ENV != 'dev' ? "Medical Certificate of the Cause of Death" : 'DHIS2 App'}
                                </h1>
                                {/* {editing && <h3 className="h3">Editing {pastEvent}</h3>} */}
                            </div>
                            {!greenLightEvent && (
                                <button
                                    className="btn primary text-lg shrink-1 p-9"
                                    style={{ whiteSpace: 'nowrap' }}
                                    onClick={e_ => {
                                        setGreenLightEvent(true)
                                        setPast_Data([])
                                        setStatus(null)
                                    }}
                                    disabled={!rightOuProceed}
                                >
                                    Add Event
                                </button>
                            )}
                            {greenLightEvent && (
                                <button
                                    className="btn bg-white text-black text-lg shrink-1 p-9"
                                    style={{ whiteSpace: 'nowrap' }}
                                    onClick={e_ => {
                                        setGreenLightEvent(false)
                                        setEditing(false)
                                        setStatus(null)
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <hr style={{ color: '#f0f0ff' }} />

                        {!rightOuProceed ? (
                            <center>
                                {showLoadingOu ? (
                                    <CircularLoader />
                                ) : (
                                    <Alert severity="info">
                                        Please pick a facility / community unit
                                        to proceed
                                    </Alert>
                                )}
                            </center>
                        ) : (
                            <>
                                {!greenLightEvent ? (
                                    <>
                                        {org_unit && org_unit.length > 1 && (
                                            <EventList
                                                ou={ou.id}
                                                root_url={root_url}
                                                req_headers={req_headers}
                                                editEvent={r => {
                                                    setGreenLightEvent(true)
                                                    setPastEvent(r)
                                                    setEditing(true)
                                                    setStatus(null)
                                                    // setTimeout(() => {
                                                        if (r) {
                                                            editPastEvent(r)
                                                        }
                                                    // }, 2000);
                                                }}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <form id="f_orm" method="dialog">
                                        <div className="section my-2 py-5 pb-0">
                                            <div className="container-fluid">
                                                <div className="row px-3 justify-content-center">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <h3 className="h3">
                                                                    Part 1:
                                                                    Demographics
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="case_no">
                                                                        Death
                                                                        Notification
                                                                        No.
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'IzGNoQq5dYv').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'IzGNoQq5dYv' )?.value
                                                                                }else if(form_Data['IzGNoQq5dYv'] && form_Data['IzGNoQq5dYv']?.value){
                                                                                    return form_Data['IzGNoQq5dYv']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="IzGNoQq5dYv"
                                                                        id="IzGNoQq5dYv"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="case_no">
                                                                        Event
                                                                        date
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        defaultValue={(()=>{
                                                                            if(past_Data.find( pd => pd.name == 'eventDate' ) && editing){
                                                                                return past_Data.find(pd => pd.name == 'eventDate' )?.value.split(' ')[0]
                                                                            }else if(form_Data[ 'eventDate' ] && form_Data[ 'eventDate' ].value){
                                                                                return form_Data[ 'eventDate' ]?.value.split(' ')[0]
                                                                            }else{
                                                                                return ""
                                                                            }
                                                                        })()
                                                                        }
                                                                        value={(()=>{
                                                                            if(editing && past_Data.filter(fr=>fr.name=='eventDate').length>0){
                                                                                return past_Data.find( pd => pd.name == 'eventDate' )?.value.split(' ')[0]
                                                                            }else{

                                                                                return (form_Data[
                                                                                    'eventDate'
                                                                                ] &&
                                                                                    form_Data[
                                                                                        'eventDate'
                                                                                    ]
                                                                                        .value &&
                                                                                    form_Data[
                                                                                        'eventDate'
                                                                                    ].value.split(
                                                                                        ' '
                                                                                    )[0]) ||
                                                                                ''
                                                                            }
                                                                        })()
                                                                        }
                                                                        type="date"
                                                                        className="p-3"
                                                                        name="eventDate"
                                                                        id="eventDate"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="fac">
                                                                        Facility/Site
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'orgUnitName').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'orgUnitName' )?.value
                                                                                }else if(form_Data['orgUnitName'] && form_Data['orgUnitName']?.value){
                                                                                    return form_Data['orgUnitName']?.value
                                                                                }else{
                                                                                    return ou?.displayName
                                                                                }
                                                                            })()
                                                                        }
                                                                        // value={form_Data['orgUnitName'].value || null}
                                                                        name="orgUnitName"
                                                                        id="orgUnitName"
                                                                        placeholder="Pick one on the left bar"
                                                                        disabled
                                                                    />
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="hidden"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'orgUnit').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'orgUnit' )?.value
                                                                                }else if(form_Data['orgUnit'] && form_Data['orgUnit']?.value){
                                                                                    return form_Data['orgUnit']?.value
                                                                                }else{
                                                                                    return ou?.id
                                                                                }
                                                                            })()
                                                                        }
                                                                        value={
                                                                            (form_Data[
                                                                                'orgUnit'
                                                                            ] &&
                                                                                form_Data[
                                                                                    'orgUnit'
                                                                                ]
                                                                                    .value &&
                                                                                form_Data[
                                                                                    'orgUnit'
                                                                                ]
                                                                                    .value) ||
                                                                            ''
                                                                        }
                                                                        name="orgUnit"
                                                                        id="orgUnit"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            {/* <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="fname">
                                                                        Surname
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'wVHimT51y1D').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'wVHimT51y1D' )?.value
                                                                                }else if(form_Data['wVHimT51y1D'] && form_Data['wVHimT51y1D']?.value){
                                                                                    return form_Data['wVHimT51y1D']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        className="p-3 col-md-12"
                                                                        name="wVHimT51y1D"
                                                                        id="wVHimT51y1D"
                                                                    />
                                                                </div>
                                                            </div> */}
                                                            <div className="col-md-12">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="fname">
                                                                        In-Patient File Number
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3 col-md-12"
                                                                        name="PXIfs3j5kRi"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'PXIfs3j5kRi').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'PXIfs3j5kRi' )?.value
                                                                                }else if(form_Data['PXIfs3j5kRi'] && form_Data['PXIfs3j5kRi']?.value){
                                                                                    return form_Data['PXIfs3j5kRi']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        id="PXIfs3j5kRi"
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-md-5">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="fname">
                                                                        Other
                                                                        Names
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3 col-md-12"
                                                                        name="zg3Ao8B2XYi"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'zg3Ao8B2XYi').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'zg3Ao8B2XYi' )?.value
                                                                                }else if(form_Data['zg3Ao8B2XYi'] && form_Data['zg3Ao8B2XYi']?.value){
                                                                                    return form_Data['zg3Ao8B2XYi']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        id="zg3Ao8B2XYi"
                                                                    />
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-6">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="county">
                                                                        Usual
                                                                        residence
                                                                        (county)
                                                                    </label>
                                                                    <Autocomplete
                                                                        size="small"
                                                                        id="pick-county"
                                                                        disableClearable={
                                                                            true
                                                                        }
                                                                        options={
                                                                            data
                                                                                .counties
                                                                                .organisationUnits
                                                                        }
                                                                        getOptionLabel={option =>
                                                                            option &&
                                                                            option.name
                                                                                ? option.name
                                                                                : ''
                                                                        }
                                                                        style={{
                                                                            backgroundColor:
                                                                                'white',
                                                                        }}
                                                                        renderInput={params => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Select a county"
                                                                                variant="outlined"
                                                                                fullWidth
                                                                            />
                                                                        )}
                                                                        defaultValue={() => {
                                                                            let id__ = past_Data.find( pd => pd.name == 'ZeH4hAZ0u8F' )?.value || form_Data['ZeH4hAZ0u8F']?.value
                                                                            if (editing && past_Data.filter( pd => pd.name == 'ZeH4hAZ0u8F' ).length>0 ) {
                                                                                id__ = past_Data.find( pd => pd.name == 'ZeH4hAZ0u8F' )?.value
                                                                            }
                                                                            let r_ef = data.counties.organisationUnits
                                                                            return (
                                                                                r_ef.find(
                                                                                    rl =>
                                                                                        rl.id ==
                                                                                        id__
                                                                                ) ||
                                                                                null
                                                                            )
                                                                        }}
                                                                        onChange={(
                                                                            r,
                                                                            value
                                                                        ) => {
                                                                            if (
                                                                                value
                                                                            ) {
                                                                                updateValue(
                                                                                    {
                                                                                        target: {
                                                                                            name:
                                                                                                'ZeH4hAZ0u8F',
                                                                                            value:
                                                                                                value.name,
                                                                                        },
                                                                                    }
                                                                                )
                                                                                getOUdescs(value.id,'subcounties')
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-6">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="village">
                                                                        Usual
                                                                        residence
                                                                        (village)
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                {
                                                                                    target: {
                                                                                        name:
                                                                                            'oanaPaIsqML',
                                                                                        value: `${ev.target.value
                                                                                            .charAt(
                                                                                                0
                                                                                            )
                                                                                            .toUpperCase()}${ev.target.value.slice(
                                                                                            1
                                                                                        )}`,
                                                                                    },
                                                                                }
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="oanaPaIsqML"
                                                                        id="oanaPaIsqML"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'oanaPaIsqML').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'oanaPaIsqML' )?.value
                                                                                }else if(form_Data['oanaPaIsqML'] && form_Data['oanaPaIsqML']?.value){
                                                                                    return form_Data['oanaPaIsqML']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2"></div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="county">
                                                                        Occupation
                                                                    </label>
                                                                    <select
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'iDqcFv6MEwf').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'iDqcFv6MEwf' )?.value
                                                                                }else if(form_Data['iDqcFv6MEwf'] && form_Data['iDqcFv6MEwf']?.value){
                                                                                    return form_Data['iDqcFv6MEwf']?.value
                                                                                }
                                                                            })()
                                                                        }
                                                                        name="iDqcFv6MEwf"
                                                                        id="iDqcFv6MEwf"
                                                                        className="p-3 selectwo"
                                                                    >
                                                                        <option
                                                                            disabled={
                                                                                true
                                                                            }
                                                                            value=""
                                                                        >
                                                                            Pick
                                                                            one
                                                                        </option>
                                                                        <option value="None">
                                                                            None
                                                                        </option>
                                                                        <option value="Medical Practitioner">
                                                                            Medical
                                                                            Practitioner
                                                                        </option>
                                                                        <option value="Driver">
                                                                            Driver
                                                                        </option>
                                                                        <option value="Mason">
                                                                            Mason
                                                                        </option>
                                                                        <option value="Fabricator">
                                                                            Fabricator
                                                                        </option>
                                                                        <option value="Pilot">
                                                                            Pilot
                                                                        </option>
                                                                        <option value="Teacher">
                                                                            Teacher
                                                                        </option>
                                                                        <option value="Banker">
                                                                            Banker
                                                                        </option>
                                                                        <option value="Accountant">
                                                                            Accountant
                                                                        </option>
                                                                        <option value="Farmer">
                                                                            Farmer
                                                                        </option>
                                                                        <option value="Housewife">
                                                                            Housewife
                                                                        </option>
                                                                        <option value="Merchant">
                                                                            Merchant
                                                                        </option>
                                                                        <option value="Civil Servant">
                                                                            Civil
                                                                            Servant
                                                                        </option>
                                                                        <option value="Student">
                                                                            Student
                                                                        </option>
                                                                        <option value="Other">
                                                                            Other
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="dob">
                                                                        Date of
                                                                        birth
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                {target: {
                                                                                    name: ev.target.name,
                                                                                    value: ev.target.value
                                                                                }}
                                                                            )
                                                                        }}
                                                                        className="p-3"
                                                                        id="mNZxig1nBxJ"
                                                                        name="mNZxig1nBxJ"
                                                                        type="date"
                                                                        maxDate={moment().toDate()}
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'mNZxig1nBxJ').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'mNZxig1nBxJ' )?.value
                                                                                }else if(form_Data['mNZxig1nBxJ'] && form_Data['mNZxig1nBxJ']?.value){
                                                                                    return form_Data['mNZxig1nBxJ']?.value
                                                                                }else{
                                                                                    return yearOfBirth || ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        value={
                                                                            past_Data.find( pd => pd.name == 'mNZxig1nBxJ' )?.value || form_Data['mNZxig1nBxJ']?.value || yearOfBirth
                                                                        }
                                                                        disabled={
                                                                            disableDOB
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="county">
                                                                        Age{' '}
                                                                    </label>
                                                                    <input
                                                                        // min= "-1"
                                                                        // max="120"
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                {target: {
                                                                                    name: ev.target.name,
                                                                                    value: ev.target.value
                                                                                }}
                                                                            )
                                                                        }}
                                                                        type="number"
                                                                        className="p-3"
                                                                        step={0.1}
                                                                        name="Kh9BH81Pyl8"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'Kh9BH81Pyl8').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'Kh9BH81Pyl8' )?.value
                                                                                }else if(form_Data['Kh9BH81Pyl8'] && form_Data['Kh9BH81Pyl8']?.value){
                                                                                    return form_Data['Kh9BH81Pyl8']?.value
                                                                                }else{
                                                                                    return personAge || ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        value={
                                                                            past_Data.find( pd => pd.name == 'Kh9BH81Pyl8' )?.value || form_Data['Kh9BH81Pyl8']?.value || personAge
                                                                        }
                                                                        id="Kh9BH81Pyl8"
                                                                        disabled={
                                                                            disableAge
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-2">
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="sex">
                                                                        Sex
                                                                    </label>
                                                                    <select
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        name="a3WrRImbTpW"
                                                                        id="a3WrRImbTpW"
                                                                        className="p-3 selectwo"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'a3WrRImbTpW').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'a3WrRImbTpW' )?.value
                                                                                }else if(form_Data['a3WrRImbTpW'] && form_Data['a3WrRImbTpW']?.value){
                                                                                    return form_Data['a3WrRImbTpW']?.value
                                                                                }
                                                                            })()
                                                                        }
                                                                    >

                                                                        <option value="">
                                                                        Pick one
                                                                        </option>
                                                                        <option value="Male">
                                                                            Male
                                                                        </option>
                                                                        <option value="Female">
                                                                            Female
                                                                        </option>
                                                                        <option value="Unknown">
                                                                            Unknown
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="pob">
                                                                        Place of
                                                                        birth
                                                                    </label>
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="cDDXMyQbEfp"
                                                                        id="cDDXMyQbEfp"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'cDDXMyQbEfp').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'cDDXMyQbEfp' )?.value
                                                                                }else if(form_Data['cDDXMyQbEfp'] && form_Data['cDDXMyQbEfp']?.value){
                                                                                    return form_Data['cDDXMyQbEfp']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                    />
                                                                </div>
                                                            </div> */}
                                                            <div className="col-md-4">
                                                                <div className="form-group focused">
                                                                    <label htmlFor="tod">
                                                                        Date of
                                                                        death
                                                                    </label>
                                                                    {/* <Datetime */}
                                                                    <input
                                                                        initialValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'sY19LlMnarh').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'sY19LlMnarh' )?.value.split(' ')[1]
                                                                                }else if(form_Data['sY19LlMnarh'] && form_Data['sY19LlMnarh']?.value){
                                                                                    return form_Data['sY19LlMnarh']?.value.split(' ')[1]
                                                                                }else{
                                                                                    return null
                                                                                }
                                                                            })()
                                                                        }
                                                                        onChange={(er)=>{
                                                                           
                                                                            updateValue({
                                                                                target: {
                                                                                    name: 'sY19LlMnarh',
                                                                                    value: er.target.value
                                                                                }
                                                                            })
                                                                        }}
                                                                        type="date"
                                                                        value={(()=>{
                                                                            if(editing && past_Data.filter(fr=>fr.name=='sY19LlMnarh').length>0){
                                                                                return past_Data.find( pd => pd.name == 'sY19LlMnarh' )?.value.split(' ')[0]

                                                                            }else{

                                                                                return (form_Data[
                                                                                    'sY19LlMnarh'
                                                                                ] &&
                                                                                    form_Data[
                                                                                        'sY19LlMnarh'
                                                                                    ]
                                                                                        .value &&
                                                                                    form_Data[
                                                                                        'sY19LlMnarh'
                                                                                    ].value.split(
                                                                                        ' '
                                                                                    )[0]) ||
                                                                                ''
                                                                            }
                                                                        })()}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container-fluid">
                                            <div className="row mb-2 justify-content-md-center">
                                                <div className="col-md-12">
                                                    <div className="col-md-12">
                                                        <h3 className="h3">
                                                            Part 2: Medical Data
                                                        </h3>
                                                    </div>
                                                    <div className="col-md-12 table-responsive">
                                                        <table className="table table-condensed table-bordered frame_a">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        &nbsp;
                                                                    </th>
                                                                    <th></th>
                                                                    <th>
                                                                        Cause of
                                                                        death
                                                                    </th>
                                                                    <th>
                                                                        Code
                                                                    </th>
                                                                    <th
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                    >
                                                                        Time
                                                                        interval
                                                                        from
                                                                        onset to
                                                                        death
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '200px',
                                                                        }}
                                                                    >
                                                                        Report
                                                                        disease
                                                                        or
                                                                        condition
                                                                        directly
                                                                        leading
                                                                        to death
                                                                        on line
                                                                        a
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '30px',
                                                                        }}
                                                                        className="text-bold"
                                                                    >
                                                                        a
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <div
                                                                            className={
                                                                                (
                                                                                    (editing && past_Data.filter(pd=>pd.name=="p1YKYrBQfSI").length<1 && form_Data["p1YKYrBQfSI"]?.value == null) || editicd1Val
                                                                                )
                                                                                // form_Data['p1YKYrBQfSI']?.value ===
                                                                                //     null
                                                                                    ? ''
                                                                                    : 'hidden'
                                                                            }
                                                                        >
                                                                            <IcdField
                                                                                ECT={
                                                                                    ECT
                                                                                }
                                                                                key="__p1YKYrBQfSI"
                                                                                name={
                                                                                    'p1YKYrBQfSI'
                                                                                }
                                                                                defVal={
                                                                                    icd1Val.title || form_Data['p1YKYrBQfSI']?.value
                                                                                }
                                                                                callBack={result => {
                                                                                    ECT.Handler.clear(
                                                                                        result.name
                                                                                    )
                                                                                }}
                                                                            ></IcdField>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                (
                                                                                        (editing && past_Data.filter(pd=>pd.name=="p1YKYrBQfSI").length<1 && form_Data["p1YKYrBQfSI"]?.value == null) || editicd1Val
                                                                                )
                                                                                // form_Data['p1YKYrBQfSI']?.value ===
                                                                                //     null
                                                                                    ? 'hidden'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <input
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                                key={
                                                                                    1
                                                                                }
                                                                                value={
                                                                                    icd1Val.title || form_Data['p1YKYrBQfSI']?.value
                                                                                }
                                                                                name={
                                                                                    'p1YKYrBQfSI'
                                                                                }
                                                                                onClick={ev => {
                                                                                    setform_Data({...form_Data,
                                                                                        ...{'p1YKYrBQfSI': {name:'p1YKYrBQfSI', value: null}}
                                                                                    })
                                                                                    setEditICD1val(true)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            defaultValue={() => {
                                                                                if (
                                                                                    editing &&
                                                                                    past_Data.filter(
                                                                                        pd =>
                                                                                            pd.name ==
                                                                                            'HLz5JzDIYRt'
                                                                                    ).length>0
                                                                                ) {
                                                                                    return past_Data.find(
                                                                                        pd =>
                                                                                            pd.name ==
                                                                                            'HLz5JzDIYRt'
                                                                                    ).value
                                                                                } else if (
                                                                                    form_Data[
                                                                                        'HLz5JzDIYRt'
                                                                                    ]?.value
                                                                                ) {
                                                                                    return form_Data[
                                                                                        'HLz5JzDIYRt'
                                                                                    ]?.value
                                                                                } else {
                                                                                    return dss0 || ""
                                                                                }
                                                                            }}
                                                                            value={
                                                                                form_Data['HLz5JzDIYRt']?.value || past_Data.find(c=>c.name=='HLz5JzDIYRt')?.value || ""
                                                                            }
                                                                            type="text"
                                                                            name="HLz5JzDIYRt"
                                                                            id="HLz5JzDIYRt"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            type="number"
                                                                            defaultValue={
                                                                                (past_Data.find(
                                                                                    pd =>
                                                                                        pd.name ==
                                                                                        'RTEVzs21nqd'
                                                                                ) &&
                                                                                    past_Data.find(
                                                                                        pd =>
                                                                                            pd.name ==
                                                                                            'RTEVzs21nqd'
                                                                                    )
                                                                                        .value) ||
                                                                                form_Data['RTEVzs21nqd']?.value || ""
                                                                            }
                                                                            className="p-3"
                                                                            name="RTEVzs21nqd"
                                                                            id="RTEVzs21nqd"
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            className="p-3 selectwo"
                                                                            name="UVqRxqGzrDY"
                                                                            id="UVqRxqGzrDY"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'UVqRxqGzrDY').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'UVqRxqGzrDY' )?.value
                                                                                    }else if(form_Data['UVqRxqGzrDY'] && form_Data['UVqRxqGzrDY']?.value){
                                                                                        return form_Data['UVqRxqGzrDY']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['UVqRxqGzrDY']?.value
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="Minutes">
                                                                                Minute(s)
                                                                            </option>
                                                                            <option value="Hours">
                                                                                Hour(s)
                                                                            </option>
                                                                            <option value="Days">
                                                                                Day(s)
                                                                            </option>
                                                                            <option value="Weeks">
                                                                                Week(s)
                                                                            </option>
                                                                            <option value="Months">
                                                                                Month(s)
                                                                            </option>
                                                                            <option value="Years">
                                                                                Year(s)
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        className="p-2 align-middle"
                                                                        rowSpan={
                                                                            3
                                                                        }
                                                                        style={{
                                                                            maxWidth:
                                                                                '200px',
                                                                        }}
                                                                    >
                                                                        Report
                                                                        chain of
                                                                        events
                                                                        'due to'
                                                                        (b to d)
                                                                        in order
                                                                        (if
                                                                        applicable)
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '30px',
                                                                        }}
                                                                        className="text-bold"
                                                                    >
                                                                        b
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="k8BKwL217el").length<1 && form_Data["k8BKwL217el"]?.value == null) || editicd2Val
                                                                                // form_Data['k8BKwL217el']?.value ===
                                                                                //     null
                                                                                    ? ''
                                                                                    : 'hidden'
                                                                            }
                                                                        >
                                                                            <IcdField
                                                                                ECT={
                                                                                    ECT
                                                                                }
                                                                                key="__k8BKwL217el"
                                                                                name={
                                                                                    'k8BKwL217el'
                                                                                }
                                                                                defVal={
                                                                                    icd2Val.title || form_Data['k8BKwL217el']?.value
                                                                                }
                                                                                disabled={
                                                                                    disableB
                                                                                }
                                                                                callBack={result => {
                                                                                    ECT.Handler.clear(
                                                                                        result.name
                                                                                    )
                                                                                }}
                                                                            ></IcdField>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="k8BKwL217el").length<1 && form_Data["k8BKwL217el"]?.value == null) || editicd2Val
                                                                                // form_Data['k8BKwL217el']?.value ===
                                                                                //     null
                                                                                    ? 'hidden'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <input
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                                key={
                                                                                    2
                                                                                }
                                                                                name={
                                                                                    'k8BKwL217el'
                                                                                }
                                                                                value={
                                                                                    icd2Val.title || form_Data['k8BKwL217el']?.value
                                                                                }
                                                                                onClick={ev => {
                                                                                    setform_Data({...form_Data,
                                                                                        ...{'k8BKwL217el': {name:'k8BKwL217el', value: null}}
                                                                                    })
                                                                                    setEditICD2val(true)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'CYTNDeUsOCN').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'CYTNDeUsOCN' )?.value
                                                                                    }else if(form_Data['CYTNDeUsOCN'] && form_Data['CYTNDeUsOCN']?.value){
                                                                                        return form_Data['CYTNDeUsOCN']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['CYTNDeUsOCN']?.value || past_Data.find(c=>c.name=='CYTNDeUsOCN')?.value || ""
                                                                            }
                                                                            type="text"
                                                                            name="CYTNDeUsOCN"
                                                                            id="CYTNDeUsOCN"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>

                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            type="number"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'PL3SnBKo88Z').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'PL3SnBKo88Z' )?.value
                                                                                    }else if(form_Data['PL3SnBKo88Z'] && form_Data['PL3SnBKo88Z']?.value){
                                                                                        return form_Data['PL3SnBKo88Z']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            className="p-3"
                                                                            name="PL3SnBKo88Z"
                                                                            id="PL3SnBKo88Z"
                                                                            disabled={
                                                                                disableB
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            className="p-3 selectwo"
                                                                            name="c3zySf043kd"
                                                                            id="c3zySf043kd"
                                                                            style={{
                                                                                maxWidth:
                                                                                    '120px',
                                                                            }}
                                                                            disabled={
                                                                                disableB
                                                                            }
                                                                            value={
                                                                                form_Data['c3zySf043kd']?.value
                                                                            }
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'c3zySf043kd').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'c3zySf043kd' )?.value
                                                                                    }else if(form_Data['c3zySf043kd'] && form_Data['c3zySf043kd']?.value){
                                                                                        return form_Data['c3zySf043kd']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="Minutes">
                                                                                Minute(s)
                                                                            </option>
                                                                            <option value="Hours">
                                                                                Hour(s)
                                                                            </option>
                                                                            <option value="Days">
                                                                                Day(s)
                                                                            </option>
                                                                            <option value="Weeks">
                                                                                Week(s)
                                                                            </option>
                                                                            <option value="Months">
                                                                                Month(s)
                                                                            </option>
                                                                            <option value="Years">
                                                                                Year(s)
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '30px',
                                                                        }}
                                                                        className="text-bold"
                                                                    >
                                                                        c
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                    (editing && past_Data.filter(pd=>pd.name=="mD29VHHNvWm").length<1 && form_Data["mD29VHHNvWm"]?.value == null) || editicd3Val
                                                                                    // form_Data['mD29VHHNvWm']?.value ===
                                                                                    //     null
                                                                                    ? ''
                                                                                    : 'hidden'
                                                                            }
                                                                        >
                                                                            <IcdField
                                                                                ECT={
                                                                                    ECT
                                                                                }
                                                                                key="__mD29VHHNvWm"
                                                                                name={
                                                                                    'mD29VHHNvWm'
                                                                                }
                                                                                defVal={
                                                                                    icd3Val.title || form_Data['mD29VHHNvWm']?.value
                                                                                }
                                                                                disabled={
                                                                                    disableC
                                                                                }
                                                                                callBack={result => {
                                                                                    ECT.Handler.clear(
                                                                                        result.name
                                                                                    )
                                                                                }}
                                                                            ></IcdField>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="mD29VHHNvWm").length<1 && form_Data["mD29VHHNvWm"]?.value == null) || editicd3Val
                                                                                // form_Data['mD29VHHNvWm']?.value ===
                                                                                //     null
                                                                                    ? 'hidden'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <input
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                                name={
                                                                                    'mD29VHHNvWm'
                                                                                }
                                                                                key={
                                                                                    3
                                                                                }
                                                                                value={
                                                                                    icd3Val.title || form_Data['mD29VHHNvWm']?.value
                                                                                }
                                                                                onClick={ev => {
                                                                                    setform_Data({...form_Data,
                                                                                        ...{'mD29VHHNvWm': {name:'mD29VHHNvWm', value: null}}
                                                                                    })
                                                                                    setEditICD3val(true)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'TD583hBavpu').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'TD583hBavpu' )?.value
                                                                                    }else if(form_Data['TD583hBavpu'] && form_Data['TD583hBavpu']?.value){
                                                                                        return form_Data['TD583hBavpu']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['TD583hBavpu']?.value || past_Data.find(c=>c.name=='TD583hBavpu')?.value || ""
                                                                            }
                                                                            type="text"
                                                                            name="TD583hBavpu"
                                                                            id="TD583hBavpu"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>

                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            type="number"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'P3T91v9vSt6').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'P3T91v9vSt6' )?.value
                                                                                    }else if(form_Data['P3T91v9vSt6'] && form_Data['P3T91v9vSt6']?.value){
                                                                                        return form_Data['P3T91v9vSt6']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            className="p-3"
                                                                            name="P3T91v9vSt6"
                                                                            id="P3T91v9vSt6"
                                                                            disabled={
                                                                                disableC
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            className="p-3 selectwo"
                                                                            name="hhxWpMm03qv"
                                                                            id="hhxWpMm03qv"
                                                                            style={{
                                                                                maxWidth:
                                                                                    '120px',
                                                                            }}
                                                                            disabled={
                                                                                disableC
                                                                            }
                                                                            value={
                                                                                form_Data['hhxWpMm03qv']?.value
                                                                            }
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'hhxWpMm03qv').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'hhxWpMm03qv' )?.value
                                                                                    }else if(form_Data['hhxWpMm03qv'] && form_Data['hhxWpMm03qv']?.value){
                                                                                        return form_Data['hhxWpMm03qv']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="Minutes">
                                                                                Minute(s)
                                                                            </option>
                                                                            <option value="Hours">
                                                                                Hour(s)
                                                                            </option>
                                                                            <option value="Days">
                                                                                Day(s)
                                                                            </option>
                                                                            <option value="Weeks">
                                                                                Week(s)
                                                                            </option>
                                                                            <option value="Months">
                                                                                Month(s)
                                                                            </option>
                                                                            <option value="Years">
                                                                                Year(s)
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '30px',
                                                                        }}
                                                                        className="text-bold"
                                                                    >
                                                                        d
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                // form_Data['Scw5g4dHoHT']?.value ===
                                                                                //     null
                                                                                (editing && past_Data.filter(pd=>pd.name=="Scw5g4dHoHT").length<1 && form_Data["Scw5g4dHoHT"]?.value == null) || editicd4Val
                                                                                    ? ''
                                                                                    : 'hidden'
                                                                            }
                                                                        >
                                                                            <IcdField
                                                                                ECT={
                                                                                    ECT
                                                                                }
                                                                                key="__Scw5g4dHoHT"
                                                                                name={
                                                                                    'Scw5g4dHoHT'
                                                                                }
                                                                                defVal={
                                                                                    icd4Val.title || form_Data['Scw5g4dHoHT']?.value
                                                                                }
                                                                                disabled={
                                                                                    disableD
                                                                                }
                                                                                callBack={result => {
                                                                                    ECT.Handler.clear(
                                                                                        result.name
                                                                                    )
                                                                                }}
                                                                            ></IcdField>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="Scw5g4dHoHT").length<1 && form_Data["Scw5g4dHoHT"]?.value == null) || editicd4Val
                                                                                // form_Data['Scw5g4dHoHT']?.value ===
                                                                                //     null
                                                                                    ? 'hidden'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <input
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                                name={
                                                                                    'Scw5g4dHoHT'
                                                                                }
                                                                                key={
                                                                                    4
                                                                                }
                                                                                value={
                                                                                    icd4Val.title || form_Data['Scw5g4dHoHT']?.value
                                                                                }
                                                                                onClick={ev => {
                                                                                    setform_Data({...form_Data,
                                                                                        ...{'Scw5g4dHoHT': {name:'Scw5g4dHoHT', value: null}}
                                                                                    })
                                                                                    setEditICD4val(true)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'v7NdoI3fDrY').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'v7NdoI3fDrY' )?.value
                                                                                    }else if(form_Data['v7NdoI3fDrY'] && form_Data['v7NdoI3fDrY']?.value){
                                                                                        return form_Data['v7NdoI3fDrY']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['v7NdoI3fDrY']?.value || past_Data.find(c=>c.name=='v7NdoI3fDrY')?.value || ""
                                                                            }
                                                                            name="v7NdoI3fDrY"
                                                                            id="v7NdoI3fDrY"
                                                                            type="text"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>

                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            type="number"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'DhQsDwtA04Q').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'DhQsDwtA04Q' )?.value
                                                                                    }else if(form_Data['DhQsDwtA04Q'] && form_Data['DhQsDwtA04Q']?.value){
                                                                                        return form_Data['DhQsDwtA04Q']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            name="DhQsDwtA04Q"
                                                                            id="DhQsDwtA04Q"
                                                                            className="p-3"
                                                                            disabled={
                                                                                disableD
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '120px',
                                                                        }}
                                                                    >
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            className="p-3 selectwo"
                                                                            name="jLBk4NF0RjX"
                                                                            id="jLBk4NF0RjX"
                                                                            style={{
                                                                                maxWidth:
                                                                                    '120px',
                                                                            }}
                                                                            disabled={
                                                                                disableD
                                                                            }
                                                                            value={
                                                                                form_Data['jLBk4NF0RjX']?.value
                                                                            }
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'jLBk4NF0RjX').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'jLBk4NF0RjX' )?.value
                                                                                    }else if(form_Data['jLBk4NF0RjX'] && form_Data['jLBk4NF0RjX']?.value){
                                                                                        return form_Data['jLBk4NF0RjX']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="Minutes">
                                                                                Minute(s)
                                                                            </option>
                                                                            <option value="Hours">
                                                                                Hour(s)
                                                                            </option>
                                                                            <option value="Days">
                                                                                Day(s)
                                                                            </option>
                                                                            <option value="Weeks">
                                                                                Week(s)
                                                                            </option>
                                                                            <option value="Months">
                                                                                Month(s)
                                                                            </option>
                                                                            <option value="Years">
                                                                                Year(s)
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        className="p-2"
                                                                        style={{
                                                                            maxWidth:
                                                                                '200px',
                                                                        }}
                                                                    >
                                                                        State
                                                                        the
                                                                        underlying
                                                                        cause
                                                                    </td>
                                                                    <td
                                                                        className="p-2"
                                                                        colSpan={
                                                                            3
                                                                        }
                                                                    >
                                                                        <select
                                                                            onChange={ev => {
                                                                                const cd = ev.target.value.split(' ')[1]
                                                                                setOrc(cd)
                                                                                updateValue( { target: {name:'OlgJDc9wRMa',value: cd} } )
                                                                                updateValue( { target: {name:'tqPtsB22God',value: ev.target.value}})//.split(' - ')[1]} } )
                                                                            }}
                                                                            name="tqPtsB22God"
                                                                            id="tqPtsB22God"
                                                                            className="p-3"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'tqPtsB22God').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'tqPtsB22God' )?.value
                                                                                    }else if(form_Data['tqPtsB22God'] && form_Data['tqPtsB22God']?.value){
                                                                                        return form_Data['tqPtsB22God']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['tqPtsB22God']?.value
                                                                            }
                                                                        >
                                                                            <option
                                                                                value=""
                                                                                disabled
                                                                            >
                                                                                -
                                                                            </option>
                                                                            {[ { field: 'p1YKYrBQfSI', codeField: 'HLz5JzDIYRt' }, { field: 'k8BKwL217el', codeField: 'CYTNDeUsOCN' }, { field: 'mD29VHHNvWm', codeField: 'TD583hBavpu' }, { field: 'Scw5g4dHoHT', codeField: 'v7NdoI3fDrY' }].map((ff,fx)=>{
                                                                                if(editing) {return <option
                                                                                    key={fx+'_'+ff.codeField+'_'+ff.field}
                                                                                    value={'('+(abcde[fx])+'). '+(
                                                                                            past_Data.find(rt=>rt.name==ff?.codeField)?.value || ""
                                                                                        )+" - "+(
                                                                                            past_Data.find(rt=>rt.name==ff?.field)?.value || ""
                                                                                        )}
                                                                                >
                                                                                    {(abcde[fx])+'. '+(past_Data.find(rt=>rt.name==ff?.field)?.value || "")}
                                                                                </option>}

                                                                                else {return <option
                                                                                    key={ff.field+''+ff.codeField}
                                                                                    value={'('+(abcde[fx])+'). '+(form_Data[ff?.codeField]?.value || "")+" - "+(form_Data[ff?.field]?.value || "")}>
                                                                                        {(abcde[fx])+'. '+(form_Data[ff?.field]?.value || "")}
                                                                                </option>}

                                                                            }
                                                                            )}
                                                                        </select>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'OlgJDc9wRMa').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'OlgJDc9wRMa' )?.value
                                                                                    }else if(form_Data['OlgJDc9wRMa'] && form_Data['OlgJDc9wRMa']?.value){
                                                                                        return form_Data['OlgJDc9wRMa']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                past_Data.find(c=>c.name=='OlgJDc9wRMa')?.value || form_Data['OlgJDc9wRMa']?.value || orc || ""
                                                                            }
                                                                            name="OlgJDc9wRMa"
                                                                            id="OlgJDc9wRMa"
                                                                            type="text"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                    <td className="p-2"></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="p-2" rowSpan={3}>
                                                                        Other
                                                                        significant
                                                                        conditions
                                                                        contributing
                                                                        to death
                                                                        (time
                                                                        intervals
                                                                        can be
                                                                        included
                                                                        in
                                                                        brackets
                                                                        after
                                                                        the
                                                                        condition)
                                                                    </td>
                                                                    <td
                                                                        className="p-3"
                                                                        colSpan={
                                                                            2
                                                                        }
                                                                        style={{
                                                                            maxWidth:
                                                                                '1200px',
                                                                        }}
                                                                    >

                                                               
                                                                <div className="form-group focused">
                                                                
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="yVSZuLhN47s"
                                                                        id="yVSZuLhN47s"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'yVSZuLhN47s').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'yVSZuLhN47s' )?.value
                                                                                }else if(form_Data['yVSZuLhN47s'] && form_Data['yVSZuLhN47s']?.value){
                                                                                    return form_Data['yVSZuLhN47s']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        />
                                                                    </div>
                                                                    



                                                                        {/* <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="yVSZuLhN47s").length<1 && form_Data["yVSZuLhN47s"]?.value == null) || editicd4bVal
                                                                                // form_Data['yVSZuLhN47s']?.value ===
                                                                                //     null
                                                                                    ? ''
                                                                                    : 'hidden'
                                                                            }
                                                                        >
                                                                            <IcdField
                                                                                ECT={
                                                                                    ECT
                                                                                }
                                                                                key="__yVSZuLhN47s"
                                                                                name={
                                                                                    'yVSZuLhN47s'
                                                                                }
                                                                                defVal={
                                                                                    icd4bVal.title || form_Data['yVSZuLhN47s']?.value
                                                                                }
                                                                                callBack={result => {
                                                                                    ECT.Handler.clear(
                                                                                        result.name
                                                                                    )
                                                                                }}
                                                                            ></IcdField>
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                (editing && past_Data.filter(pd=>pd.name=="yVSZuLhN47s").length<1 && form_Data["yVSZuLhN47s"]?.value == null) || editicd4bVal
                                                                                // form_Data['yVSZuLhN47s']?.value ===
                                                                                //     null
                                                                                    ? 'hidden'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <input
                                                                                readOnly={
                                                                                    true
                                                                                }
                                                                                key={
                                                                                    5.3
                                                                                }
                                                                                value={
                                                                                    icd4bVal.title || form_Data['yVSZuLhN47s']?.value
                                                                                }
                                                                                name={
                                                                                    'yVSZuLhN47s'
                                                                                }
                                                                                onClick={ev => {
                                                                                    setform_Data({...form_Data,
                                                                                        ...{'yVSZuLhN47s': {name:'yVSZuLhN47s', value: null}}
                                                                                    })
                                                                                    setEditICD4bval(true)
                                                                                }}
                                                                            />
                                                                        </div> */}
                                                                    </td>
                                                                    <td className="p-3" 
                                                                    style={{
                                                                        maxWidth:
                                                                            '1200px',
                                                                    }}>
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'ZN3TL62Xv3A').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'ZN3TL62Xv3A' )?.value
                                                                                    }else if(form_Data['ZN3TL62Xv3A'] && form_Data['ZN3TL62Xv3A']?.value){
                                                                                        return form_Data['ZN3TL62Xv3A']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['ZN3TL62Xv3A']?.value || past_Data.find(c=>c.name=='ZN3TL62Xv3A')?.value || ""
                                                                            }
                                                                            name="ZN3TL62Xv3A"
                                                                            id="ZN3TL62Xv3A"
                                                                            type="text"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="p-2"></td>
                                                                    <td
                                                                        className="p-2"
                                                                        colSpan={
                                                                            3
                                                                        }
                                                                    >

                                                               
                                                                <div className="form-group focused">
                                                                
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="yVSZuLhN47s"
                                                                        id="yVSZuLhN47s"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'yVSZuLhN47s').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'yVSZuLhN47s' )?.value
                                                                                }else if(form_Data['yVSZuLhN47s'] && form_Data['yVSZuLhN47s']?.value){
                                                                                    return form_Data['yVSZuLhN47s']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        />
                                                                    </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'ZN3TL62Xv3A').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'ZN3TL62Xv3A' )?.value
                                                                                    }else if(form_Data['ZN3TL62Xv3A'] && form_Data['ZN3TL62Xv3A']?.value){
                                                                                        return form_Data['ZN3TL62Xv3A']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['ZN3TL62Xv3A']?.value || past_Data.find(c=>c.name=='ZN3TL62Xv3A')?.value || ""
                                                                            }
                                                                            name="ZN3TL62Xv3A"
                                                                            id="ZN3TL62Xv3A"
                                                                            type="text"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="p-2"></td>
                                                                    <td
                                                                        className="p-2"
                                                                        colSpan={
                                                                            3
                                                                        }
                                                                    >

                                                               
                                                                <div className="form-group focused">
                                                                
                                                                    <input
                                                                        onChange={ev => {
                                                                            updateValue(
                                                                                ev
                                                                            )
                                                                        }}
                                                                        type="text"
                                                                        className="p-3"
                                                                        name="yVSZuLhN47s"
                                                                        id="yVSZuLhN47s"
                                                                        defaultValue={
                                                                            (()=>{
                                                                                if(editing && past_Data.filter( pd => pd.name == 'yVSZuLhN47s').length>0){
                                                                                    return past_Data.find( pd => pd.name == 'yVSZuLhN47s' )?.value
                                                                                }else if(form_Data['yVSZuLhN47s'] && form_Data['yVSZuLhN47s']?.value){
                                                                                    return form_Data['yVSZuLhN47s']?.value
                                                                                }else{
                                                                                    return ""
                                                                                }
                                                                            })()
                                                                        }
                                                                        />
                                                                    </div>
                                                                    </td>
                                                                    <td className="p-2">
                                                                        <input
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'ZN3TL62Xv3A').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'ZN3TL62Xv3A' )?.value
                                                                                    }else if(form_Data['ZN3TL62Xv3A'] && form_Data['ZN3TL62Xv3A']?.value){
                                                                                        return form_Data['ZN3TL62Xv3A']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['ZN3TL62Xv3A']?.value || past_Data.find(c=>c.name=='ZN3TL62Xv3A')?.value || ""
                                                                            }
                                                                            name="ZN3TL62Xv3A"
                                                                            id="ZN3TL62Xv3A"
                                                                            type="text"
                                                                            className="p-3 cod_e"
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <br />
                                                    <div className="col-md-12">
                                                        <h3 className="h3 mt-4">
                                                            Part 3: Other
                                                            medical data
                                                        </h3>
                                                    </div>
                                                    <div className="col-md-12 table-responsive">
                                                        <table className="table table-condensed table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        Was
                                                                        surgery
                                                                        performed
                                                                        within
                                                                        the last
                                                                        4 weeks?
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            name="vj0QDfT9ESR"
                                                                            id="vj0QDfT9ESR"
                                                                            className="p-3 selectwo"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'vj0QDfT9ESR').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'vj0QDfT9ESR' )?.value
                                                                                    }else if(form_Data['vj0QDfT9ESR'] && form_Data['vj0QDfT9ESR']?.value){
                                                                                        return form_Data['vj0QDfT9ESR']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['vj0QDfT9ESR']?.value
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="Yes">
                                                                                Yes
                                                                            </option>
                                                                            <option value="No">
                                                                                No
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                {showForSurgery ? (
                                                                    <>
                                                                        <tr>
                                                                            <td>
                                                                                If
                                                                                yes,
                                                                                please
                                                                                specify
                                                                                date
                                                                                of
                                                                                surgery
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-group input-group-border">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text">
                                                                                            <span className="far fa-calendar-alt"></span>
                                                                                        </span>
                                                                                    </div>
                                                                                    <input
                                                                                        onChange={ev => {
                                                                                            updateValue(
                                                                                                ev
                                                                                            )
                                                                                        }}
                                                                                        defaultValue={
                                                                                            (()=>{
                                                                                                if(editing && past_Data.filter( pd => pd.name == 'r071LCYIww8').length>0){
                                                                                                    return past_Data.find( pd => pd.name == 'r071LCYIww8' )?.value.split(' ')[0]
                                                                                                }else if(form_Data['r071LCYIww8'] && form_Data['r071LCYIww8']?.value){
                                                                                                    return form_Data['r071LCYIww8']?.value.split(' ')[0]
                                                                                                }else{
                                                                                                    return ""
                                                                                                }
                                                                                            })()
                                                                                        }
                                                                                        className="p-3"
                                                                                        id="r071LCYIww8"
                                                                                        name="r071LCYIww8"
                                                                                        type="date"
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                If
                                                                                yes,
                                                                                please
                                                                                specify
                                                                                reason
                                                                                for
                                                                                surgery
                                                                                (disease/condition)
                                                                            </td>
                                                                            <td>
                                                                                <div
                                                                                    className={
                                                                                        // form_Data['aaIqpHivlNV']?.value ===
                                                                                        //     null
                                                                                        (editing && past_Data.filter(pd=>pd.name=="aaIqpHivlNV").length<1 && form_Data["aaIqpHivlNV"]?.value == null) || editicd5Val
                                                                                            ? ''
                                                                                            : 'hidden'
                                                                                    }
                                                                                >
                                                                                    <IcdField
                                                                                        ECT={
                                                                                            ECT
                                                                                        }
                                                                                        key="__aaIqpHivlNV"
                                                                                        name={
                                                                                            'aaIqpHivlNV'
                                                                                        }
                                                                                        defVal={
                                                                                            icd5Val.title || form_Data['aaIqpHivlNV']?.value
                                                                                        }
                                                                                        callBack={result => {
                                                                                            ECT.Handler.clear(
                                                                                                result.name
                                                                                            )
                                                                                        }}
                                                                                    ></IcdField>
                                                                                </div>
                                                                                <div
                                                                                    className={
                                                                                        (editing && past_Data.filter(pd=>pd.name=="aaIqpHivlNV").length<1 && form_Data["aaIqpHivlNV"]?.value == null) || editicd5Val
                                                                                        // form_Data['aaIqpHivlNV']?.value ===
                                                                                        //     null
                                                                                            ? 'hidden'
                                                                                            : ''
                                                                                    }
                                                                                >
                                                                                    <input
                                                                                        readOnly={
                                                                                            true
                                                                                        }
                                                                                        key={
                                                                                            5
                                                                                        }
                                                                                        name={
                                                                                            'aaIqpHivlNV'
                                                                                        }
                                                                                        value={
                                                                                            icd5Val.title || form_Data['aaIqpHivlNV']?.value
                                                                                        }
                                                                                        onClick={ev => {
                                                                                            setform_Data({...form_Data,
                                                                                                ...{'aaIqpHivlNV': {name:'aaIqpHivlNV', value: null}}
                                                                                            })
                                                                                            setEditICD5val(true)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <input
                                                                                    type="hidden"
                                                                                    name="aaIqpHivlNV"
                                                                                    id="aaIqpHivlNV"
                                                                                    value={
                                                                                        surgereason
                                                                                    }
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}

                                                                <tr>
                                                                    <td>
                                                                        Was an
                                                                        autopsy
                                                                        requested?
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            name="xUy8zB9k4HO"
                                                                            id="xUy8zB9k4HO"
                                                                            className="p-3 selectwo"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'xUy8zB9k4HO').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'xUy8zB9k4HO' )?.value
                                                                                    }else if(form_Data['xUy8zB9k4HO'] && form_Data['xUy8zB9k4HO']?.value){
                                                                                        return form_Data['xUy8zB9k4HO']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['xUy8zB9k4HO']?.value
                                                                            }
                                                                        >
                                                                            <option
                                                                                disabled={
                                                                                    true
                                                                                }
                                                                                value=""
                                                                            >
                                                                                Pick
                                                                                one
                                                                            </option>
                                                                            <option value="1">
                                                                                Yes
                                                                            </option>
                                                                            <option value="0">
                                                                                No
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                {showForAutopsy ? (
                                                                    <>
                                                                        <tr>
                                                                            <td>
                                                                                If
                                                                                yes,
                                                                                were
                                                                                the
                                                                                findings
                                                                                used
                                                                                in
                                                                                the
                                                                                certification?
                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="RZdHJ7AsigH"
                                                                                    id="RZdHJ7AsigH"
                                                                                    className="p-3 selectwo"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'RZdHJ7AsigH').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'RZdHJ7AsigH' )?.value
                                                                                            }else if(form_Data['RZdHJ7AsigH'] && form_Data['RZdHJ7AsigH']?.value){
                                                                                                return form_Data['RZdHJ7AsigH']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                >
                                                                                    <option
                                                                                        disabled={
                                                                                            true
                                                                                        }
                                                                                        value=""
                                                                                    >
                                                                                        Pick
                                                                                        one
                                                                                    </option>
                                                                                    <option value="1">
                                                                                        Yes
                                                                                    </option>
                                                                                    <option value="0">
                                                                                        No
                                                                                    </option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <br />
                                                    <div className="col-md-12">
                                                        <h3 className="h3 mt-4">
                                                            Part 4: Manner of
                                                            death
                                                        </h3>
                                                    </div>
                                                    <div className="col-md-12 table-responsive">
                                                        <table className="table table-condensed table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        Manner
                                                                        of
                                                                        Death?
                                                                    </td>
                                                                    <td>
                                                                        <select
                                                                            onChange={ev => {
                                                                                updateValue(
                                                                                    ev
                                                                                )
                                                                            }}
                                                                            name="Zm2Qm6KpNWx"
                                                                            id="Zm2Qm6KpNWx"
                                                                            className="p-3 selectwo"
                                                                            defaultValue={
                                                                                (()=>{
                                                                                    if(editing && past_Data.filter( pd => pd.name == 'Zm2Qm6KpNWx').length>0){
                                                                                        return past_Data.find( pd => pd.name == 'Zm2Qm6KpNWx' )?.value
                                                                                    }else if(form_Data['Zm2Qm6KpNWx'] && form_Data['Zm2Qm6KpNWx']?.value){
                                                                                        return form_Data['Zm2Qm6KpNWx']?.value
                                                                                    }else{
                                                                                        return ""
                                                                                    }
                                                                                })()
                                                                            }
                                                                            value={
                                                                                form_Data['Zm2Qm6KpNWx']?.value
                                                                            }
                                                                        >
                                                                            <option disabled value="">
                                                                                Select one
                                                                            </option>
                                                                            <option value="Disease">
                                                                                Disease
                                                                            </option>
                                                                            <option value="Assault">
                                                                                Assault
                                                                            </option>
                                                                            <option value="Accident">
                                                                                Accident
                                                                            </option>
                                                                            <option value="Intentional Self Harm">
                                                                                Intentional
                                                                                Self
                                                                                Harm
                                                                            </option>
                                                                            <option value="Legal Intervention">
                                                                                Legal
                                                                                Intervention
                                                                            </option>
                                                                            <option value="Could not be determined">
                                                                                Could
                                                                                not
                                                                                be
                                                                                determined
                                                                            </option>
                                                                            <option value="War">
                                                                                War
                                                                            </option>
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        If
                                                                        external
                                                                        cause or
                                                                        poisoning
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-check">
                                                                            <input
                                                                                type="checkbox"
                                                                                onChange={ev => {
                                                                                    updateValue(
                                                                                        ev
                                                                                    )
                                                                                }}
                                                                                defaultValue={
                                                                                    (()=>{
                                                                                        if(editing && past_Data.filter( pd => pd.name == 'BWFJRINjXU8').length>0){
                                                                                            return past_Data.find( pd => pd.name == 'BWFJRINjXU8' )?.value
                                                                                        }else if(form_Data['BWFJRINjXU8'] && form_Data['BWFJRINjXU8']?.value){
                                                                                            return form_Data['BWFJRINjXU8']?.value
                                                                                        }else{
                                                                                            return ""
                                                                                        }
                                                                                    })()
                                                                                }
                                                                                checked={form_Data['BWFJRINjXU8']?.value}
                                                                                name="BWFJRINjXU8"
                                                                                id="BWFJRINjXU8"
                                                                                label="Yes"
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    {showDateInjury ? (
                                                                        <>
                                                                            <td>
                                                                                Date
                                                                                of
                                                                                injury
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-group input-group-border">
                                                                                    <div className="input-group-prepend">
                                                                                        <span className="input-group-text">
                                                                                            <span className="far fa-calendar-alt"></span>
                                                                                        </span>
                                                                                    </div>
                                                                                    <input
                                                                                        onChange={ev => {
                                                                                            updateValue(
                                                                                                ev
                                                                                            )
                                                                                        }}
                                                                                        className="p-3"
                                                                                        id="dhH5lBbOPyM"
                                                                                        name="dhH5lBbOPyM"
                                                                                        defaultValue={
                                                                                            (()=>{
                                                                                                if(editing && past_Data.filter( pd => pd.name == 'dhH5lBbOPyM').length>0){
                                                                                                    return past_Data.find( pd => pd.name == 'dhH5lBbOPyM' )?.value
                                                                                                }else if(form_Data['dhH5lBbOPyM'] && form_Data['dhH5lBbOPyM']?.value){
                                                                                                    return form_Data['dhH5lBbOPyM']?.value
                                                                                                }else{
                                                                                                    return ""
                                                                                                }
                                                                                            })()
                                                                                        }
                                                                                        type="date"
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                        </>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </tr>
                                                                {showExternal ? (
                                                                    <>
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    2
                                                                                }
                                                                            >
                                                                                Please
                                                                                describe
                                                                                how
                                                                                external
                                                                                cause
                                                                                occurred
                                                                                (if
                                                                                poisoning
                                                                                please
                                                                                specify
                                                                                poisoning
                                                                                agent)
                                                                            </td>
                                                                            <td
                                                                                colSpan={
                                                                                    4
                                                                                }
                                                                            >
                                                                                <textarea
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="jUIW1n2DW9V"
                                                                                    id="jUIW1n2DW9V"
                                                                                    rows={
                                                                                        3
                                                                                    }
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'jUIW1n2DW9V').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'jUIW1n2DW9V' )?.value
                                                                                            }else if(form_Data['jUIW1n2DW9V'] && form_Data['jUIW1n2DW9V']?.value){
                                                                                                return form_Data['jUIW1n2DW9V']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    className="p-3"
                                                                                ></textarea>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td
                                                                                colSpan={
                                                                                    2
                                                                                }
                                                                            >
                                                                                Place
                                                                                of
                                                                                occurrence
                                                                                of
                                                                                external
                                                                                cause
                                                                            </td>
                                                                            <td
                                                                                colSpan={
                                                                                    4
                                                                                }
                                                                            >
                                                                                <textarea
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="y9rWPTmS8jt"
                                                                                    id="y9rWPTmS8jt"
                                                                                    rows={
                                                                                        3
                                                                                    }
                                                                                    className="p-3"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'y9rWPTmS8jt').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'y9rWPTmS8jt' )?.value
                                                                                            }else if(form_Data['y9rWPTmS8jt'] && form_Data['y9rWPTmS8jt']?.value){
                                                                                                return form_Data['y9rWPTmS8jt']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                ></textarea>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <br />
                                                    {showHideAge ? (
                                                        <>
                                                            <div className="col-md-12">
                                                                <h3 className="h3 mt-4">
                                                                    Part 5:
                                                                    Fetal or
                                                                    infant death
                                                                </h3>
                                                            </div>

                                                            <div className="col-md-12 table-responsive">
                                                                <table className="table table-condensed table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Multiple
                                                                                pregnancy
                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="goZ721JmBLH"
                                                                                    id="goZ721JmBLH"
                                                                                    className="p-3 selectwo"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'goZ721JmBLH').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'goZ721JmBLH' )?.value
                                                                                            }else if(form_Data['goZ721JmBLH'] && form_Data['goZ721JmBLH']?.value){
                                                                                                return form_Data['goZ721JmBLH']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['goZ721JmBLH']?.value}
                                                                                >
                                                                                    <option
                                                                                        disabled={
                                                                                            true
                                                                                        }
                                                                                        value=""
                                                                                    >
                                                                                        Pick
                                                                                        one
                                                                                    </option>
                                                                                    <option value="1">
                                                                                        Yes
                                                                                    </option>
                                                                                    <option value="0">
                                                                                        No
                                                                                    </option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Stillborn
                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="poHSwg2GpT2"
                                                                                    id="poHSwg2GpT2"
                                                                                    className="p-3 selectwo"
                                                                                    defaultalue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'poHSwg2GpT2').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'poHSwg2GpT2' )?.value
                                                                                            }else if(form_Data['poHSwg2GpT2'] && form_Data['poHSwg2GpT2']?.value){
                                                                                                return form_Data['poHSwg2GpT2']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['poHSwg2GpT2']?.value}
                                                                                >
                                                                                    <option
                                                                                        disabled={
                                                                                            true
                                                                                        }
                                                                                        value=""
                                                                                    >
                                                                                        Pick
                                                                                        one
                                                                                    </option>
                                                                                    <option value="1">
                                                                                        Yes
                                                                                    </option>
                                                                                    <option value="0">
                                                                                        No
                                                                                    </option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                If
                                                                                death
                                                                                within
                                                                                24
                                                                                hours
                                                                                specify
                                                                                the
                                                                                number
                                                                                of
                                                                                hours
                                                                                survived
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    type="number"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'aCtCWmLNCxm').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'aCtCWmLNCxm' )?.value
                                                                                            }else if(form_Data['aCtCWmLNCxm'] && form_Data['aCtCWmLNCxm']?.value){
                                                                                                return form_Data['aCtCWmLNCxm']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['aCtCWmLNCxm']?.value}
                                                                                    className="p-3"
                                                                                    name="aCtCWmLNCxm"
                                                                                    id="aCtCWmLNCxm"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Birth
                                                                                weight
                                                                                (grams)
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    type="number"
                                                                                    className="p-3"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'bCpFo8joXJP').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'bCpFo8joXJP' )?.value
                                                                                            }else if(form_Data['bCpFo8joXJP'] && form_Data['bCpFo8joXJP']?.value){
                                                                                                return form_Data['bCpFo8joXJP']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['bCpFo8joXJP']?.value}
                                                                                    name="bCpFo8joXJP"
                                                                                    id="bCpFo8joXJP"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Number
                                                                                of
                                                                                completed
                                                                                weeks
                                                                                of
                                                                                pregnancy
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    type="number"
                                                                                    className="p-3"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'GTqUAduIVOR').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'GTqUAduIVOR' )?.value
                                                                                            }else if(form_Data['GTqUAduIVOR'] && form_Data['GTqUAduIVOR']?.value){
                                                                                                return form_Data['GTqUAduIVOR']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['GTqUAduIVOR']?.value}
                                                                                    name="GTqUAduIVOR"
                                                                                    id="GTqUAduIVOR"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Age
                                                                                of
                                                                                mother
                                                                                (years)
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    type="number"
                                                                                    className="p-3"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'kQGwhGDy14j').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'kQGwhGDy14j' )?.value
                                                                                            }else if(form_Data['kQGwhGDy14j'] && form_Data['kQGwhGDy14j']?.value){
                                                                                                return form_Data['kQGwhGDy14j']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['kQGwhGDy14j']?.value}
                                                                                    name="kQGwhGDy14j"
                                                                                    id="kQGwhGDy14j"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                If
                                                                                the
                                                                                death
                                                                                was
                                                                                perinatal,
                                                                                please
                                                                                state
                                                                                the
                                                                                conditions
                                                                                of
                                                                                mother
                                                                                that
                                                                                affected
                                                                                the
                                                                                fetus
                                                                                and
                                                                                newborn
                                                                            </td>
                                                                            <td>
                                                                                <textarea
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="pt9YwpkelVi"
                                                                                    id="pt9YwpkelVi"
                                                                                    className="p-3"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'pt9YwpkelVi').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'pt9YwpkelVi' )?.value
                                                                                            }else if(form_Data['pt9YwpkelVi'] && form_Data['pt9YwpkelVi']?.value){
                                                                                                return form_Data['pt9YwpkelVi']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={form_Data['pt9YwpkelVi']?.value}
                                                                                    rows={
                                                                                        3
                                                                                    }
                                                                                ></textarea>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <br />
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {showForWomen ? (
                                                        <>
                                                            <div className="col-md-12">
                                                                <h3 className="h3 mt-4">
                                                                    For women,
                                                                    was the
                                                                    deceased
                                                                    pregnant or
                                                                    within 6
                                                                    weeks of
                                                                    delivery?
                                                                </h3>
                                                            </div>
                                                            <div className="col-md-12 table-responsive">
                                                                <table className="table table-condensed table-bordered">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                Was
                                                                                the
                                                                                deceased
                                                                                pregnant
                                                                                or
                                                                                within
                                                                                6
                                                                                weeks
                                                                                of
                                                                                delivery?
                                                                            </td>
                                                                            <td>
                                                                                <select
                                                                                    onChange={ev => {
                                                                                        updateValue(
                                                                                            ev
                                                                                        )
                                                                                    }}
                                                                                    name="YHyhGDb4Tgu"
                                                                                    id="YHyhGDb4Tgu"
                                                                                    className="p-3 selectwo"
                                                                                    defaultValue={
                                                                                        (()=>{
                                                                                            if(editing && past_Data.filter( pd => pd.name == 'YHyhGDb4Tgu').length>0){
                                                                                                return past_Data.find( pd => pd.name == 'YHyhGDb4Tgu' )?.value
                                                                                            }else if(form_Data['YHyhGDb4Tgu'] && form_Data['YHyhGDb4Tgu']?.value){
                                                                                                return form_Data['YHyhGDb4Tgu']?.value
                                                                                            }else{
                                                                                                return ""
                                                                                            }
                                                                                        })()
                                                                                    }
                                                                                    value={
                                                                                        form_Data['YHyhGDb4Tgu']?.value
                                                                                    }
                                                                                >
                                                                                    <option value="1">
                                                                                        Yes
                                                                                    </option>
                                                                                    <option value="0">
                                                                                        No
                                                                                    </option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        {showPregnancy ? (
                                                                            <>
                                                                                <tr>
                                                                                    <td>
                                                                                        At
                                                                                        what
                                                                                        point?
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="Dg9KxifFWiY"
                                                                                            id="Dg9KxifFWiY"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'Dg9KxifFWiY').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'Dg9KxifFWiY' )?.value
                                                                                                    }else if(form_Data['Dg9KxifFWiY'] && form_Data['Dg9KxifFWiY']?.value){
                                                                                                        return form_Data['Dg9KxifFWiY']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            value={form_Data['Dg9KxifFWiY']?.value}
                                                                                            className="p-3 selectwo"
                                                                                        >
                                                                                            <option value="">
                                                                                                &nbsp;
                                                                                            </option>
                                                                                            <option value=">6 weeks">
                                                                                                Above
                                                                                                6
                                                                                                Weeks
                                                                                            </option>
                                                                                            <option value="5-6 weeks">
                                                                                                5-6
                                                                                                weeks
                                                                                            </option>
                                                                                            <option value="2-4 weeks">
                                                                                                2-4
                                                                                                weeks
                                                                                            </option>
                                                                                            <option value="A week or less">
                                                                                                A
                                                                                                week
                                                                                                or
                                                                                                less
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>

                                                                                <tr>
                                                                                    <td>
                                                                                        Did
                                                                                        the
                                                                                        pregnancy
                                                                                        contribute
                                                                                        to
                                                                                        death
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="Ud7yiLxC9aI"
                                                                                            id="Ud7yiLxC9aI"
                                                                                            className="p-3 selectwo"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'Ud7yiLxC9aI').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'Ud7yiLxC9aI' )?.value
                                                                                                    }else if(form_Data['Ud7yiLxC9aI'] && form_Data['Ud7yiLxC9aI']?.value){
                                                                                                        return form_Data['Ud7yiLxC9aI']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                        >
                                                                                            <option value="1">
                                                                                                Yes
                                                                                            </option>
                                                                                            <option value="0">
                                                                                                No
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Referred
                                                                                        from
                                                                                        (level
                                                                                        of
                                                                                        care)
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="u48lKYaMoY8"
                                                                                            id="u48lKYaMoY8"
                                                                                            className="p-3 selectwo"
                                                                                            value={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'u48lKYaMoY8').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'u48lKYaMoY8' )?.value
                                                                                                    }else if(form_Data['u48lKYaMoY8'] && form_Data['u48lKYaMoY8']?.value){
                                                                                                        return form_Data['u48lKYaMoY8']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                        >
                                                                                            <option value="">
                                                                                                &nbsp;
                                                                                            </option>
                                                                                            <option value="Home care">
                                                                                                Home
                                                                                                care
                                                                                            </option>
                                                                                            <option value="Community unit">
                                                                                                Community
                                                                                                unit
                                                                                            </option>
                                                                                            <option value="Health facility">
                                                                                                Health
                                                                                                facility
                                                                                            </option>
                                                                                            <option value="Sub-county / level-4 hospital">
                                                                                                Sub-county
                                                                                                /
                                                                                                level-4
                                                                                                hospital
                                                                                            </option>
                                                                                            <option value="County / Referral / level-5 hospital">
                                                                                                County
                                                                                                /
                                                                                                Referral
                                                                                                /
                                                                                                level-5
                                                                                                hospital
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Parity
                                                                                    </td>
                                                                                    <td>
                                                                                        <input
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            type="text"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'RNCB4DzrqHt').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'RNCB4DzrqHt' )?.value
                                                                                                    }else if(form_Data['RNCB4DzrqHt'] && form_Data['RNCB4DzrqHt']?.value){
                                                                                                        return form_Data['RNCB4DzrqHt']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            className="p-3"
                                                                                            name="RNCB4DzrqHt"
                                                                                            id="RNCB4DzrqHt"
                                                                                        />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Mode
                                                                                        of
                                                                                        delivery
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="X5kw9icuOUW"
                                                                                            id="X5kw9icuOUW"
                                                                                            className="p-3 selectwo"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'X5kw9icuOUW').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'X5kw9icuOUW' )?.value
                                                                                                    }else if(form_Data['X5kw9icuOUW'] && form_Data['X5kw9icuOUW']?.value){
                                                                                                        return form_Data['X5kw9icuOUW']?.value
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            value={form_Data['X5kw9icuOUW']?.value}
                                                                                        >
                                                                                            <option value="">
                                                                                                &nbsp;
                                                                                            </option>
                                                                                            <option value="Normal Delivery">
                                                                                                Normal
                                                                                                Delivery
                                                                                            </option>
                                                                                            <option value="Caesarian Delivery">
                                                                                                Caesarian
                                                                                                Delivery
                                                                                            </option>
                                                                                            <option value="Breach Delivery">
                                                                                                Breach
                                                                                                Delivery
                                                                                            </option>
                                                                                            <option value="Caesarian Section">
                                                                                                Caesarian
                                                                                                Section
                                                                                            </option>
                                                                                            <option value="Assisted Vaginal Delivery">
                                                                                                Assisted
                                                                                                Vaginal
                                                                                                Delivery
                                                                                            </option>
                                                                                            <option value="Born Before Arrival">
                                                                                                Assisted
                                                                                                Vaginal
                                                                                                Delivery
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Place
                                                                                        of
                                                                                        delivery
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="dWNwzvMjAjh"
                                                                                            id="dWNwzvMjAjh"
                                                                                            className="p-3 selectwo"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'dWNwzvMjAjh').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'dWNwzvMjAjh' )?.value
                                                                                                    }else if(form_Data['dWNwzvMjAjh'] && form_Data['dWNwzvMjAjh']?.value){
                                                                                                        return form_Data['dWNwzvMjAjh']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            value={form_Data['dWNwzvMjAjh']?.value}
                                                                                        >
                                                                                            <option value="">
                                                                                                &nbsp;
                                                                                            </option>
                                                                                            <option value="Home care">
                                                                                                Home
                                                                                                care
                                                                                            </option>
                                                                                            <option value="Community unit">
                                                                                                Community
                                                                                                unit
                                                                                            </option>
                                                                                            <option value="Health facility">
                                                                                                Health
                                                                                                facility
                                                                                            </option>
                                                                                            <option value="Sub-county / level-4 hospital">
                                                                                                Sub-county
                                                                                                /
                                                                                                level-4
                                                                                                hospital
                                                                                            </option>
                                                                                            <option value="County / Referral / level-5 hospital">
                                                                                                County
                                                                                                /
                                                                                                Referral
                                                                                                /
                                                                                                level-5
                                                                                                hospital
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        Delivered
                                                                                        by
                                                                                        skilled
                                                                                        attendant
                                                                                    </td>
                                                                                    <td>
                                                                                        <select
                                                                                            onChange={ev => {
                                                                                                updateValue(
                                                                                                    ev
                                                                                                )
                                                                                            }}
                                                                                            name="rTsewlB9gH8"
                                                                                            id="rTsewlB9gH8"
                                                                                            className="p-3 selectwo"
                                                                                            defaultValue={
                                                                                                (()=>{
                                                                                                    if(editing && past_Data.filter( pd => pd.name == 'rTsewlB9gH8').length>0){
                                                                                                        return past_Data.find( pd => pd.name == 'rTsewlB9gH8' )?.value
                                                                                                    }else if(form_Data['rTsewlB9gH8'] && form_Data['rTsewlB9gH8']?.value){
                                                                                                        return form_Data['rTsewlB9gH8']?.value
                                                                                                    }else{
                                                                                                        return ""
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            value={form_Data['rTsewlB9gH8']?.value}
                                                                                        >
                                                                                            <option value="">
                                                                                                &nbsp;
                                                                                            </option>
                                                                                            <option value="1">
                                                                                                Yes
                                                                                            </option>
                                                                                            <option value="0">
                                                                                                No
                                                                                            </option>
                                                                                        </select>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        ) : (
                                                                            <>

                                                                            </>
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <div className="col-md-12 mt-4 flex flex-row space-between">
                                                        <div className="w-full">
                                                            <button
                                                                type="button"
                                                                onClick={ee => {
                                                                    
                                                                    processSubmit(
                                                                        form_Data, false
                                                                    )
                                                                    setStatus(null)

                                                                }}
                                                                className="btn primary large"
                                                            >
                                                                {editing
                                                                    ? 'UPDATE'
                                                                    : 'COMPLETE'}
                                                            </button>
                                                            <button
                                                                className="btn default large"
                                                                onClick={e_ =>{
                                                                    setGreenLightEvent(
                                                                        false
                                                                    )
                                                                    if(editing){
                                                                        setEditing(false)
                                                                    }
                                                                    setStatus(null)
                                                                }
                                                                }
                                                            >
                                                                Cancel
                                                            </button>
                                                            {console.log({form_Data})}
                                                        </div>
                                                        {editing && <button
                                                            className="btn default large"
                                                            onClick={e_ =>{
                                                                processSubmit({}, true);
                                                                setStatus(null);
                                                            }}
                                                        >
                                                            Delete
                                                        </button>}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </Card>
                </main>
            </main>
            {process.env.REACT_APP_ENV == 'dev' && (
                <>
                    <p>
                        {Object.keys(form_Data).map(fd => {
                            return (form_Data[fd].value != null) && <span className="mr-3em" key={fd}>
                                {' '}
                                {JSON.stringify(form_Data[fd])}{' '}
                            </span>
                        }
                        )}
                    </p>
                    <hr />
                    <h3>Past data:</h3>
                    <p>
                        {past_Data.map(fd => (
                            <span className="mr-3em" key={fd.name}>
                                {' '}
                                {JSON.stringify(fd)}{' '}
                            </span>
                        ))}
                    </p>
                </>
            )}
        </div>
    )
}
