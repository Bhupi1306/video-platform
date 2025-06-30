import { useEffect } from "react"
import { useState } from "react"

const DropDown = ({dropdownButtonValue = "Select", reRender,  dropdownValues=[], valueName="", showAdd=false, keyName="", setMainValue = () => {}, mainValue = ""} ) => {

    const [dropDownBtn, setDropDownBtn] = useState(dropdownButtonValue)
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const values = dropdownValues

console.log(mainValue)

    useEffect(()=>{
        setDropDownBtn(dropdownButtonValue)
        setDropdownVisible(false)
        if(reRender){
            setMainValue("")
        }
    }, [reRender])

    const handleClick = (value) => {
        setDropDownBtn(value[valueName])
        setMainValue(value[keyName])
        setDropdownVisible(false)
        
    }

    const handleAllClick = () => {
        setDropDownBtn("All")
        setMainValue("")
        setDropdownVisible(false)
    }

    return (
        <>
        <div className="relative inline-flex w-full">
        <span
            className="inline-flex justify-center divide-gray-300 overflow-hidden rounded-md px-2 border border-gray-300 bg-gray-50 shadow-sm min-w-25 w-full hover:bg-gray-50 hover:text-gray-900"
            onClick={() => {setDropdownVisible(!dropdownVisible)}}
        >
            <button
            type="button"
            className="py-1 sm:py-2 px-2 text-sm font-medium text-gray-700 transition-colors focus:relative"
            
            >
            {dropDownBtn}
            </button>


        </span>

        <div
            role="menu"
            className={`${dropdownVisible ? " ": "hidden"} absolute left-0 top-12 z-auto min-w-40 overflow-hidden rounded border border-gray-300 bg-white shadow-sm`}
        >
            {showAdd &&
            <a
                className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
                onClick={handleAllClick}
                >
                    All
                </a>}

            {values.map((value) => (
                <a
                key={value[keyName]}
                className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
                onClick={() => {handleClick(value)}}
                >
                {value[valueName] || " "}
                </a>
            ))}
            
        </div>
        </div></>
    )
}


export default DropDown