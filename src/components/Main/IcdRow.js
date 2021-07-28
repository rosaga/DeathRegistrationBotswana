import React from 'react'

function IcdRow({
    code,
    icd,
    name,
    description,
    matched_words,
    callBack,
    nexT,
}) {
    return (
        <table
            style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                width: '100%',
                overflowY: 'auto',
                backgroundColor: 'white',
                lineHeight: '1',
            }}
            className="hover-highlight"
        >
            <tbody>
                <tr
                    style={{
                        border: '0px solid transparent',
                        // boxShadow: '0px 0px 1px 1px rgba(194, 167, 80,0.2)',
                        backgroundColor: '#ffffff',
                        margin: '0px',
                    }}
                >
                    <td
                        style={{
                            border: '0px solid transparent',
                            maxWidth: '120px',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <b
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                            }}
                            onClick={() => {
                                if (callBack) {
                                    callBack({ name, code })
                                } else {
                                    // console.error('callBack err')
                                }
                                if (nexT) {
                                    nexT()
                                } else {
                                    console.error('noNext')
                                }
                            }}
                        >
                            {icd.theCode || 'No code'}
                        </b>
                    </td>
                    <td
                        style={{
                            border: '0px solid transparent',
                            color: '#643920',
                            backgroundColor: '#ffffff',
                            padding: '1px 3px',
                            borderRadius: '5px',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h5
                            style={{ margin: '0px', cursor: 'pointer' }}
                            onClick={() => {
                                if (callBack) {
                                    callBack({
                                        name: icd.title.replace(
                                            /(<([^>]+)>)/gi,
                                            ''
                                        ),
                                        code: icd.theCode,
                                    })
                                } else {
                                    // console.error('callBack err')
                                }
                                if (nexT) {
                                    nexT()
                                } else {
                                    console.error('noNext')
                                }
                            }}
                            dangerouslySetInnerHTML={{ __html: icd.title }}
                        ></h5>
                        {icd.matchingPVs && (
                            <ul style={{ listStyle: 'none' }}>
                                {icd.matchingPVs.map(mpv => (
                                    <li
                                        key={mpv.label}
                                        dangerouslySetInnerHTML={{
                                            __html: mpv.label,
                                        }}
                                    ></li>
                                ))}
                            </ul>
                        )}
                    </td>

                    <td
                        style={{
                            backgroundColor: '#ffffff',
                            textAlign: 'left',
                        }}
                    >
                        <summary
                            style={{
                                marginLeft: '5px',
                                listStyle: 'none',
                                fontWeight: '400',
                                color: 'black',
                            }}
                        >
                            {/* <span>{name}</span> */}
                            <details open={true}>
                                <ul
                                    style={{
                                        fontSize: '0.8em',
                                        padding: '2px 10px',
                                        listStyle: 'none',
                                    }}
                                >
                                    <li>
                                        ID: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{' '}
                                        <a href={icd.id}>{icd.id}</a>
                                    </li>
                                    <li>
                                        Stem ID:{' '}
                                        <a href={icd.stemId}>{icd.stemId}</a>
                                    </li>
                                </ul>
                            </details>
                        </summary>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default IcdRow
