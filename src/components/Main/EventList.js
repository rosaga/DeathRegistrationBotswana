import React, { useEffect, useState } from 'react'
import { useDataQuery, DataQuery } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui-core/build/cjs/CircularLoader'
import { ScreenCover } from '@dhis2/ui-core/build/cjs/ScreenCover'
import { Alert } from '@material-ui/lab'

export const EventList = ({ ou, root_url, req_headers, editEvent }) => {
    const [events, setEvents] = useState({})
    const [dlEvents, setDlEvents] = useState({})
    const [res_hd, setResHd] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({})
    const [pages, setPages] = useState(1)
    const [pgList, setPgList] = useState([])
    const [currPage, setCurrPage] = useState(1)

    const query = {
        events: {
            resource: 'events',
            params: {
                program: 'gV8wHjt5Z9O',
                orgUnit: ou,
                paging: false,
            },
        },
    }

    const fetch_events = (fetchAll) => {
        setLoading(true)
        let url = `${root_url}events/query.json?program=${query.events.params.program}&orgUnit=${ou}&page=${currPage}&pageSize=50&programStage=fvF9K36GKeP&totalPages=true&includeAllDataElements=true&order=created:desc`
        if(fetchAll){
            url = `${root_url}events/query.json?program=${query.events.params.program}&orgUnit=${ou}&paging=false&programStage=fvF9K36GKeP&totalPages=true&includeAllDataElements=true&order=created:desc`
        }
        fetch(url, { headers: req_headers })
            .then(r => r.json())
            .then(result => {
                if(fetchAll){
                    setDlEvents(result)
                }else{
                    setEvents(result)
                    let p_g = result?.metaData?.pager?.pageCount
                    setPages(p_g)
                    //---
                    let arr = []
                    for (let r = 0; r < p_g; r++) {
                        arr.push(r+1)
                    }
                    setPgList(arr)
                    //---
                }
                setLoading(false)
            })
            .catch(err => {
                setError({ error: true, name: 'Error', message: err.message })
                setEvents({})
                setLoading(false)
            })
    }

    const getOU = ou_id => {
        const ou_rl = `${root_url}organisationUnits/${ou_id}.json?fields=id,name,code`
        return fetch(ou_rl, {headers: req_headers})
            .then(f=>f.json())
            .then(res=>{
                return res
            })
    }

    const json2CSV = () => {
        setLoading(true)
        fetch_events(true)
        if( dlEvents && dlEvents?.headers ){
            // console.log('dlEvents')
            const cty_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Usual Residence(County)'))
            const scty_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Usual Residence(Sub-county)'))
            const ou_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='orgUnit'))
            const ouname_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='orgUnitName'))
            
            const dob_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Date of Birth'))
            const age_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Age'))
            const sex_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Sex'))
            const dod_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Date and time of Death'))
            const undercod_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD State the underlying causes (Cause of death)'))
            const surg_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Was surgery performed within the last 4 weeks?'))
            const mannerod_inx = dlEvents?.headers.indexOf(dlEvents?.headers.find(f=>f.column=='MCCOD Manner of death'))

            let final_csv = [
                ["County of usual residence", "Subcounty of usual residence", "Facility", "Date Of Birth", "Age", "Sex", "Date Of Death", "Underlying Cause Of Death", "Was Surgery Performed?", "Manner Of Death"]
            ]
            ///////////////////
            dlEvents.rows.map( (rw,rix)=>{
                const cty_val = rw[cty_inx]
                const scty_val = rw[scty_inx]
                const ou_val = rw[ou_inx]
                
                const ouname_val = rw[ouname_inx]
                
                getOU(cty_val).then(t=>{
                    getOU(scty_val).then(u=>{
                        getOU(ou_val).then(v=>{
                            let cty_name = t.name || ""
                            let scty_name = u.name || ""
                            let fac_name = v.name || ouname_val || ""
                            
                            let dob_name = new Date(rw[dob_inx]).toLocaleString() || ""
                            if(rw[dob_inx] && rw[dob_inx].length>0 && (rw[dob_inx] != "")){
                                dob_name = new Date(rw[dob_inx]).toLocaleString()
                            }
                            let age_name = rw[age_inx] || ""
                            let sex_name = rw[sex_inx] || ""
                            let dod_name = rw[dod_inx] || ""
                            if(rw[dod_inx] && rw[dod_inx].length>0 && (rw[dod_inx] != "")){
                                dod_name = new Date(rw[dod_inx]).toLocaleString() || ""
                            }
                            let undercod_name = rw[undercod_inx] || ""
                            let surg_name = rw[surg_inx] || ""
                            if(parseInt(rw[surg_inx]) == 1){
                                surg_name = 'Yes'
                            }else if(parseInt(rw[surg_inx]) == 1){
                                surg_name = 'No'
                            }
                            
                            let mannerod_name = rw[mannerod_inx] || ""
                            let one_event = [cty_name, 
                                scty_name, 
                                fac_name, 
                                dob_name, 
                                age_name, 
                                sex_name, 
                                dod_name, 
                                undercod_name, 
                                surg_name,
                                mannerod_name
                            ]

                            final_csv.push(one_event)
                            // console.log("137")
                            if(rix == (events?.rows.length - 1)){
                                // console.log("139")
                                setTimeout(() => {
                                //     setLoading(false)
                                }, 1800);
                                //----- export
                                let csv_file = ""
                                final_csv.map(fc=>{
                                    csv_file += JSON.stringify(fc).replace("[", "").replace("]", "") + "\n"
                                })
                                // console.log(final_csv[0])
                                let dat_ = new Blob([csv_file], {type: 'text/csv'});
                                let csvURL = window.URL.createObjectURL(dat_);
                                let tempLink = document.createElement('a');
                                tempLink.href = csvURL;
                                tempLink.setAttribute('download', 'rms-export-'+new Date().toLocaleDateString()+'.csv');
                                tempLink.click();
                                //----- export
                            }
                        })
                    })
                })
            })
            ///////////////////
        }else{
            setTimeout(() => {
                setLoading(false)
            }, 1800);
        }
    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetch_events(false)

        }
        return () => {
            mounted = false
        }
    }, [ou, currPage])

    return (
        <>
            {loading && (
                <ScreenCover>
                    {' '}
                    <CircularLoader />{' '}
                </ScreenCover>
            )}

            {error && error.error && (
                <Alert severity="error">
                    {' '}
                    <b>{error.name}</b> <hr /> {error.message}{' '}
                </Alert>
            )}
            

            {events && events?.rows && (
                <div className="bg-info-lightz text-info p-1 flex flex-col">
                    <div className="flex flex-row space-between items-center">
                        <h3 className="h3 mb-0">Past events</h3>
                        <button 
                            className="btn primary bg-success"
                            onClick={et=>{
                                json2CSV()
                            }}
                        >Download</button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    In-Patient File number
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    Underlying cause of death
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    Age
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    Gender
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    Date of Death
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    Event Date
                                </th>
                                <th
                                    className="py-8 text-md px-4"
                                    style={{ borderBottom: '1px solid #ccd' }}
                                >
                                    &hellip;
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.rows.map(ev => 
                            (
                                
                                <tr key={ev[0] + '_tr'}>
                                    
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        {` ${ev[30] ||
                                            ''} ${ev[37] || ''}`}
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        { ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD State the underlying causes (Cause of death)')) ] || "" }
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        { ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Age')) ] || "" }
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        { ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Sex')) ] || "" }
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        {/* {new Date(ev[87]).toLocaleString() || ''} */}
                                        { 
                                            (
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Date and time of Death')) ] && 
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Date and time of Death')) ].length>0 && 
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Date and time of Death')) ] != ""
                                            ) 
                                            ? new Date(ev[events?.headers.indexOf(events?.headers.find(f=>f.column=='MCCOD Date and time of Death'))]).toLocaleString() 
                                            : ""
                                        }
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        {/* {new Date(ev[7]).toLocaleString() || ''} */}
                                        { 
                                            (
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='eventDate')) ] && 
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='eventDate')) ].length>0 && 
                                                ev[ events?.headers.indexOf(events?.headers.find(f=>f.column=='eventDate')) ] != ""
                                            ) 
                                            ? new Date(ev[events?.headers.indexOf(events?.headers.find(f=>f.column=='eventDate'))]).toLocaleString() 
                                            : ""
                                        }
                                    </td>
                                    <td
                                        className="py-8 text-md px-4"
                                        style={{
                                            borderBottom: '1px solid #ccd',
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="button bg-primary px-1em py-6 text-white br-1"
                                            onClick={en => {
                                                editEvent(ev[0])
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full text-right flex flex-row items-center">
                        <span className="text-grey">Pages: </span>
                        {(pgList && pgList.length>0) && <ul className="flex flex-row gap-7 list-none">
                            {pgList.map(t=>(
                                <li className={"py-6 px-10 flex items-center "+(t==currPage?"bg-white border-gray text-grey ":"bg-primary text-white")} style={{cursor: (t==currPage?'default':'pointer')}} key={t+'_t'} onClick={r=> setCurrPage(t) }>
                                    {t}
                                </li>
                            ))}
                        </ul>}
                    </div>
                </div>
            )}
        </>
    )
}
