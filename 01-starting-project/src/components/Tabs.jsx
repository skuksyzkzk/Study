
export default function Tabs({children,buttons,ButtonContainers}) {
    return ( 
        <>
            <ButtonContainers>
                {buttons}
            </ButtonContainers>
            {children}
        </>
    )
}