


const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>

            <form onSubmit={handleSubmit} className="catForm">
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter New Category"
                        value={value} onChange={(e) => setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </>

    )
}
export default CategoryForm