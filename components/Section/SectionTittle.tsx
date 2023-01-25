const SectionTitle = (props : any) => {
    return (
        <div className="section__title text-xl font-bold mb-3 mt-10 flex justify-between items-center text-white px-6">
             {props.children}
        </div>
    )
}

export default SectionTitle

