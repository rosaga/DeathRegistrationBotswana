import React, { useState, useEffect } from 'react'

function IcdField({ callBack, name, disabled, ECT, defVal }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchTermLabel, setSearchTermLabel] = useState('')
    const [dnSearch, setDnSearch] = useState(false)

    const icd_search = () => {
        if (searchTerm.length >= 1 && !dnSearch) {
            ECT.Handler.search(name, searchTerm)
        }
        setDnSearch(false)
    }

    useEffect(() => {
        // console.log(name)
        ECT.Handler.bind(name)
        return () => {
            setDnSearch(false)
            ECT.Handler.clear(name)
        }
    }, [name, defVal])

    useEffect(() => {
        if (!dnSearch) {
            icd_search()
        }
        return () => {
            // setDnSearch(false)
            // ECT.Handler.clear(name)
        }
    }, [searchTerm, defVal])

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    width: 'auto',
                    padding: '0px',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    border: 'none',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <input
                        className="form-input ctw-input"
                        autoComplete="off"
                        disabled={disabled}
                        placeholder={defVal}
                        data-ctw-ino={name}
                        value={searchTerm}
                        onChange={er => {
                            setSearchTerm(er.target.value)
                        }}
                        onClick={ev => {
                            setSearchTerm('')
                            setDnSearch(false)
                            ECT.Handler.clear(name)
                        }}
                    />
                </div>
                <span
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '1.45em',
                        color: 'darkred',
                        fontWeight: '300',
                        padding: '0px 8px',
                        cursor: 'pointer',
                    }}
                    onClick={ed => {
                        setSearchTerm('')
                        setSearchTermLabel('')
                        callBack({ name, theCode: '', title: '' })
                        ECT.Handler.clear(name)
                    }}
                >
                    &times;
                </span>
            </div>

            <div className={'ctw-window '} data-ctw-ino={name}></div>
        </div>
    )
}

export default IcdField
